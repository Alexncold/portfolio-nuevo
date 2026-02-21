import MainContainer from './MainContainer'
import CustomCursor from './CustomCursor'
import SpotlightEffect from './SpotlightEffect'
import ScrollAnimations from './ScrollAnimations'

export default function FirstSection() {
  return (
    <section className="section first-section">
      <div className="reveal-container"></div>
      <SpotlightEffect />
      <CustomCursor />
      <ScrollAnimations />
      <MainContainer>
        {/* Contenido del portfolio irá aquí */}
      </MainContainer>
      <nav className="navbar">
        <div className="navbar-logo">
          <svg viewBox="0 0 100 100" className="logo-svg">
            <defs>
              <path id="circle-text" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
              <mask id="logo-mask">
                <rect width="100" height="100" fill="black" />
                <path
                  d="M 20 25 H 80 L 20 33 H 80 L 20 41 H 80 L 20 49 H 80 L 20 57 H 80 L 20 65 H 80 L 20 73 H 80"
                  className="mask-path"
                  pathLength="1"
                  transform="rotate(-12 50 50)"
                  fill="none"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="25"
                  y="25"
                  width="50"
                  height="50"
                  fill="white"
                  className="mask-final"
                />
              </mask>
            </defs>
            <image
              href="https://i.ibb.co/pBf7cqyr/avatar-ale-light.png"
              x="25"
              y="25"
              width="50"
              height="50"
              mask="url(#logo-mask)"
            />
            <text className="logo-text" fill="rgba(250, 250, 250, 1.0)" fontSize="11" letterSpacing="1">
              <textPath href="#circle-text" startOffset="25%" textAnchor="middle">
                ALEJANDRO.S
              </textPath>
            </text>
            <text className="logo-text" fill="rgba(250, 250, 250, 1.0)" fontSize="11" letterSpacing="1">
              <textPath href="#circle-text" startOffset="75%" textAnchor="middle">
                ALEJANDRO.S
              </textPath>
            </text>
          </svg>
        </div>
        <div className="navbar-text-container">
          <div className="navbar-text-mask">
            <a href="https://www.linkedin.com/in/alejandro-stafuza/" className="navbar-text" target="_blank" rel="noopener noreferrer">
              <span>Linkedin</span>
              <span className="material-symbols-outlined">
                east
              </span>
            </a>
            <div className="navbar-underline"></div>
          </div>
        </div>
      </nav>
      <div className="content-container">
        <div className="title-group">
          <div className="prueba-text">
            <span className="text-part-1">ALEJANDRO.</span><span className="text-part-2">S</span>
          </div>
          <div className="subtitle">
            (ux designer)
          </div>
        </div>
        <div className="location-text">
          BASED IN<br />ARGENTINA
        </div>
        <div className="location-text-right">
          PORTFOLIO / PROYECTOS<br />/ TRABAJOS
          <div className="location-text-light">
            BIENVENIDO AL REPO DE<br />MIS DISEÑOS
          </div>
        </div>
        <div className="location-text-light">
          EN UNA MÁGICA<br />PROVINCIA<br />DEL NORTE
        </div>
        <div className="scroll-indicator">
          <svg width="30" height="100" viewBox="0 0 30 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className="arrow-line"
              d="M15 0L15 98"
              pathLength="1"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              className="arrow-tip-left"
              d="M15 98L11 94"
              pathLength="1"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              className="arrow-tip-right"
              d="M15 98L19 94"
              pathLength="1"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
