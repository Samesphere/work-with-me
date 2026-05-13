import { NextResponse } from 'next/server'

export async function POST() {
  const key = process.env.KIE_API_KEY
  if (!key) return NextResponse.json({ error: 'KIE_API_KEY not set on this deployment' }, { status: 500 })

  const res = await fetch('https://api.kie.ai/api/v1/flux/kontext/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'flux-kontext-pro',
      prompt: 'Dark minimal abstract tech illustration. Deep dark background #0d0f14, subtle blue #4a9eff and orange #f07f3c geometric elements. Professional, modern. No text.',
      aspectRatio: '16:9',
      outputFormat: 'jpeg',
    }),
  })

  const json = await res.json() as { code: number; msg: string; data: { taskId: string } }
  if (json.code !== 200) return NextResponse.json({ error: json.msg }, { status: 500 })

  return NextResponse.json({ taskId: json.data.taskId })
}
