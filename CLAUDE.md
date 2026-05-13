# Work-With-Me / markjreynolds.com Blog

## What this project does
Next.js 15 site for Mark J Reynolds — a Work With Me consulting page plus a Markdown-based blog. Deployed via Vercel (GitHub → auto-deploy on push to `master`).

## Live URLs
- **Production:** https://work-with-me-zeta.vercel.app
- **GitHub:** https://github.com/Samesphere/work-with-me
- **Local dev:** http://localhost:3000

## Stack
- **Framework:** Next.js 15, App Router, TypeScript
- **Styles:** Tailwind CSS 3 + custom CSS vars in `app/globals.css` (dark theme — `#0d0f14` bg, `#4a9eff` accent, `#f07f3c` accent2)
- **Fonts:** DM Sans + DM Mono, loaded via `next/font/google`
- **Blog:** MDX files in `content/blog/`, rendered with `next-mdx-remote/rsc`
- **Editor:** Tiptap at `/editor` (local-only, not indexed)
- **Image gen:** Kie API (stub in `tools/generate_image.ts` — needs API key + endpoint)
- **Hosting:** Vercel (static + serverless)

## Routes
| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Work With Me consulting page |
| `/blog` | `app/blog/page.tsx` | Article index, category filter |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | MDX article renderer |
| `/editor` | `app/editor/page.tsx` | Tiptap WYSIWYG, local only |
| `/feed.xml` | `app/feed.xml/route.ts` | RSS feed |
| `/api/save-draft` | `app/api/save-draft/route.ts` | POST — saves draft MDX (dev only) |

## Adding articles
Drop a `.mdx` file in `content/blog/` with this frontmatter:
```yaml
---
title: "Article Title"
date: "2026-05-13"
category: "Case Studies"   # Case Studies | Solutions | Thinking Out Loud | Messy Updates
description: "One-line description (≤ 150 chars)"
image: "/images/blog/slug.webp"
tags: ["automation", "n8n"]
draft: false
---
```

## /generate-article skill
Invoke `/generate-article` in Claude Code to write a full article interactively. See `skills/generate-article.md` for the full spec.

Tool scripts (run with `npx tsx`):
- `tools/generate_article.ts` — calls Claude API, writes MDX file
- `tools/generate_image.ts` — calls Kie API (stub), saves to `public/images/blog/`

Both read API keys from `.env`.

## Deployment
Push to `master` → Vercel auto-deploys. No manual step needed.

Manual deploy:
```
vercel --cwd "p:\Agentic_Workflows\Work-With-Me" --prod
```

## Dev commands
```
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Env vars needed (`.env`)
```
ANTHROPIC_API_KEY=...
KIE_API_KEY=...
NEXT_PUBLIC_SITE_URL=https://markjreynolds.com   # set when domain is live
```

## Custom domain
Not yet configured. To add `markjreynolds.com`:
1. Vercel dashboard → work-with-me project → Domains → add `markjreynolds.com`
2. Copy the CNAME/A records Vercel generates
3. Enter them in Cloudflare DNS
4. DNS cut-over is manual — Systeme.io still handles the current domain
