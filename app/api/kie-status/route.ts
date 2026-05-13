import { NextRequest, NextResponse } from 'next/server'

type RecordInfo = {
  code: number
  data: {
    state: string
    resultJson?: string | null
    failMsg?: string
    info?: { resultImageUrl?: string; originImageUrl?: string }
  }
}

function extractImageUrl(data: RecordInfo['data']): string | undefined {
  // Try resultJson first (general task format)
  if (data.resultJson) {
    try {
      const parsed = JSON.parse(data.resultJson) as { resultUrls?: string[]; resultImageUrl?: string }
      const url = parsed.resultUrls?.[0] ?? parsed.resultImageUrl
      if (url) return url
    } catch { /* fall through */ }
  }
  // Flux Kontext callback format
  return data.info?.resultImageUrl
}

export async function GET(req: NextRequest) {
  const key = process.env.KIE_API_KEY
  const taskId = req.nextUrl.searchParams.get('taskId')
  if (!key || !taskId) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  const res = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
    headers: { 'Authorization': `Bearer ${key}` },
  })

  const json = await res.json() as RecordInfo
  const { state, failMsg } = json.data

  if (state === 'success') {
    const imageUrl = extractImageUrl(json.data)
    // Return raw data alongside so we can debug if imageUrl is still missing
    return NextResponse.json({ state, imageUrl, _raw: json.data })
  }

  return NextResponse.json({ state, failMsg, _raw: json.data })
}
