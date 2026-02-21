import { useEffect, useRef, useState } from 'react'

export default function SecondSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isArrowDrawn, setIsArrowDrawn] = useState(false)

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

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsArrowDrawn(true)
      }, 1800) // Trigger at 1.8s during the 3.5s path animation
      return () => clearTimeout(timer)
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

        <svg
          className={`section-connection-arrow ${isVisible ? 'is-visible' : ''} ${isArrowDrawn ? 'arrowhead-visible' : ''}`}
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >

          <defs>
            <marker
              id="section-connection-arrowhead"
              markerWidth="14"
              markerHeight="14"
              refX="10"
              refY="7"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path
                className="section-connection-arrowhead-side section-connection-arrowhead-side-1"
                d="M 0 0 L 14 7"
                pathLength="1"
                fill="none"
                stroke="rgba(250, 250, 250, 1.0)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="section-connection-arrowhead-side section-connection-arrowhead-side-2"
                d="M 14 7 L 0 14"
                pathLength="1"
                fill="none"
                stroke="rgba(250, 250, 250, 1.0)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>
          <path
            className="section-connection-arrow-body"
            d="M 713 133 C 1135 86 1061 211 916 210 C 786 215 506 101 357 228 C 315 268 306 326 322 371"
            pathLength="1"
            fill="none"
            stroke="rgba(250, 250, 250, 1.0)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            markerEnd="url(#section-connection-arrowhead)"
          />
        </svg>

        <div className="section-content-row">
          {/* Texto lateral izquierdo */}
          <p className={`section-side-text ${isVisible ? 'is-visible' : ''}`}>
            Soy Ale, trabajo<br />como UXD hace más<br />de 5 años
          </p>

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

          {/* Texto lateral derecho y lista de habilidades */}
          <div className="section-side-text-right">
            <p className="side-text-title">Pero también soy</p>
            <ul className="side-text-list">
              <li><span className="item-num">(01)</span> SPEEDWALKER</li>
              <li><span className="item-num">(02)</span> DUNGEON MASTER</li>
              <li><span className="item-num">(03)</span> TRAINED CHEF</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}