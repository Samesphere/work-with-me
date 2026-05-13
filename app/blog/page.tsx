import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllArticles } from '@/lib/articles'
import BlogList from './BlogList'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing on automation, AI agents, and building systems inside real businesses.',
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <>
      <Navigation />
      <section>
        <h2>Writing</h2>
        <p className="section-sub">
          Automation, AI agents, and what actually happens when you build this stuff inside real
          businesses.
        </p>
        <BlogList articles={articles} />
      </section>
      <Footer />
    </>
  )
}
