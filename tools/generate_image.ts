import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

const KIE_API_KEY = process.env.KIE_API_KEY

/**
 * Generate a hero image for a blog article via the Kie API.
 * Returns the public path to the saved image.
 *
 * TODO: Replace the stub below with the actual Kie API call once you have
 * the endpoint URL and request format from https://kie.ai (or wherever the
 * API docs live). The KIE_API_KEY env var is already loaded from .env.
 */
export async function generateImage(slug: string, title: string): Promise<string> {
  const prompt = `Dark minimal abstract tech illustration for a blog post titled "${title}".
Deep dark background #0d0f14, subtle blue #4a9eff and orange #f07f3c accent elements.
Clean geometric forms, professional, modern. No text. 1200x630 landscape.`

  const outputDir = path.join(process.cwd(), 'public', 'images', 'blog')
  fs.mkdirSync(outputDir, { recursive: true })
  const outputPath = path.join(outputDir, `${slug}.webp`)

  if (!KIE_API_KEY) {
    console.warn('⚠  KIE_API_KEY not set — skipping image generation')
    if (!fs.existsSync(outputPath)) fs.writeFileSync(outputPath, '')
    return `/images/blog/${slug}.webp`
  }

  // --- Replace this section with the real Kie API call ---
  console.log('Kie API call not yet implemented.')
  console.log('Prompt:', prompt)
  console.log('Expected output:', outputPath)
  if (!fs.existsSync(outputPath)) fs.writeFileSync(outputPath, '')
  // -------------------------------------------------------

  return `/images/blog/${slug}.webp`
}

// CLI: npx tsx tools/generate_image.ts <slug> <title words...>
const [, , slug, ...titleWords] = process.argv
if (slug) {
  const title = titleWords.join(' ')
  generateImage(slug, title)
    .then(p => console.log('Image path:', p))
    .catch(err => { console.error(err); process.exit(1) })
}
