import { useState, useEffect } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseLeave = () => {
      setPosition({ x: -100, y: -100 }) // Esconder cursor cuando sale de la ventana
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
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
  )
}
