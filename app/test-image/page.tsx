'use client'

import { useState } from 'react'

export default function TestImagePage() {
  const [status, setStatus] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    setLoading(true)
    setStatus('Creating task...')
    setImageUrl('')
    setError('')

    try {
      const res = await fetch('/api/kie-test', { method: 'POST' })
      const data = await res.json() as { taskId?: string; error?: string }

      if (data.error || !data.taskId) {
        setError(data.error ?? 'No taskId returned')
        setLoading(false)
        return
      }

      const { taskId } = data
      setStatus(`Task ${taskId} — polling every 3s...`)

      const poll = async () => {
        const r = await fetch(`/api/kie-status?taskId=${taskId}`)
        const result = await r.json() as { state: string; imageUrl?: string; failMsg?: string }

        if (result.state === 'success' && result.imageUrl) {
          setImageUrl(result.imageUrl)
          setStatus('Done.')
          setLoading(false)
        } else if (result.state === 'fail') {
          setError(`Generation failed: ${result.failMsg ?? 'unknown'}`)
          setLoading(false)
        } else {
          setStatus(`Status: ${result.state}...`)
          setTimeout(poll, 3000)
        }
      }

      setTimeout(poll, 3000)
    } catch (e) {
      setError(String(e))
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 48, background: 'var(--bg)', minHeight: '100vh' }}>
      <p style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
        Kie API test
      </p>
      <h2 style={{ color: 'var(--text)', marginBottom: 32, fontWeight: 500 }}>Image generation test</h2>

      <button onClick={generate} disabled={loading} className="btn btn-primary">
        {loading ? 'Generating…' : 'Generate test image'}
      </button>

      {status && (
        <p style={{ marginTop: 20, fontFamily: 'var(--font-dm-mono), monospace', fontSize: 12, color: 'var(--muted)' }}>
          {status}
        </p>
      )}

      {error && (
        <p style={{ marginTop: 20, fontFamily: 'var(--font-dm-mono), monospace', fontSize: 12, color: '#e05c5c' }}>
          Error: {error}
        </p>
      )}

      {imageUrl && (
        <div style={{ marginTop: 32 }}>
          <img
            src={imageUrl}
            alt="Kie generated"
            style={{ width: '100%', maxWidth: 800, borderRadius: 8, display: 'block' }}
          />
          <p style={{ marginTop: 12, fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11, color: 'var(--muted)', wordBreak: 'break-all' }}>
            {imageUrl}
          </p>
        </div>
      )}
    </div>
  )
}
