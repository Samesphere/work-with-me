import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const key = process.env.KIE_API_KEY
  const taskId = req.nextUrl.searchParams.get('taskId')
  if (!key || !taskId) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  const res = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
    headers: { 'Authorization': `Bearer ${key}` },
  })

  const json = await res.json() as {
    data: { state: string; resultJson: string; failMsg?: string }
  }
  const { state, resultJson, failMsg } = json.data

  if (state === 'success') {
    const { resultUrls } = JSON.parse(resultJson) as { resultUrls: string[] }
    return NextResponse.json({ state, imageUrl: resultUrls[0] })
  }

  return NextResponse.json({ state, failMsg })
}
