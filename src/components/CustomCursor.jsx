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
        
        // Priorizar el color del texto sobre el fondo
        const textColor = computedStyle.color
        const bgColor = computedStyle.backgroundColor
        
        // Función para convertir color a luminosidad
        const getLuminance = (colorStr) => {
          // CORREGIDO: Regex ahora acepta espacios opcionales
          const rgbMatch = colorStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1])
            const g = parseInt(rgbMatch[2])
            const b = parseInt(rgbMatch[3])
            // Fórmula estándar de luminosidad relativa
            return (0.299 * r + 0.587 * g + 0.114 * b) / 255
          }
          return 0.5 // Default si no puede detectar
        }
        
        // Si el elemento tiene texto, usar el color del texto
        const elementText = element.textContent || element.innerText
        let isLightSurface = false
        
        if (elementText.trim().length > 0) {
          // Es un elemento con texto, usar el color del texto
          const textLuminance = getLuminance(textColor)
          isLightSurface = textLuminance > 0.7 // Texto claro
        } else {
          // Es un elemento sin texto, usar el color de fondo
          const bgLuminance = getLuminance(bgColor)
          isLightSurface = bgLuminance > 0.7 // Fondo claro
        }
        
        setIsDarkBackground(!isLightSurface)
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
