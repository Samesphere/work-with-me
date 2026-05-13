'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogList({ articles }: { articles: ArticleMeta[] }) {
  const [active, setActive] = useState<string | null>(null)
  const categories = [...new Set(articles.map(a => a.category))]
  const filtered = active ? articles.filter(a => a.category === active) : articles

  return (
    <>
      {categories.length > 1 && (
        <div className="category-filter">
          <button
            className={`category-btn${!active ? ' active' : ''}`}
            onClick={() => setActive(null)}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn${active === cat ? ' active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      <div className="blog-grid">
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--muted)', padding: '32px 0' }}>No articles yet.</p>
        ) : (
          filtered.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="blog-card">
              <p className="blog-card-meta">
                {article.category} · {formatDate(article.date)}
              </p>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </Link>
          ))
        )}
      </div>
    </>
  )
}
