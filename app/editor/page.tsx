'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import TiptapLink from '@tiptap/extension-link'
import { useState, useCallback } from 'react'

const CATEGORIES = ['Case Studies', 'Solutions', 'Thinking Out Loud', 'Messy Updates']

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function EditorPage() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Thinking Out Loud')
  const [slug, setSlug] = useState('')
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      TiptapLink.configure({ openOnClick: false }),
    ],
    content: '<p>Start writing here...</p>',
    editorProps: {
      attributes: { spellcheck: 'true' },
    },
  })

  const handleTitleChange = (val: string) => {
    setTitle(val)
    setSlug(slugify(val))
  }

  const getMarkdown = useCallback(() => {
    if (!editor) return ''
    return editor.storage.markdown.getMarkdown() as string
  }, [editor])

  const copyMarkdown = async () => {
    const md = getMarkdown()
    await navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const saveDraft = async () => {
    if (!slug) { setMessage('Enter a title first'); return }
    if (!editor) return
    setSaving(true)
    setMessage('')
    const date = new Date().toISOString().split('T')[0]
    const content = `---
title: "${title}"
date: "${date}"
category: "${category}"
description: ""
image: ""
tags: []
draft: true
---

${getMarkdown()}`

    try {
      const res = await fetch('/api/save-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, content }),
      })
      if (res.ok) {
        setMessage(`Saved to content/blog/${slug}.mdx`)
      } else {
        setMessage('Save failed — check the dev server console')
      }
    } catch {
      setMessage('Save failed — is the dev server running?')
    } finally {
      setSaving(false)
    }
  }

  const btn = (label: string, onClick: () => void, active?: boolean) => (
    <button
      key={label}
      onClick={onClick}
      className={`editor-btn${active ? ' is-active' : ''}`}
      type="button"
    >
      {label}
    </button>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Meta */}
        <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="Article title"
            style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '12px 16px',
              color: 'var(--text)',
              fontSize: 20,
              fontWeight: 500,
              width: '100%',
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: 12 }}>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '8px 12px',
                color: 'var(--muted)',
                fontSize: 13,
                fontFamily: 'var(--font-dm-mono), monospace',
              }}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              value={slug}
              onChange={e => setSlug(e.target.value)}
              placeholder="slug (auto-filled)"
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '8px 12px',
                color: 'var(--muted)',
                fontSize: 12,
                fontFamily: 'var(--font-dm-mono), monospace',
                flex: 1,
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="editor-toolbar">
          {editor && (
            <>
              {btn('B', () => editor.chain().focus().toggleBold().run(), editor.isActive('bold'))}
              {btn('I', () => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'))}
              {btn('H2', () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 }))}
              {btn('H3', () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive('heading', { level: 3 }))}
              {btn('•', () => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList'))}
              {btn('`', () => editor.chain().focus().toggleCode().run(), editor.isActive('code'))}
              {btn('```', () => editor.chain().focus().toggleCodeBlock().run(), editor.isActive('codeBlock'))}
            </>
          )}
        </div>

        {/* Editor */}
        <div className="editor-wrap">
          <EditorContent editor={editor} />
        </div>

        {/* Actions */}
        <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={copyMarkdown} className="btn btn-ghost" style={{ fontSize: 13 }}>
            {copied ? 'Copied!' : 'Copy as Markdown'}
          </button>
          <button
            onClick={saveDraft}
            disabled={saving}
            className="btn btn-primary"
            style={{ fontSize: 13, opacity: saving ? 0.6 : 1 }}
          >
            {saving ? 'Saving…' : 'Save Draft'}
          </button>
          {message && (
            <span style={{ color: 'var(--muted)', fontSize: 12, fontFamily: 'var(--font-dm-mono), monospace' }}>
              {message}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
