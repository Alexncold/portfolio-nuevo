import { useEffect, useRef, useState } from 'react'
import './ThirdSection.css'

const PROJECTS = [
    {
        num: '(01)',
        title: 'Sistema de reservas',
        desc: 'Diseño e implementación de un sistema de turnos.',
        image: '/cover-images/cover-sistema-de-reservas.webp',
        notionUrl: 'https://www.notion.so/alejandrostafuza/Sistema-de-Reservas-2d9304a8e6c58080aacdf57758b0600e'
    },
    {
        num: '(02)',
        title: 'Cloud camera software',
        desc: 'Rediseño de una aplicación de seguridad basada en la nube',
        image: '/cover-images/mc-portada.webp',
        notionUrl: 'https://www.notion.so/alejandrostafuza/Cloud-Camera-Software-50116bf9d4d2472d8b99e46b001ab5dd'
    },
    {
        num: '(03)',
        title: 'Landing pages',
        desc: 'Diseño web y landing pages para software factory',
        image: '/cover-images/soft-factory-image-cover.webp',
        notionUrl: 'https://www.notion.so/alejandrostafuza/Dise-o-Web-para-Software-Factory-16e304a8e6c580e59b47d56fefb65b6e'
    },
    {
        num: '(04)',
        title: 'Sistema de métricas',
        desc: 'Integración de dos softwares en uno: CRM + Métricas.',
        image: '/cover-images/cover-metrichub.webp',
        notionUrl: 'https://www.notion.so/alejandrostafuza/Sistema-Integral-de-M-tricas-2cf2050ad5b14a049da282e54e5955bf'
    },
    {
        num: '(05)',
        title: 'Sistema de pedidos',
        desc: 'Diseño de sistema de reposición de stock.',
        image: '/cover-images/sistema-cover.webp',
        notionUrl: 'https://www.notion.so/alejandrostafuza/Sistema-de-Pedidos-3e648bcc5f974c7ba7d2c86bbadf767e'
    },
    {
        num: '(06)',
        title: 'App de delivery',
        desc: 'Creación de una app de pedidos de comida.',
        image: '/cover-images/pizzapp-cover.webp',
        notionUrl: 'https://www.notion.so/alejandrostafuza/App-de-Delivery-de-Comida-Italiana-6c77137355e74114bb22633687741ebe'
    },
    {
        num: '(07)',
        title: 'Sitio web de comidas',
        desc: 'Transformación progresiva de app de comidas en sitio web.',
        image: '/cover-images/pizzaweb-cover.webp',
        notionUrl: 'https://www.notion.so/alejandrostafuza/Sitio-Web-de-Comida-Italiana-cd7e98f2efc64f11a5d4a19b2c9d0568'
    },
    {
        num: '(08)',
        title: 'Sitio de impresiones 3D',
        desc: 'Diseño de sitio web para emprendimiento.',
        image: '/cover-images/sam3d-portada.webp',
        notionUrl: 'https://www.notion.so/alejandrostafuza/Sitio-web-para-impresiones-3D-120ec8ed3e2a4971bd43bcd78a088491'
    }
]

const PROJECTS_TITLE = 'Proyectos'

