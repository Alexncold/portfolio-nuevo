import { useEffect, useRef, useState } from 'react'
import './FooterSection.css'

const FOOTER_BRAND_NAME = 'Alejandro S.'

export default function FooterSection() {
  const footerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const currentRef = footerRef.current
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

  return (
    <footer className="footer-section" ref={footerRef}>
      <div className="footer-inner">
        <div className="footer-brand-block">
          <h4 className={`footer-brand-name ${isVisible ? 'is-visible' : ''}`}>
            {FOOTER_BRAND_NAME.split('').map((char, index) => (
              <span key={`${char}-${index}`} className="footer-brand-name-char-mask">
                <span className="footer-brand-name-char" style={{ animationDelay: `${0.2 + (index * 0.035)}s` }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              </span>
            ))}
          </h4>
          <p className={`footer-brand-role ${isVisible ? 'is-visible' : ''}`}>
            <span className="footer-brand-role-reveal">
              <span className="footer-brand-dash">{'\u2014'}</span>
              <span>UX Designer</span>
            </span>
          </p>
        </div>

        <div className="footer-links-block">
          <div className="footer-col">
            <p className="footer-col-label">PORTFOLIO</p>
            <button
              type="button"
              className={`footer-col-item footer-nav-button use-native-cursor footer-reveal footer-reveal-1 ${isVisible ? 'is-visible' : ''}`}
              onClick={() => scrollToSection('section-2')}
            >
              Conoceme
            </button>
            <button
              type="button"
              className={`footer-col-item footer-nav-button use-native-cursor footer-reveal footer-reveal-2 ${isVisible ? 'is-visible' : ''}`}
              onClick={() => scrollToSection('section-3')}
            >
              Mis proyectos
            </button>
          </div>

          <div className="footer-col">
            <p className="footer-col-label">WHATSAPP</p>
            <button
              type="button"
              className={`footer-col-main footer-nav-button use-native-cursor footer-reveal footer-reveal-3 ${isVisible ? 'is-visible' : ''}`}
              onClick={() => scrollToSection('section-4')}
            >
              Hablemos
            </button>
          </div>

          <div className="footer-col">
            <p className="footer-col-label">CONTACTO PROFESIONAL</p>
            <a className={`footer-col-link use-native-cursor footer-reveal footer-reveal-4 ${isVisible ? 'is-visible' : ''}`} href="https://www.linkedin.com/in/alejandro-stafuza/" target="_blank" rel="noreferrer">
              <span>Encuentrame en Linkedin</span>
              <span className="material-symbols-outlined footer-arrow" aria-hidden="true">east</span>
            </a>
            <div className="footer-col-underline" />
          </div>
        </div>
      </div>
    </footer>
  )
}
