'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav>
      <a className="logo" href="https://markjreynolds.com" style={{ textDecoration: 'none' }}>
        MJR
      </a>
      <div className="links">
        <Link href="/" className={pathname === '/' ? 'active' : ''}>
          Work With Me
        </Link>
        <Link href="/blog" className={pathname.startsWith('/blog') ? 'active' : ''}>
          Blog
        </Link>
      </div>
    </nav>
  )
}
