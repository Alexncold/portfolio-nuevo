import { useEffect, useRef, useState, useMemo } from 'react'

const SPEEDWALKER_FRAMES = [
  "https://i.ibb.co/wrFPCPc6/1.png",
  "https://i.ibb.co/whtr9wGW/2.png",
  "https://i.ibb.co/DHZf3ynH/3.png",
  "https://i.ibb.co/11tXWPd/4.png",
  "https://i.ibb.co/DfZhDKF1/5.png",
  "https://i.ibb.co/DPTmYdFB/6.png",
  "https://i.ibb.co/zTKQS4BP/7.png",
  "https://i.ibb.co/fd7Gzj4r/8.png",
  "https://i.ibb.co/V0QDNF43/9.png",
  "https://i.ibb.co/ZprcRCSj/10.png"
];

const DUNGEON_MASTER_FRAMES = [
  "https://iili.io/qKG7pzQ.png",
  "https://iili.io/qKGY9LB.png"
];

const TRAINED_CHEF_FRAMES = [
  "https://iili.io/qKG7t5b.png",
  "https://iili.io/qKVoalj.png"
];

const DEFAULT_AVATAR = "https://i.ibb.co/HTjyR6Rg/avatar-big.png";

export default function SecondSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isArrowDrawn, setIsArrowDrawn] = useState(false)

  // Consolidamos el estado de hover
  const [hoveredRole, setHoveredRole] = useState(null) // null | 'speedwalker' | 'dungeonmaster' | 'chef'
  const [walkFrame, setWalkFrame] = useState(0)

  // Precarga de imágenes
  useEffect(() => {
    const allImages = [
      ...SPEEDWALKER_FRAMES,
      ...DUNGEON_MASTER_FRAMES,
      ...TRAINED_CHEF_FRAMES,
      DEFAULT_AVATAR
    ];
    allImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

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
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  // Lógica de animación optimizada
  useEffect(() => {
    let interval;
    if (hoveredRole) {
      const isSpeedwalker = hoveredRole === 'speedwalker';
      const maxFrames = isSpeedwalker ? 10 : 2;
      const intervalMs = isSpeedwalker ? 100 : 400;

      interval = setInterval(() => {
        setWalkFrame(prev => (prev + 1) % maxFrames);
      }, intervalMs);
    } else {
      setWalkFrame(0);
    }
    return () => clearInterval(interval);
  }, [hoveredRole]);

  const currentAvatarInfo = useMemo(() => {
    let src = DEFAULT_AVATAR;
    let transform = "";

    if (hoveredRole === 'speedwalker') {
      src = SPEEDWALKER_FRAMES[walkFrame] || SPEEDWALKER_FRAMES[0];
    } else if (hoveredRole === 'dungeonmaster') {
      src = DUNGEON_MASTER_FRAMES[walkFrame % 2];
      transform = walkFrame % 2 === 0 ? "rotate(-15 135 135)" : "rotate(15 135 135)";
    } else if (hoveredRole === 'chef') {
      src = TRAINED_CHEF_FRAMES[walkFrame % 2];
    }

    return { src, transform };
  }, [hoveredRole, walkFrame]);

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
          <p className={`section-side-text ${isVisible ? 'is-visible' : ''}`}>
            Soy Ale, trabajo<br />como UXD hace más<br />de 5 años
          </p>

          <div className="section-avatar-container">
            <svg viewBox="0 0 270 270" className="section-avatar-svg">
              <defs>
                <path id="section-circle-text" d="M 135, 135 m -105, 0 a 105,105 0 1,1 210,0 a 105,105 0 1,1 -210,0" />
                <mask id="section-avatar-mask">
                  <rect width="270" height="270" fill="black" />
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
                href={currentAvatarInfo.src}
                x="75"
                y="75"
                width="120"
                height="120"
                className="section-avatar-image"
                mask="url(#section-avatar-mask)"
                transform={currentAvatarInfo.transform}
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

          <div className="section-side-text-right">
            <div className={`side-text-title-mask ${isVisible ? 'is-visible' : ''}`}>
              <p className="side-text-title">Pero también soy</p>
              <div className="side-text-title-underline"></div>
            </div>
            <ul className="side-text-list">
              <li
                className={isVisible ? 'is-visible' : ''}
                onMouseEnter={() => setHoveredRole('speedwalker')}
                onMouseLeave={() => setHoveredRole(null)}
              >
                <span className="item-num">
                  {splitText("(01)", 2.6, isVisible)}
                </span>
                {splitText(" SPEEDWALKER", 2.7, isVisible)}
              </li>
              <li
                className={isVisible ? 'is-visible' : ''}
                onMouseEnter={() => setHoveredRole('dungeonmaster')}
                onMouseLeave={() => setHoveredRole(null)}
              >
                <span className="item-num">
                  {splitText("(02)", 3.1, isVisible)}
                </span>
                {splitText(" DUNGEON MASTER", 3.2, isVisible)}
              </li>
              <li
                className={isVisible ? 'is-visible' : ''}
                onMouseEnter={() => setHoveredRole('chef')}
                onMouseLeave={() => setHoveredRole(null)}
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