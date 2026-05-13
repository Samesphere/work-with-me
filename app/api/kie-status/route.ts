import { NextRequest, NextResponse } from 'next/server'

type RecordData = {
  state: string
  resultJson?: string | null
  failMsg?: string
  info?: { resultImageUrl?: string; originImageUrl?: string }
}

function extractImageUrl(data: RecordData): string | undefined {
  if (data.resultJson) {
    try {
      const parsed = JSON.parse(data.resultJson) as { resultUrls?: string[]; resultImageUrl?: string }
      const url = parsed.resultUrls?.[0] ?? parsed.resultImageUrl
      if (url) return url
    } catch { /* fall through */ }
  }
  return data.info?.resultImageUrl
}

export async function GET(req: NextRequest) {
  try {
    const key = process.env.KIE_API_KEY
    const taskId = req.nextUrl.searchParams.get('taskId')
    if (!key || !taskId) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

    const res = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      headers: { 'Authorization': `Bearer ${key}` },
    })

    const text = await res.text()

    let json: { code: number; data: RecordData }
    try {
      json = JSON.parse(text) as { code: number; data: RecordData }
    } catch {
      return NextResponse.json({ error: `Kie returned non-JSON (status ${res.status}): ${text.slice(0, 300)}` })
    }

    const data = json.data
    if (!data) return NextResponse.json({ error: `No data field. Raw: ${JSON.stringify(json).slice(0, 500)}` })

    const { state, failMsg } = data

    if (state === 'success') {
      const imageUrl = extractImageUrl(data)
      return NextResponse.json({ state, imageUrl, _raw: data })
    }

    return NextResponse.json({ state, failMsg, _raw: data })
  } catch (e) {
    return NextResponse.json({ error: `Route exception: ${String(e)}` })
  }
}