export default function ThirdSection() {
    const sectionRef = useRef(null)
    const carouselRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const currentRef = sectionRef.current
        if (!currentRef) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.35 }
        )

        observer.observe(currentRef)

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const carousel = carouselRef.current
        if (!carousel) return

        let isDragging = false
        let startX = 0
        let startScrollLeft = 0
        let velocity = 0
        let lastMoveTs = 0
        let inertiaRaf = null

        const stopInertia = () => {
            if (inertiaRaf) {
                cancelAnimationFrame(inertiaRaf)
                inertiaRaf = null
            }
        }

        const startInertia = () => {
            stopInertia()
            if (Math.abs(velocity) < 0.02) return

            let lastTs = performance.now()
            const tick = (ts) => {
                const dt = ts - lastTs
                lastTs = ts

                const maxScroll = carousel.scrollWidth - carousel.clientWidth
                if (maxScroll <= 0) return

                carousel.scrollLeft += velocity * dt

                const damping = Math.pow(0.92, dt / 16.67)
                velocity *= damping

                const hitStart = carousel.scrollLeft <= 0 && velocity < 0
                const hitEnd = carousel.scrollLeft >= maxScroll && velocity > 0
                if (hitStart || hitEnd) velocity = 0

                if (Math.abs(velocity) >= 0.02) {
                    inertiaRaf = requestAnimationFrame(tick)
                } else {
                    inertiaRaf = null
                }
            }

            inertiaRaf = requestAnimationFrame(tick)
        }

        const handleMouseDown = (e) => {
            stopInertia()
            isDragging = true
            startX = e.pageX
            startScrollLeft = carousel.scrollLeft
            lastMoveTs = performance.now()
            velocity = 0
            carousel.classList.add('is-dragging')
        }

        const handleMouseMove = (e) => {
            if (!isDragging) return
            e.preventDefault()
            const delta = e.pageX - startX
            const prevScrollLeft = carousel.scrollLeft
            carousel.scrollLeft = startScrollLeft - delta

            const now = performance.now()
            const dt = now - lastMoveTs
            if (dt > 0) {
                velocity = (carousel.scrollLeft - prevScrollLeft) / dt
            }
            lastMoveTs = now
        }

        const endDrag = () => {
            if (!isDragging) return
            isDragging = false
            carousel.classList.remove('is-dragging')
            startInertia()
        }

        carousel.addEventListener('mousedown', handleMouseDown)
        carousel.addEventListener('mousemove', handleMouseMove)
        carousel.addEventListener('mouseleave', endDrag)
        window.addEventListener('mouseup', endDrag)

        return () => {
            stopInertia()
            carousel.removeEventListener('mousedown', handleMouseDown)
            carousel.removeEventListener('mousemove', handleMouseMove)
            carousel.removeEventListener('mouseleave', endDrag)
            window.removeEventListener('mouseup', endDrag)
        }
    }, [])

    return (
        <section id="section-3" className="section third-section" ref={sectionRef}>
            <div className="third-content-container">
                <div className="third-header">
                    <div className="third-title-wrapper">
                        <div className={`small-info-text ${isVisible ? 'is-visible' : ''}`}>
                            <span className="small-info-line small-info-line-1">(Stack y</span>
                            <span className="small-info-line small-info-line-2">tecnologías)</span>
                        </div>
                        <h1 className="third-big-title">
                            <span className={`title-line-1 ${isVisible ? 'is-visible' : ''}`}>
                                <span className="title-char-mask">
                                    <span className="title-char title-char-1">M</span>
                                </span>
                                <span className="title-char-mask">
                                    <span className="title-char title-char-2">i</span>
                                </span>
                                <span className="title-char-mask">
                                    <span className="title-char title-char-3">s</span>
                                </span>
                            </span>
                            <span className={`title-line-2 ${isVisible ? 'is-visible' : ''}`}>
                                {PROJECTS_TITLE.split('').map((char, index) => (
                                    <span key={`${char}-${index}`} className="title-char-mask">
                                        <span
                                            className="title-char"
                                            style={{ animationDelay: `${0.72 + (index * 0.05)}s` }}
                                        >
                                            {char}
                                        </span>
                                    </span>
                                ))}
                            </span>
                        </h1>
                    </div>
                    <div className="third-right">
                        <p className={`third-right-text ${isVisible ? 'is-visible' : ''}`}>
                            Estos son algunos de los trabajos que hice como creador de experiencias de usuario
                        </p>
                        <div className="third-notion-container">
                            <div className={`third-notion-mask ${isVisible ? 'is-visible' : ''}`}>
                                <a className="third-notion-link" href="#" onClick={(e) => e.preventDefault()}>
                                    <span>Abren en Notion</span>
                                    <span className="material-symbols-outlined">east</span>
                                </a>
                                <div className="third-notion-underline"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="third-carousel" aria-label="Carousel de proyectos" ref={carouselRef}>
                    {PROJECTS.map((item, index) => {
                        const isInverted = index % 2 === 1
                        const hasNotionUrl = item.notionUrl.trim() !== ''
                        const projectLinkProps = hasNotionUrl
                            ? {
                                href: item.notionUrl,
                                target: '_blank',
                                rel: 'noopener noreferrer',
                            }
                            : {
                                href: '#',
                                onClick: (event) => event.preventDefault(),
                                'aria-disabled': 'true',
                            }

                        return (
                            <div
                                key={item.num}
                                className={`carousel-item ${isInverted ? 'is-inverted' : ''}`}
                            >
                                {!isInverted && (
                                    <>
                                        <div className="carousel-header">
                                            <span className="carousel-num">{item.num}</span>
                                            <a className="carousel-title-link" {...projectLinkProps}>
                                                <span className="carousel-title">{item.title}</span>
                                            </a>
                                        </div>
                                        <p className="carousel-desc">{item.desc}</p>
                                        <div className="carousel-image">
                                            <a className="carousel-image-link" {...projectLinkProps}>
                                                <img src={item.image} alt={item.title} loading="lazy" draggable="false" />
                                            </a>
                                        </div>
                                    </>
                                )}
                                {isInverted && (
                                    <>
                                        <div className="carousel-image">
                                            <a className="carousel-image-link" {...projectLinkProps}>
                                                <img src={item.image} alt={item.title} loading="lazy" draggable="false" />
                                            </a>
                                        </div>
                                        <div className="carousel-header">
                                            <span className="carousel-num">{item.num}</span>
                                            <a className="carousel-title-link" {...projectLinkProps}>
                                                <span className="carousel-title">{item.title}</span>
                                            </a>
                                        </div>
                                        <p className="carousel-desc">{item.desc}</p>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
