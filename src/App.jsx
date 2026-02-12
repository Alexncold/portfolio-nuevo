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
