# /generate-article

Generate a complete blog article — AI-written content, hero image, committed to the repo — ready to preview locally.

## Steps

**1. Collect inputs**

Ask the user for:
- `title` — the article title
- `category` — one of: `Case Studies` | `Solutions` | `Thinking Out Loud` | `Messy Updates`
- `context` — raw notes, a case study brief, or talking points (can be pasted as a block)

Derive the slug: lowercase, words joined with hyphens, strip special chars.

**2. Generate the article body**

Write the article body directly (800–1200 words). Rules:
- Markdown only — no preamble
- Clear H2 section headings
- First-person voice: practical, specific, what actually happened
- No buzzwords, no fluff
- End with: *"If you want to map what's automatable in your business, [start here](/work-with-me)."*
- Do NOT include a title H1

**3. Assemble and write the MDX file**

Write to `content/blog/[slug].mdx` with this frontmatter:

```
---
title: "[title]"
date: "[YYYY-MM-DD today]"
category: "[category]"
description: "[first non-heading sentence, max 150 chars]"
image: "/images/blog/[slug].webp"
tags: []
draft: false
---
```

**4. Generate the hero image**

Run:
```
npx tsx tools/generate_image.ts [slug] [title]
```

This writes to `public/images/blog/[slug].webp`. If the Kie API isn't configured yet, it creates a placeholder and logs a warning — that's fine.

**5. Commit**

```
git add content/blog/[slug].mdx public/images/blog/[slug].webp
git commit -m "content: add article \"[title]\""
```

**6. Report**

Print:
```
Preview: http://localhost:3000/blog/[slug]
```

Tell the user to run `npm run dev` if the dev server isn't already running, then review the article before pushing.

## Style notes

Mark's voice:
- Writes like someone who did the work, not someone pitching it
- Names specific tools (n8n, Claude, Supabase, Telegram)
- Quantifies outcomes when possible (time saved, volume handled)
- Skips adjectives that could apply to anything ("powerful", "seamless")
- Short paragraphs. Ends sections before they overstay their welcome.
