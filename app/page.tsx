import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'I embed directly with your team — mapping how work actually gets done, then building the systems that remove the manual effort.',
}

export default function WorkWithMePage() {
  return (
    <>
      <Navigation />

      {/* HERO */}
      <section className="hero">
        <p className="eyebrow">Based in Southport, Gold Coast</p>
        <h1>
          I build from <span className="a">inside</span>
          <br />
          your business.
        </h1>
        <p className="sub">
          I embed directly with your team — mapping how work actually gets done, then building the
          systems that remove the manual effort.
        </p>
        <div className="btn-row">
          <a href="tel:0415569760" className="btn btn-primary">
            Call Mark · 0415 569 760
          </a>
          <a href="#how" className="btn btn-ghost">
            See how it works
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <h2>How it works</h2>
        <p className="section-sub">No discovery calls that go nowhere. No proposals that gather dust.</p>
        <div className="steps">
          <div className="step">
            <span className="step-num">01</span>
            <div>
              <h3>Process Discovery Day</h3>
              <p>
                I come into your office, shadow your team, and ask the questions nobody else is asking.
                What's annoying? What gets done twice? What only happens because someone remembers to do
                it? I map the whole thing.
              </p>
            </div>
          </div>
          <div className="step">
            <span className="step-num">02</span>
            <div>
              <h3>You get a plain-English report</h3>
              <p>
                Every process I could automate or streamline — prioritised by effort and impact. You keep
                the report regardless. No obligation to go further.
              </p>
            </div>
          </div>
          <div className="step">
            <span className="step-num">03</span>
            <div>
              <h3>I embed and build</h3>
              <p>
                If you want to act on it, I work on-site or remotely at your pace — full-time or
                part-time. All I need is a desk and a laptop. I build the solutions, train your team, and
                hand everything over clean.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I BUILD */}
      <section>
        <h2>What I build</h2>
        <p className="section-sub">Practical systems your team will actually use. Not theory. Not prototypes.</p>
        <div className="tag-cloud">
          <span className="tag lit">n8n automation workflows</span>
          <span className="tag lit">AI agents</span>
          <span className="tag lit">RAG knowledge systems</span>
          <span className="tag">custom web tools</span>
          <span className="tag">Chrome extensions</span>
          <span className="tag">process documentation</span>
          <span className="tag">client intake systems</span>
          <span className="tag">internal dashboards</span>
          <span className="tag">email &amp; comms automation</span>
          <span className="tag">custom GPTs</span>
          <span className="tag">Claude Skills</span>
          <span className="tag">reporting automation</span>
        </div>
      </section>

      {/* HOW I ENGAGE */}
      <section>
        <h2>How I engage</h2>
        <p className="section-sub">Flexible by design. No retainers, no lock-in.</p>
        <div className="cards">
          <div className="card">
            <p className="card-label">Embedded contractor</p>
            <h3>On-site or remote — full or part time</h3>
            <p>
              I work inside your business like a team member. You give direction. I build. Best for
              businesses ready to move fast on multiple processes.
            </p>
            <span className="rate">$60/hr · all I need is a desk and a laptop</span>
          </div>
          <div className="card">
            <p className="card-label">Starting point</p>
            <h3>Process Discovery Day</h3>
            <p>
              One day. I map your workflows, identify the bottlenecks, and hand you a prioritised report
              of what's worth automating. A no-risk way to see what's possible.
            </p>
            <span className="rate">Get in touch to arrange</span>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section>
        <h2>Impact in action</h2>
        <p className="section-sub">Real problems. Real solutions. Real results.</p>

        <div className="case">
          <p className="case-client">Fuel Bakehouse Catering</p>
          <h3>Quote request automation</h3>
          <div className="case-row">
            <div>
              <p className="case-col-label">Problem</p>
              <p className="case-col">
                Every catering quote required manual data entry and email generation. 5 minutes per quote
                × 6 requests daily = 30 minutes of repetitive work, every day.
              </p>
            </div>
            <div>
              <p className="case-col-label">Solution</p>
              <p className="case-col">
                n8n workflow pulls the incoming request, writes to Google Sheets, generates the quote
                email, and sends a Telegram alert — automatically.
              </p>
            </div>
          </div>
          <p className="case-stack">Gmail · Google Sheets · n8n · Gemini · Telegram</p>
          <p className="case-impact">→ 30 minutes saved daily · 15 hours recovered per month</p>
        </div>

        <div className="case">
          <p className="case-client">BizBrains — Personal Knowledge System</p>
          <h3>RAG-based knowledge &amp; process retrieval</h3>
          <div className="case-row">
            <div>
              <p className="case-col-label">Problem</p>
              <p className="case-col">
                Documented processes and business knowledge scattered across tools. Finding anything took
                longer than just doing it from memory.
              </p>
            </div>
            <div>
              <p className="case-col-label">Solution</p>
              <p className="case-col">
                Built a RAG system that indexes all documents, answers natural language questions, and
                surfaces the original source instantly.
              </p>
            </div>
          </div>
          <p className="case-stack">Claude Code · Coda · n8n · Supabase · Cohere Re-Ranker · OpenAI · Vercel</p>
          <p className="case-impact">→ Live and in ongoing development</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to find out what's possible?</h2>
        <p>
          Let's start with a conversation. No pitch. Just a look at how your business runs and whether I
          can help.
        </p>
        <div className="btn-row">
          <a href="tel:0415569760" className="btn btn-primary">
            Call Mark · 0415 569 760
          </a>
        </div>
        <div className="cta-links">
          <a href="mailto:mark@markjreynolds.com">mark@markjreynolds.com</a>
          <a href="https://linkedin.com/in/markjreynolds78">Connect on LinkedIn</a>
        </div>
      </section>

      <Footer />
    </>
  )
}
