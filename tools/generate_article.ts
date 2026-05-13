import Anthropic from '@anthropic-ai/sdk'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

dotenv.config()

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans) }))
}

async function main() {
  const title = process.argv[2] ?? await prompt('Article title: ')
  const category = process.argv[3] ?? await prompt('Category (Case Studies / Solutions / Thinking Out Loud / Messy Updates): ')
  const context = process.argv[4] ?? await prompt('Context/brief (notes or talking points): ')

  const slug = slugify(title)
  const date = new Date().toISOString().split('T')[0]

  console.log('\nGenerating article with claude-opus-4-7...')

  const msg = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 2048,
    system: `You are writing a blog post for Mark J Reynolds, a freelance automation and AI consultant based on the Gold Coast, Australia.

Rules:
- Output Markdown only — no preamble, no commentary, no code fences around the whole article
- 800–1200 words
- Clear H2 section headings
- First-person voice: practical, specific, no fluff, no buzzwords
- Write as if you built the thing yourself and are sharing what actually happened
- End with a call-to-action paragraph: "If you want to map what's automatable in your business, [start here](/work-with-me)."
- Do not include a title H1 — that comes from frontmatter`,
    messages: [
      {
        role: 'user',
        content: `Write an article titled "${title}" for the "${category}" category.\n\nContext:\n${context}`,
      },
    ],
  })

  const body = msg.content[0].type === 'text' ? msg.content[0].text : ''
  const firstLine = body.split('\n').find(l => l.trim() && !l.startsWith('#')) ?? ''
  const description = firstLine.slice(0, 150).replace(/"/g, "'")

  const mdx = `---
title: "${title}"
date: "${date}"
category: "${category}"
description: "${description}"
image: "/images/blog/${slug}.jpg"
tags: []
draft: false
---

${body}`

  const outDir = path.join(process.cwd(), 'content', 'blog')
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, `${slug}.mdx`)
  fs.writeFileSync(outPath, mdx, 'utf-8')

  console.log(`\nArticle written → content/blog/${slug}.mdx`)
  console.log(`Preview: http://localhost:3000/blog/${slug}`)

  return { slug, title }
}

main().catch(err => { console.error(err); process.exit(1) })
