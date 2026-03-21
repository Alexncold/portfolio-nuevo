import { useState, useEffect } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isDesktopCursor, setIsDesktopCursor] = useState(false)
  const [isInSecondSection, setIsInSecondSection] = useState(false)
  const [isOverThirdCarousel, setIsOverThirdCarousel] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [useNativePointer, setUseNativePointer] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 769px) and (hover: hover) and (pointer: fine)')
    const updateDesktopCursor = () => setIsDesktopCursor(mediaQuery.matches)

    updateDesktopCursor()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateDesktopCursor)
      return () => mediaQuery.removeEventListener('change', updateDesktopCursor)
    }

    mediaQuery.addListener(updateDesktopCursor)
    return () => mediaQuery.removeListener(updateDesktopCursor)
  }, [])

  useEffect(() => {
    if (!isDesktopCursor) return undefined

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY)
      if (hoveredElement instanceof Element) {
        setIsInSecondSection(Boolean(hoveredElement.closest('.second-section')))
        setIsOverThirdCarousel(Boolean(hoveredElement.closest('.third-carousel')))
        setUseNativePointer(Boolean(hoveredElement.closest('.use-native-cursor')))
      } else {
        setIsInSecondSection(false)
        setIsOverThirdCarousel(false)
        setUseNativePointer(false)
      }
    }

    const handleMouseLeave = () => {
      setPosition({ x: -100, y: -100 }) // Esconder cursor cuando sale de la ventana
      setIsInSecondSection(false)
      setIsOverThirdCarousel(false)
      setIsMouseDown(false)
      setUseNativePointer(false)
    }
    const handleMouseDown = () => setIsMouseDown(true)
    const handleMouseUp = () => setIsMouseDown(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDesktopCursor])

  if (!isDesktopCursor) return null

  return (
    <>
      {!isInSecondSection && !useNativePointer && (
        <>
          <div 
            className={`custom-cursor-circle ${isOverThirdCarousel ? 'is-carousel-hover' : ''}`}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
          >
            <div className={`custom-cursor-arrows ${isOverThirdCarousel ? 'is-visible' : ''} ${isOverThirdCarousel && isMouseDown ? 'is-pressed' : ''}`}>
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
          <div 
            className={`custom-cursor-dot ${isOverThirdCarousel ? 'is-carousel-hover' : ''}`}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
          />
        </>
      )}
      {isInSecondSection && !useNativePointer && (
        <div
          className="custom-cursor-image"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        />
      )}
    </>
  )
}
