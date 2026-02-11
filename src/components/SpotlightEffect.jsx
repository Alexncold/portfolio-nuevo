import { useEffect } from 'react'
import './SpotlightEffect.css'

export default function SpotlightEffect() {
  useEffect(() => {
    // Función para actualizar las CSS variables del mouse
    const updateMousePosition = (e) => {
      // CRÍTICO: Actualizar en :root (document.documentElement) no en un elemento específico
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    // Función para manejar cuando el mouse sale del viewport
    const handleMouseLeave = () => {
      // Mover el spotlight fuera de la pantalla
      document.documentElement.style.setProperty('--mouse-x', '-1000px')
      document.documentElement.style.setProperty('--mouse-y', '-1000px')
    }

    // Event listeners
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Inicializar posición fuera de pantalla
    handleMouseLeave()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="spotlight-container">
      {/* Capa iluminada: mismo grid pero más brillante, con máscara radial */}
      <div className="spotlight-grid" />
      
      {/* Opcional: capa de glow para efecto cinematográfico */}
      <div className="spotlight-glow" />
    </div>
  )
}
