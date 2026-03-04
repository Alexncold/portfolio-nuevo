import { useEffect, useRef, useState } from 'react'
import './ThirdSection.css'

const PROJECTS = [
    {
        num: '(01)',
        title: 'Titulo',
        desc: 'parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo'
    },
    {
        num: '(02)',
        title: 'Titulo',
        desc: 'parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo'
    },
    {
        num: '(03)',
        title: 'Titulo',
        desc: 'parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo'
    },
    {
        num: '(04)',
        title: 'Titulo',
        desc: 'parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo'
    },
    {
        num: '(05)',
        title: 'Titulo',
        desc: 'parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo'
    },
    {
        num: '(06)',
        title: 'Titulo',
        desc: 'parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo'
    },
    {
        num: '(07)',
        title: 'Titulo',
        desc: 'parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo'
    },
    {
        num: '(08)',
        title: 'Titulo',
        desc: 'parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo parrafo'
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

        const handleMouseDown = (e) => {
            isDragging = true
            startX = e.pageX
            startScrollLeft = carousel.scrollLeft
            carousel.classList.add('is-dragging')
        }

        const handleMouseMove = (e) => {
            if (!isDragging) return
            e.preventDefault()
            const delta = e.pageX - startX
            carousel.scrollLeft = startScrollLeft - delta
        }

        const endDrag = () => {
            isDragging = false
            carousel.classList.remove('is-dragging')
        }

        carousel.addEventListener('mousedown', handleMouseDown)
        carousel.addEventListener('mousemove', handleMouseMove)
        carousel.addEventListener('mouseleave', endDrag)
        window.addEventListener('mouseup', endDrag)

        return () => {
            carousel.removeEventListener('mousedown', handleMouseDown)
            carousel.removeEventListener('mousemove', handleMouseMove)
            carousel.removeEventListener('mouseleave', endDrag)
            window.removeEventListener('mouseup', endDrag)
        }
    }, [])

    return (
        <section className="section third-section" ref={sectionRef}>
            <div className="third-content-container">
                <div className="third-header">
                    <div className="third-title-wrapper">
                        <div className={`small-info-text ${isVisible ? 'is-visible' : ''}`}>
                            <span className="small-info-line small-info-line-1">(Stack y</span>
                            <span className="small-info-line small-info-line-2">tecnologias)</span>
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
                                    <span>Abre en Notion</span>
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
                        return (
                            <div
                                key={item.num}
                                className={`carousel-item ${isInverted ? 'is-inverted' : ''}`}
                            >
                                {!isInverted && (
                                    <>
                                        <div className="carousel-header">
                                            <span className="carousel-num">{item.num}</span>
                                            <span className="carousel-title">{item.title}</span>
                                        </div>
                                        <p className="carousel-desc">{item.desc}</p>
                                        <div className="carousel-image"></div>
                                    </>
                                )}
                                {isInverted && (
                                    <>
                                        <div className="carousel-image"></div>
                                        <div className="carousel-header">
                                            <span className="carousel-num">{item.num}</span>
                                            <span className="carousel-title">{item.title}</span>
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
