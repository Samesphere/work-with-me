# Work-With-Me

## What this project does
Static HTML landing page for Mark J Reynolds' freelance consulting services. Single-file site (`index.html`) targeting Gold Coast businesses who want automation and AI systems built inside their teams. Deployed via Vercel with GitHub as the source.

## Current status
Live at https://work-with-me-zeta.vercel.app — GitHub repo at https://github.com/Samesphere/work-with-me. Vercel is connected to the repo; every push to `master` auto-deploys.

## Stack
- Single `index.html` — no build step, no framework, no dependencies
- Hosted on Vercel (static)
- Source: GitHub (`Samesphere/work-with-me`)
- Fonts loaded from Google Fonts CDN

## Deployment
Push to `master` → Vercel auto-deploys. No manual deploy step needed.

To deploy manually:
```
vercel --cwd "p:\Agentic_Workflows\Work-With-Me" --prod
```

## Making changes
All content and styles are in `index.html`. Edit it directly — there is no build pipeline to run. After editing, commit and push:
```
git add index.html
git commit -m "update: <what changed>"
git push
```

## Custom domain
Not yet configured. To add `markjreynolds.com/work-with-me` or a subdomain, set it up in the Vercel dashboard under the `work-with-me` project settings.
