import { useEffect, useRef } from 'react'

export default function ScrollAnimations() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const arrowRef = useRef(null)
  const contentContainerRef = useRef(null)
  const navbarLogoRef = useRef(null)
  const navbarSocialRef = useRef(null)
  const initialStyles = useRef({})

  useEffect(() => {
    const assignRefs = () => {
      titleRef.current = document.querySelector('.prueba-text')
      subtitleRef.current = document.querySelector('.subtitle')
      arrowRef.current = document.querySelector('.scroll-indicator')
      contentContainerRef.current = document.querySelector('.content-container')
      navbarLogoRef.current = document.querySelector('.navbar-logo')
      navbarSocialRef.current = document.querySelector('.navbar-text-container')

      // Store initial styles
      if (titleRef.current && !initialStyles.current.title) {
        const computedStyle = window.getComputedStyle(titleRef.current)
        initialStyles.current.title = {
          opacity: computedStyle.opacity || '1',
          transform: computedStyle.transform || 'none'
        }
      }
      if (subtitleRef.current && !initialStyles.current.subtitle) {
        initialStyles.current.subtitle = {
          opacity: window.getComputedStyle(subtitleRef.current).opacity || '1',
          transform: window.getComputedStyle(subtitleRef.current).transform || 'none'
        }
      }
      if (arrowRef.current && !initialStyles.current.arrow) {
        initialStyles.current.arrow = {
          opacity: window.getComputedStyle(arrowRef.current).opacity || '0',
          transform: window.getComputedStyle(arrowRef.current).transform || 'none'
        }
      }
      if (navbarLogoRef.current && !initialStyles.current.logo) {
        initialStyles.current.logo = {
          opacity: window.getComputedStyle(navbarLogoRef.current).opacity || '1',
          transform: window.getComputedStyle(navbarLogoRef.current).transform || 'none'
        }
      }
      if (navbarSocialRef.current && !initialStyles.current.social) {
        initialStyles.current.social = {
          opacity: window.getComputedStyle(navbarSocialRef.current).opacity || '1',
          transform: window.getComputedStyle(navbarSocialRef.current).transform || 'none'
        }
      }
    }

    const timeoutId = setTimeout(assignRefs, 200)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const scrollProgress = Math.min(scrollY / (windowHeight * 0.8), 1)

      if (scrollProgress > 0) {
        // 1. Título principal (PRIMERO en desaparecer)
        if (titleRef.current && initialStyles.current.title) {
          const titleProgress = Math.min(scrollProgress / 0.4, 1) // FASTER: 0% - 40%
          const titleOpacity = Math.max(1 - titleProgress, 0)
          const titleBlur = titleProgress * 10
          const baseTransform = initialStyles.current.title.transform === 'none' ? '' : initialStyles.current.title.transform
          const titleTransform = `${baseTransform} translateY(-${titleProgress * 60}px)`

          titleRef.current.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
          titleRef.current.style.opacity = titleOpacity
          titleRef.current.style.transform = titleTransform
          titleRef.current.style.filter = `blur(${titleBlur}px)`
        }

        // 2. Subtítulo (SEGUNDO)
        if (subtitleRef.current) {
          const subtitleProgress = Math.min(Math.max((scrollProgress - 0.2) / 0.5, 0), 1) // DELAYED: 20% - 70%
          const subtitleOpacity = Math.max(1 - subtitleProgress, 0)
          const subtitleBlur = subtitleProgress * 8 // 0px to 8px blur
          const baseTransform = initialStyles.current.subtitle?.transform === 'none' ? '' : initialStyles.current.subtitle?.transform || ''
          const subtitleTransform = `${baseTransform} translateY(-${subtitleProgress * 80}px)`.trim()

          subtitleRef.current.style.animation = 'none' // Release CSS lock
          subtitleRef.current.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
          subtitleRef.current.style.opacity = subtitleOpacity
          subtitleRef.current.style.transform = subtitleTransform
          subtitleRef.current.style.filter = `blur(${subtitleBlur}px)`
        }

        // 3. Bloques de texto (Bold vs Light Parallax)
        if (contentContainerRef.current) {
          const blocksProgress = Math.min(Math.max((scrollProgress - 0.2) / 0.8, 0), 1) // SLOWER: 20% - 100%
          const blocksOpacity = Math.max(1 - blocksProgress, 0)

          // PARALLAX FUERTE para textos en negrita (Diferenciado)
          // Izquierda: Velocidad estándar (-500px)
          const boldLeftTransform = `translateY(-${blocksProgress * 500}px)`
          const leftBoldTexts = contentContainerRef.current.querySelectorAll('.location-text')
          leftBoldTexts.forEach(block => {
            block.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
            block.style.opacity = blocksOpacity
            block.style.transform = boldLeftTransform
          })

          // Derecha: Velocidad un poco mayor (-650px) para que suba más alto
          const boldRightTransform = `translateY(-${blocksProgress * 650}px)`
          const rightBoldTexts = contentContainerRef.current.querySelectorAll('.location-text-right')
          rightBoldTexts.forEach(block => {
            block.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
            block.style.opacity = blocksOpacity
            block.style.transform = boldRightTransform
          })

          // PARALLAX SUAVE para texto light
          // 1. Texto independiente (Izquierda): Se mueve -150px
          // FIX: Este elemento tiene un transform inicial de CSS (translateY(-50%)) que debemos preservar.
          const independentLightTexts = Array.from(contentContainerRef.current.querySelectorAll('.location-text-light'))
            .filter(el => el.parentElement === contentContainerRef.current)

          // Preservamos el -50% y sumamos el movimiento hacia arriba
          const lightTransform = `translateY(-50%) translateY(-${blocksProgress * 150}px)`

          independentLightTexts.forEach(block => {
            block.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
            block.style.opacity = blocksOpacity
            block.style.transform = lightTransform
          })

          // 2. Texto anidado (Derecha - Dentro de 'location-text-right'):
          // El padre se mueve -650px. Queremos que el hijo se mueva netamente -150px.
          // Diferencia: -150 - (-650) = +500px.
          // Le aplicamos una transformación POSITIVA (bajamos el texto relativo al padre que sube)
          const nestedLightTexts = contentContainerRef.current.querySelectorAll('.location-text-right .location-text-light')
          const compensatedTransform = `translateY(${blocksProgress * 500}px)` // +500px relative to parent

          nestedLightTexts.forEach(block => {
            block.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
            block.style.opacity = '1' // Mantenemos opacidad relativa al padre (que ya se desvanece)
            block.style.transform = compensatedTransform
          })
        }

        // 4. Flecha y Navbar (ÚLTIMOS)
        const lateProgress = Math.min(Math.max((scrollProgress - 0.3) / 0.5, 0), 1) // SLOWER: 30% - 80%
        const lateOpacity = Math.max(1 - lateProgress, 0)
        const lateTransform = `translateY(-${lateProgress * 40}px)`

        if (arrowRef.current) {
          arrowRef.current.style.animation = 'none' // Release CSS lock
          arrowRef.current.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
          arrowRef.current.style.opacity = lateOpacity
          arrowRef.current.style.transform = lateTransform
        }

        if (navbarLogoRef.current) {
          navbarLogoRef.current.style.animation = 'none' // Release CSS lock
          navbarLogoRef.current.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
          navbarLogoRef.current.style.opacity = lateOpacity
          navbarLogoRef.current.style.transform = lateTransform
        }

        if (navbarSocialRef.current) {
          navbarSocialRef.current.style.animation = 'none' // Release CSS lock
          navbarSocialRef.current.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
          navbarSocialRef.current.style.opacity = lateOpacity
          navbarSocialRef.current.style.transform = lateTransform
        }

      } else {
        // Reset
        if (titleRef.current && initialStyles.current.title) {
          titleRef.current.style.opacity = initialStyles.current.title.opacity
          titleRef.current.style.transform = initialStyles.current.title.transform
          titleRef.current.style.filter = 'blur(0px)'
        }

        if (subtitleRef.current && initialStyles.current.subtitle) {
          subtitleRef.current.style.opacity = '1' // Force opacity to 1 as initialStyles might capture 0
          subtitleRef.current.style.transform = initialStyles.current.subtitle.transform
          subtitleRef.current.style.filter = 'blur(0px)'
          // Do NOT reset animation to '' to avoid re-triggering the entrance animation
          subtitleRef.current.style.animation = 'none'
        }

        if (arrowRef.current) {
          arrowRef.current.style.opacity = '1'
          arrowRef.current.style.transform = 'none'
          arrowRef.current.style.animation = 'none'
        }

        if (navbarLogoRef.current && initialStyles.current.logo) {
          navbarLogoRef.current.style.opacity = initialStyles.current.logo.opacity
          navbarLogoRef.current.style.transform = initialStyles.current.logo.transform
        }
        if (navbarSocialRef.current && initialStyles.current.social) {
          navbarSocialRef.current.style.opacity = initialStyles.current.social.opacity
          navbarSocialRef.current.style.transform = initialStyles.current.social.transform
        }
        if (contentContainerRef.current) {
          const allBlocks = contentContainerRef.current.querySelectorAll('.location-text, .location-text-right, .location-text-light')
          allBlocks.forEach(block => {
            block.style.opacity = '1'
            block.style.transform = '' // Clear inline style to let CSS take over (restores translateY(-50%) where needed)
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}

