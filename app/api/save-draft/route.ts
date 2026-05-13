import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  const { slug, content } = await req.json() as { slug: string; content: string }

  if (!slug || !content) {
    return NextResponse.json({ error: 'Missing slug or content' }, { status: 400 })
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }

  const dir = path.join(process.cwd(), 'content', 'blog')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${slug}.mdx`), content, 'utf-8')

  return NextResponse.json({ ok: true, path: `content/blog/${slug}.mdx` })
}
