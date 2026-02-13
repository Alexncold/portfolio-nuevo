import MainContainer from './components/MainContainer'
import CustomCursor from './components/CustomCursor'
import SpotlightEffect from './components/SpotlightEffect'
import './App.css'
import './components/CustomCursor.css'

function App() {
  return (
    <>
      <div className="reveal-container"></div>
      <SpotlightEffect />
      <CustomCursor />
      <MainContainer>
        {/* Contenido del portfolio irá aquí */}
      </MainContainer>
      <nav className="navbar">
        <div className="navbar-logo">
          <svg viewBox="0 0 100 100" className="logo-svg">
            <defs>
              <path id="circle-text" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
            </defs>
            <image href="https://i.ibb.co/pBf7cqyr/avatar-ale-light.png" x="25" y="25" width="50" height="50" />
            <text className="logo-text" fill="rgba(250, 250, 250, 1.0)" fontSize="14" letterSpacing="1">
              <textPath href="#circle-text" startOffset="25%" textAnchor="middle">
                alejandro.s
              </textPath>
            </text>
            <text className="logo-text" fill="rgba(250, 250, 250, 1.0)" fontSize="14" letterSpacing="1">
              <textPath href="#circle-text" startOffset="75%" textAnchor="middle">
                alejandro.s
              </textPath>
            </text>
          </svg>
        </div>
        <div className="navbar-text-container">
          <div className="navbar-text-mask">
            <a href="https://linkedin.com" className="navbar-text" target="_blank" rel="noopener noreferrer">
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
        <div className="prueba-text">
          <span className="text-part-1">ALEJANDRO.</span><span className="text-part-2">S</span>
        </div>
        <div className="subtitle">
          (ux designer)
        </div>
      </div>
    </>
  )
}

export default App
