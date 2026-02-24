import { useEffect, useRef, useState } from 'react'

export default function SecondSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isArrowDrawn, setIsArrowDrawn] = useState(false)
  const [isSpeedwalkerHovered, setIsSpeedwalkerHovered] = useState(false)
  const [isDungeonMasterHovered, setIsDungeonMasterHovered] = useState(false)
  const [isTrainedChefHovered, setIsTrainedChefHovered] = useState(false)
  const [walkFrame, setWalkFrame] = useState(0)

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

  // Shared animation frame logic
  useEffect(() => {
    let interval;
    if (isSpeedwalkerHovered || isDungeonMasterHovered || isTrainedChefHovered) {
      interval = setInterval(() => {
        setWalkFrame(prev => (prev === 0 ? 1 : 0));
      }, 400); // 400ms for a more relaxed 2-frame cartoon feel
    } else {
      setWalkFrame(0);
    }
    return () => clearInterval(interval);
  }, [isSpeedwalkerHovered, isDungeonMasterHovered, isTrainedChefHovered]);

  const getAvatarImage = () => {
    if (isSpeedwalkerHovered) {
      return walkFrame === 0
        ? "https://iili.io/qKGYd11.png"
        : "https://iili.io/qKGY2rF.png";
    }
    if (isDungeonMasterHovered) {
      return walkFrame === 0
        ? "https://iili.io/qKG7pzQ.png"
        : "https://iili.io/qKGY9LB.png";
    }
    if (isTrainedChefHovered) {
      return walkFrame === 0
        ? "https://iili.io/qKG7t5b.png"
        : "https://iili.io/qKVoalj.png";
    }
    return "https://i.ibb.co/HTjyR6Rg/avatar-big.png";
  };

  const getAvatarTransform = () => {
    if (isDungeonMasterHovered) {
      // Rotate -15deg (left) for frame 0, 15deg (right) for frame 1 around center (135, 135)
      return walkFrame === 0 ? "rotate(-15 135 135)" : "rotate(15 135 135)";
    }
    return "";
  };

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
                href={getAvatarImage()}
                x="75"
                y="75"
                width="120"
                height="120"
                className="section-avatar-image"
                mask="url(#section-avatar-mask)"
                transform={getAvatarTransform()}
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
            <div className={`side-text-title-mask ${isVisible ? 'is-visible' : ''}`}>
              <p className="side-text-title">Pero también soy</p>
              <div className="side-text-title-underline"></div>
            </div>
            <ul className="side-text-list">
              <li
                className={isVisible ? 'is-visible' : ''}
                onMouseEnter={() => setIsSpeedwalkerHovered(true)}
                onMouseLeave={() => setIsSpeedwalkerHovered(false)}
              >
                <span className="item-num">
                  {splitText("(01)", 2.6, isVisible)}
                </span>
                {splitText(" SPEEDWALKER", 2.7, isVisible)}
              </li>
              <li
                className={isVisible ? 'is-visible' : ''}
                onMouseEnter={() => setIsDungeonMasterHovered(true)}
                onMouseLeave={() => setIsDungeonMasterHovered(false)}
              >
                <span className="item-num">
                  {splitText("(02)", 3.1, isVisible)}
                </span>
                {splitText(" DUNGEON MASTER", 3.2, isVisible)}
              </li>
              <li
                className={isVisible ? 'is-visible' : ''}
                onMouseEnter={() => setIsTrainedChefHovered(true)}
                onMouseLeave={() => setIsTrainedChefHovered(false)}
              >
                <span className="item-num">
                  {splitText("(03)", 3.6, isVisible)}
                </span>
                {splitText(" TRAINED CHEF", 3.7, isVisible)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper to split text for staggered animation
function splitText(text, baseDelay, isVisible) {
  return text.split('').map((char, index) => (
    <span
      key={index}
      className="char"
      style={{
        animationDelay: isVisible ? `${baseDelay + (index * 0.03)}s` : '0s'
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
}