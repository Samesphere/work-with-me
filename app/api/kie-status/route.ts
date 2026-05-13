import { NextRequest, NextResponse } from 'next/server'

// successFlag: 0 = generating, 1 = success, 2 = creation failed, 3 = generation failed
type FluxRecord = {
  taskId: string
  successFlag: 0 | 1 | 2 | 3
  response?: { resultImageUrl?: string; originImageUrl?: string }
  errorMessage?: string | null
  errorCode?: string | null
}

export async function GET(req: NextRequest) {
  try {
    const key = process.env.KIE_API_KEY
    const taskId = req.nextUrl.searchParams.get('taskId')
    if (!key || !taskId) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

    const res = await fetch(`https://api.kie.ai/api/v1/flux/kontext/record-info?taskId=${taskId}`, {
      headers: { 'Authorization': `Bearer ${key}` },
    })

    const text = await res.text()
    let json: { code: number; msg: string; data: FluxRecord }
    try {
      json = JSON.parse(text) as typeof json
    } catch {
      return NextResponse.json({ error: `Non-JSON from Kie (${res.status}): ${text.slice(0, 300)}` })
    }

    if (!json.data) {
      return NextResponse.json({ error: `No data. Raw: ${JSON.stringify(json).slice(0, 500)}` })
    }

    const { successFlag, response, errorMessage } = json.data

    if (successFlag === 1) {
      return NextResponse.json({ state: 'success', imageUrl: response?.resultImageUrl })
    }
    if (successFlag === 2 || successFlag === 3) {
      return NextResponse.json({ state: 'fail', failMsg: errorMessage ?? `successFlag ${successFlag}` })
    }

    // 0 = still generating
    return NextResponse.json({ state: 'generating' })
  } catch (e) {
    return NextResponse.json({ error: `Route exception: ${String(e)}` })
  }
}
