import { useEffect, useRef, useState } from 'react'

export default function SecondSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const currentRef = sectionRef.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [isVisible])

  return (
    <section className="section second-section" ref={sectionRef}>
      <div className="lorem-container section-text-block">
        <p className={`section-text section-text-1 ${isVisible ? 'is-visible' : ''}`}>
          ANTES DE SEGUIR
        </p>
        <p className={`section-text section-text-2 ${isVisible ? 'is-visible' : ''}`}>
          TE INVITO A <span className="bold-text">CONOCERME</span>
        </p>

        <div className="section-content-row">
          {/* Avatar circular */}
          <div className="section-avatar-container">
            <svg viewBox="0 0 270 270" className="section-avatar-svg">
              <defs>
                <path id="section-circle-text" d="M 135, 135 m -105, 0 a 105,105 0 1,1 210,0 a 105,105 0 1,1 -210,0" />
                <mask id="section-avatar-mask">
                  {/* Fondo negro: oculta todo por defecto */}
                  <rect width="270" height="270" fill="black" />
                  {/* Zigzag blanco: el "marcador" que revela la imagen */}
                  <path
                    d="M 75 82 H 195 L 75 97 H 195 L 75 112 H 195 L 75 127 H 195 L 75 142 H 195 L 75 157 H 195 L 75 172 H 195 L 75 187 H 195"
                    className={`section-mask-path ${isVisible ? 'is-visible' : ''}`}
                    pathLength="1"
                    transform="rotate(-80 135 135)"
                    fill="none"
                    stroke="white"
                    strokeWidth="22"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Rect final: sella el revelado con un blanco sólido */}
                  <rect
                    x="75"
                    y="75"
                    width="120"
                    height="120"
                    fill="white"
                    className={`section-mask-final ${isVisible ? 'is-visible' : ''}`}
                  />
                </mask>
              </defs>
              <circle
                cx="135"
                cy="135"
                r="82.5"
                fill="none"
                stroke="rgba(250, 250, 250, 1.0)"
                strokeWidth="0.5"
              />
              <image
                href="https://i.ibb.co/HTjyR6Rg/avatar-big.png"
                x="75"
                y="75"
                width="120"
                height="120"
                className="section-avatar-image"
                mask="url(#section-avatar-mask)"
              />
              <text className="section-avatar-text" fill="rgba(250, 250, 250, 1.0)" fontSize="13" letterSpacing="0.4" dominantBaseline="middle">
                <textPath href="#section-circle-text" textLength="660" lengthAdjust="spacing">
                  EN&#160;MARKETING UX&#160;DESIGNER FRONTEND&#160;VIBE&#160;CODER COPYWRITER RESEARCHER&#160;●&#160;TÉCNICO&#160;
                </textPath>
              </text>
              <circle
                cx="135"
                cy="135"
                r="127.5"
                fill="none"
                stroke="rgba(250, 250, 250, 1.0)"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}