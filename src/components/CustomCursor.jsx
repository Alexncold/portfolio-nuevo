import { useState, useEffect } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isInSecondSection, setIsInSecondSection] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseLeave = () => {
      setPosition({ x: -100, y: -100 }) // Esconder cursor cuando sale de la ventana
    }

    const secondSection = document.querySelector('.second-section')
    const handleEnterSecond = () => setIsInSecondSection(true)
    const handleLeaveSecond = () => setIsInSecondSection(false)

    if (secondSection) {
      secondSection.addEventListener('mouseenter', handleEnterSecond)
      secondSection.addEventListener('mouseleave', handleLeaveSecond)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (secondSection) {
        secondSection.removeEventListener('mouseenter', handleEnterSecond)
        secondSection.removeEventListener('mouseleave', handleLeaveSecond)
      }
    }
  }, [])

  return (
    <>
      {!isInSecondSection && (
        <>
          <div 
            className="custom-cursor-circle"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
          />
          <div 
            className="custom-cursor-dot"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
          />
        </>
      )}
      {isInSecondSection && (
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
