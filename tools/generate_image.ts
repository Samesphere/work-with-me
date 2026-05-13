import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

const KIE_API_KEY = process.env.KIE_API_KEY
const BASE = 'https://api.kie.ai/api/v1'

function headers() {
  return {
    'Authorization': `Bearer ${KIE_API_KEY}`,
    'Content-Type': 'application/json',
  }
}

async function createTask(prompt: string): Promise<string> {
  const res = await fetch(`${BASE}/flux/kontext/generate`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      model: 'flux-kontext-pro',
      prompt,
      aspectRatio: '16:9',
      outputFormat: 'jpeg',
    }),
  })
  const json = await res.json() as { code: number; msg: string; data: { taskId: string } }
  if (json.code !== 200) throw new Error(`Kie create task failed: ${json.msg}`)
  return json.data.taskId
}

// successFlag: 0 = generating, 1 = success, 2 = creation failed, 3 = generation failed
async function pollTask(taskId: string): Promise<string> {
  while (true) {
    await new Promise(r => setTimeout(r, 3000))
    const res = await fetch(`${BASE}/flux/kontext/record-info?taskId=${taskId}`, {
      headers: { 'Authorization': `Bearer ${KIE_API_KEY}` },
    })
    const json = await res.json() as {
      data: { successFlag: number; response?: { resultImageUrl?: string }; errorMessage?: string }
    }
    const { successFlag, response, errorMessage } = json.data
    console.log(`  successFlag: ${successFlag}`)
    if (successFlag === 1) {
      const url = response?.resultImageUrl
      if (!url) throw new Error('Success but no resultImageUrl in response')
      return url
    }
    if (successFlag === 2 || successFlag === 3) {
      throw new Error(`Kie generation failed: ${errorMessage ?? `successFlag ${successFlag}`}`)
    }
  }
}

async function downloadImage(url: string, outPath: string): Promise<void> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download image: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(outPath, buffer)
}

export async function generateImage(slug: string, title: string): Promise<string> {
  if (!KIE_API_KEY) {
    console.warn('⚠  KIE_API_KEY not set — skipping image generation')
    return ''
  }

  const prompt = `Dark minimal abstract tech illustration for a blog post titled "${title}". Deep dark background #0d0f14, subtle blue #4a9eff and orange #f07f3c accent elements. Clean geometric forms, professional, modern. No text.`

  console.log('Creating Kie image task...')
  const taskId = await createTask(prompt)
  console.log(`Task ID: ${taskId} — polling...`)

  const imageUrl = await pollTask(taskId)
  console.log(`Image ready, downloading...`)

  const outputDir = path.join(process.cwd(), 'public', 'images', 'blog')
  fs.mkdirSync(outputDir, { recursive: true })
  const outputPath = path.join(outputDir, `${slug}.jpg`)
  await downloadImage(imageUrl, outputPath)

  console.log(`Saved → public/images/blog/${slug}.jpg`)
  return `/images/blog/${slug}.jpg`
}

// CLI: npx tsx tools/generate_image.ts <slug> <title words...>
const [, , slug, ...titleWords] = process.argv
if (slug) {
  const title = titleWords.join(' ')
  generateImage(slug, title)
    .then(p => console.log('Done:', p))
    .catch(err => { console.error(err); process.exit(1) })
}
