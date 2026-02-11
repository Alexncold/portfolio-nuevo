import { useState, useEffect } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDarkBackground, setIsDarkBackground] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Detectar color del fondo en la posición del cursor
      const element = document.elementFromPoint(e.clientX, e.clientY)
      if (element) {
        const computedStyle = window.getComputedStyle(element)
        const bgColor = computedStyle.backgroundColor
        
        // Convertir RGB a valores numéricos para determinar si es oscuro o claro
        const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
        if (rgbMatch) {
          const r = parseInt(rgbMatch[1])
          const g = parseInt(rgbMatch[2])
          const b = parseInt(rgbMatch[3])
          
          // Calcular luminosidad (fórmula estándar)
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
          setIsDarkBackground(luminance < 0.5)
        }
      }
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
        className={`custom-cursor-circle ${isDarkBackground ? 'dark-bg' : 'light-bg'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div 
        className={`custom-cursor-dot ${isDarkBackground ? 'dark-bg' : 'light-bg'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  )
}
