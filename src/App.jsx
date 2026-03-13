import { useLayoutEffect } from 'react'
import FirstSection from './components/FirstSection'
import SecondSection from './components/SecondSection'
import ThirdSection from './components/ThirdSection'
import FourthSection from './components/FourthSection'
import FooterSection from './components/FooterSection'
import './App.css'

function App() {
  useLayoutEffect(() => {
    const resetScrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    resetScrollTop()
    requestAnimationFrame(resetScrollTop)
    window.addEventListener('pageshow', resetScrollTop)

    return () => {
      window.removeEventListener('pageshow', resetScrollTop)
    }
  }, [])

  return (
    <>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FooterSection />
    </>
  )
}

export default App
