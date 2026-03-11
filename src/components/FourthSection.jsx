import { useEffect, useRef, useState } from 'react'
import './FourthSection.css'

const FOURTH_CTA_TEXT = 'Envíame un WhatsApp'
const FOURTH_LABEL_TEXT = 'HABLEMOS'
const FOURTH_THANKS_KICKER = 'CONTACTO'

export default function FourthSection() {
  const wavesSvgRef = useRef(null)
  const wave1Ref = useRef(null)
  const wave2Ref = useRef(null)
  const wave3Ref = useRef(null)
  const sectionRef = useRef(null)
  const ctaInputRef = useRef(null)
  const submitDoneTimeoutRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isCtaActive, setIsCtaActive] = useState(false)
  const [ctaValue, setCtaValue] = useState(FOURTH_CTA_TEXT)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const canSend = ctaValue.trim() !== '' && ctaValue !== FOURTH_CTA_TEXT
  const isSendActive = !isSubmitted && (isCtaActive || canSend)

  useEffect(() => {
    const currentRef = sectionRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(currentRef)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isCtaActive || !ctaInputRef.current) return
    ctaInputRef.current.focus()
    ctaInputRef.current.setSelectionRange(0, 0)
  }, [isCtaActive])

  useEffect(() => {
    return () => {
      if (submitDoneTimeoutRef.current) {
        clearTimeout(submitDoneTimeoutRef.current)
      }
    }
  }, [])

  const handleSend = () => {
    if (!canSend || isSubmitting || isSubmitted) return
    setIsCtaActive(false)
    if (ctaInputRef.current) ctaInputRef.current.blur()
    setIsSubmitting(true)

    if (submitDoneTimeoutRef.current) {
      clearTimeout(submitDoneTimeoutRef.current)
    }
    submitDoneTimeoutRef.current = setTimeout(() => {
      setIsSubmitted(true)
    }, 360)
  }

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
    <section className="section fourth-section" ref={sectionRef}>
      <div className="fourth-talk-marquee" aria-label="Hablemos — Let's talk — Parliamo — Lass uns reden — Давайте поговорим — 話しましょう — Låt oss prata —">
        <h2 className="fourth-talk-track">
          <span className="fourth-talk-text">Hablemos — Let&apos;s talk — Parliamo — Lass uns reden — Давайте поговорим — 話しましょう — Låt oss prata —</span>
          <span className="fourth-talk-text" aria-hidden="true">Hablemos — Let&apos;s talk — Parliamo — Lass uns reden — Давайте поговорим — 話しましょう — Låt oss prata —</span>
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
        <div className="fourth-content-inner">
          <div className={`fourth-primary-stack ${isSubmitting ? 'is-exiting' : ''} ${isSubmitted ? 'is-hidden' : ''}`}>
            <h3 className={`fourth-glass-title ${isVisible ? 'is-visible' : ''}`}>
              <span className="fourth-glass-title-line fourth-glass-title-line-1">
                {'\u00BF'}Tienes algun
              </span>
              <span className="fourth-glass-title-line fourth-glass-title-line-2">
                proyecto en mente?
              </span>
            </h3>
            <div className={`fourth-contact-input-wrap ${isSubmitting ? 'is-exiting' : ''}`}>
              <label className={`fourth-contact-label ${isVisible ? 'is-visible' : ''}`}>
                {FOURTH_LABEL_TEXT.split('').map((char, index) => (
                  <span key={`${char}-${index}`} className="fourth-contact-label-mask">
                    <span className="fourth-contact-label-char" style={{ animationDelay: `${0.62 + (index * 0.03)}s` }}>
                      {char}
                    </span>
                  </span>
                ))}
              </label>
              <div className="fourth-contact-row">
                <input
                  ref={ctaInputRef}
                  className={`fourth-contact-editable ${isCtaActive ? 'is-active' : ''}`}
                  type="text"
                  maxLength={28}
                  value={ctaValue}
                  onChange={(e) => setCtaValue(e.target.value)}
                  onWheel={(e) => e.preventDefault()}
                  onScroll={(e) => {
                    e.currentTarget.scrollTop = 0
                    e.currentTarget.scrollLeft = 0
                  }}
                  onFocus={(e) => {
                    setIsCtaActive(true)
                    if (ctaValue === FOURTH_CTA_TEXT) {
                      setCtaValue('')
                    }
                    requestAnimationFrame(() => {
                      e.currentTarget.setSelectionRange(0, 0)
                    })
                  }}
                  onBlur={() => {
                    setIsCtaActive(false)
                    if (!ctaValue.trim()) {
                      setCtaValue(FOURTH_CTA_TEXT)
                    }
                  }}
                  aria-label={FOURTH_CTA_TEXT}
                />
              </div>
              {!isSubmitted && (
                <button
                  className={`fourth-send-button ${isVisible ? 'is-visible' : ''} ${isSendActive ? 'is-active' : ''}`}
                  type="button"
                  onClick={handleSend}
                  disabled={isSubmitting}
                >
                  <span>Enviar</span>
                  <span className="material-symbols-outlined fourth-send-button-icon" aria-hidden="true">east</span>
                </button>
              )}
            </div>
          </div>
          {isSubmitted && (
            <div className="fourth-thanks-block is-visible">
              <p className="fourth-thanks-kicker">
                {FOURTH_THANKS_KICKER.split('').map((char, index) => (
                  <span key={`${char}-${index}`} className="fourth-thanks-kicker-mask">
                    <span className="fourth-thanks-kicker-char" style={{ animationDelay: `${0.05 + (index * 0.04)}s` }}>
                      {char}
                    </span>
                  </span>
                ))}
              </p>
              <p className="fourth-thanks-text">
                <span className="fourth-thanks-line-mask">
                  <span className="fourth-thanks-line fourth-thanks-line-1">Muchas gracias por tu mensaje!</span>
                </span>
                <span className="fourth-thanks-line-mask">
                  <span className="fourth-thanks-line fourth-thanks-line-2">{'Te responder\u00E9 a la brevedad'}</span>
                </span>
              </p>
              <svg viewBox="0 0 28 22" className="fourth-thanks-check" aria-hidden="true">
                <path
                  className="fourth-thanks-check-path"
                  d="M 7 11 C 9 9 9 11 10 14 C 11 17 13 17 15 12 C 17 8 19 4 21 3"
                  pathLength="1"
                />
              </svg>
            </div>
          )}
          <div className="fourth-left-note">
            <svg viewBox="0 0 100 100" className={`fourth-corner-icon-svg ${isVisible ? 'is-visible' : ''}`} aria-hidden="true">
              <path className="fourth-corner-path fourth-corner-path-top" d="M 51 10 L 51 28 Q 51 51 71 51 L 90 51" />
              <path className="fourth-corner-path fourth-corner-path-bottom" d="M 10 49 L 29 49 Q 49 49 49 69 L 49 90" />
            </svg>
            <p className={`fourth-left-note-text ${isVisible ? 'is-visible' : ''}`}>
              <span className="fourth-left-note-line fourth-left-note-line-1">{'Redise\u00F1os de sitios, webs atrapantes,'}</span>
              <span className="fourth-left-note-line fourth-left-note-line-2">{'e-commerce que convierten. Trabajemos sobre'}</span>
              <span className="fourth-left-note-line fourth-left-note-line-3">{'lo que necesites.'}</span>
            </p>
          </div>
          <div className="fourth-whatsapp-floating" aria-hidden="true">
            <span className={`fourth-whatsapp-reveal ${isVisible ? 'is-visible' : ''}`}>
              <span className="fourth-whatsapp-icon">
                <svg viewBox="0 0 16 16" className="fourth-whatsapp-brand">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 8.165 0C3.734 0 .133 3.58.133 8c0 1.4.365 2.767 1.057 3.965L0 16l4.172-1.092a7.912 7.912 0 0 0 3.993 1.094h.003c4.43 0 8.03-3.58 8.031-8 0-2.136-.833-4.146-2.598-5.676zM8.168 14.66c-1.185 0-2.347-.314-3.372-.908l-.241-.144-2.475.648.66-2.413-.157-.248a6.593 6.593 0 0 1-1.016-3.502c0-3.66 2.984-6.64 6.65-6.64a6.626 6.626 0 0 1 4.7 1.943 6.592 6.592 0 0 1 1.94 4.694c-.001 3.66-2.984 6.64-6.65 6.64zm3.615-4.955c-.197-.099-1.17-.578-1.352-.644-.182-.066-.315-.099-.448.1-.132.197-.513.644-.628.776-.116.132-.231.149-.428.05-.197-.1-.832-.306-1.585-.975-.586-.521-.982-1.164-1.097-1.362-.116-.197-.012-.304.087-.403.09-.089.197-.231.296-.347.099-.116.132-.198.198-.33.066-.132.033-.248-.017-.347-.05-.099-.446-1.074-.61-1.47-.161-.387-.324-.335-.446-.341-.116-.007-.248-.008-.38-.008s-.347.05-.529.248c-.182.197-.694.677-.694 1.65 0 .974.71 1.915.809 2.048.1.132 1.394 2.128 3.379 2.983.472.203.84.325 1.128.416.474.151.906.13 1.247.079.38-.057 1.17-.479 1.336-.942.165-.463.165-.86.116-.942-.05-.083-.182-.132-.38-.23z" />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}











