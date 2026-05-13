import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllArticles, getArticle } from '@/lib/articles'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      ...(article.image && {
        images: [{ url: article.image, width: 1200, height: 630 }],
      }),
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { '@type': 'Person', name: 'Mark J Reynolds', url: 'https://markjreynolds.com' },
  }

  return (
    <>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section>
        <div className="article-header">
          <p className="eyebrow">
            {article.category} · {formatDate(article.date)}
          </p>
          <h1>{article.title}</h1>
          {article.description && <p className="article-desc">{article.description}</p>}
        </div>

        {article.image && (
          <Image
            src={article.image}
            alt={article.title}
            width={1200}
            height={630}
            className="article-hero"
          />
        )}

        <article className="prose prose-invert">
          <MDXRemote source={article.content} />
        </article>
      </section>
      <Footer />
    </>
  )
}
