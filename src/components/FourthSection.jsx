import { useEffect, useRef } from 'react'
import './FourthSection.css'

export default function FourthSection() {
  const wavesSvgRef = useRef(null)
  const wave1Ref = useRef(null)
  const wave2Ref = useRef(null)
  const wave3Ref = useRef(null)

  useEffect(() => {
    const SAMPLE_COUNT = 400

    const configs = [
      {
        ref: wave1Ref,
        A1: 82,
        A2: 0,
        f1: 0.0115,
        f2: 0,
        s1: 0.42,
        s2: 0,
        phase0: 0
      },
      {
        ref: wave2Ref,
        A1: 48,
        A2: 0,
        f1: 0.0107,
        f2: 0,
        s1: 0.36,
        s2: 0,
        phase0: 2.1
      },
      {
        ref: wave3Ref,
        A1: 43,
        A2: 0,
        f1: 0.0111,
        f2: 0,
        s1: 0.39,
        s2: 0,
        phase0: 4.2
      }
    ]

    const buildPath = (cfg, tScroll, tBreath, width, height) => {
      const baseY = height * 0.5
      const xStart = -100
      const xEnd = width + 100
      const dx = (xEnd - xStart) / SAMPLE_COUNT
      let d = ''
      for (let i = 0; i <= SAMPLE_COUNT; i++) {
        const x = xStart + (i * dx)
        const spikeRaw = Math.sin((x * cfg.f1 * 0.5) + (tBreath * 0.4) + (cfg.phase0 * 2.3))
        const spikeMult = 1.0 + 0.125 * (1.0 + spikeRaw)
        const y =
          baseY
          + ((cfg.A1 * spikeMult) * Math.sin((x * cfg.f1) - (tScroll * cfg.s1) + cfg.phase0))
          + ((cfg.A1 * spikeMult) * 0.35 * Math.sin((x * 0.0031) + (tBreath * cfg.s1) + (cfg.phase0 * 0.7)))
        d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`
      }
      return d
    }

    const updateSvgSize = () => {
      const svg = wavesSvgRef.current
      if (!svg) return { width: 0, height: 0 }
      const rect = svg.getBoundingClientRect()
      const width = Math.max(1, rect.width)
      const height = Math.max(280, rect.height)
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
      return { width, height }
    }

    let size = updateSvgSize()
    const handleResize = () => {
      size = updateSvgSize()
    }

    window.addEventListener('resize', handleResize)

    let raf = 0
    const tick = (now) => {
      const tScroll = now * 0.00025
      const tBreath1 = now * 0.0032
      const tBreath2 = now * 0.0013
      const tBreath3 = now * 0.0032

      if (configs[0].ref.current) {
        configs[0].ref.current.setAttribute('d', buildPath(configs[0], tScroll, tBreath1, size.width, size.height))
      }
      if (configs[1].ref.current) {
        configs[1].ref.current.setAttribute('d', buildPath(configs[1], tScroll, tBreath2, size.width, size.height))
      }
      if (configs[2].ref.current) {
        configs[2].ref.current.setAttribute('d', buildPath(configs[2], tScroll, tBreath3, size.width, size.height))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="section fourth-section">
      <div className="fourth-talk-marquee" aria-label="Hablemos — Let's talk — Parliamo — Lass uns reden — Давайте поговорим — 話しましょう — Låt oss prata">
        <h2 className="fourth-talk-track">
          <span className="fourth-talk-text">Hablemos — Let&apos;s talk — Parliamo — Lass uns reden — Давайте поговорим — 話しましょう — Låt oss prata</span>
          <span className="fourth-talk-text" aria-hidden="true">Hablemos — Let&apos;s talk — Parliamo — Lass uns reden — Давайте поговорим — 話しましょう — Låt oss prata</span>
        </h2>
      </div>
      <div className="fourth-content-shell">
        <div className="fourth-waves" aria-hidden="true">
          <svg ref={wavesSvgRef} viewBox="0 0 2400 300" preserveAspectRatio="none" className="fourth-waves-svg">
            <path ref={wave1Ref} className="wave wave-1" d="M 0 150 L 2400 150" />
            <path ref={wave2Ref} className="wave wave-2" d="M 0 150 L 2400 150" />
            <path ref={wave3Ref} className="wave wave-3" d="M 0 150 L 2400 150" />
          </svg>
        </div>
      </div>
    </section>
  )
}
