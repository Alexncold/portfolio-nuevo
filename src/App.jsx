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
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(250, 250, 250, 1.0)" strokeWidth="1" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(250, 250, 250, 1.0)" strokeWidth="0.5" />
            <text className="logo-text" fill="rgba(250, 250, 250, 1.0)" fontSize="8" letterSpacing="1">
              <textPath href="#circle-text" startOffset="25%" textAnchor="middle">
                alejandro ux designer
              </textPath>
            </text>
          </svg>
        </div>
        <div className="navbar-text-container">
          <a href="https://linkedin.com" className="navbar-text" target="_blank" rel="noopener noreferrer">
            <span>Linkedin</span>
            <span className="material-symbols-outlined">
              east
            </span>
          </a>
          <div className="navbar-underline"></div>
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
