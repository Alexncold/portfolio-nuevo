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
    }
]

export default function ThirdSection() {
    const sectionRef = useRef(null)
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

    return (
        <section className="section third-section" ref={sectionRef}>
            <div className="third-content-container">
                <div className="third-header">
                    <div className="third-title-wrapper">
                        <div className="small-info-text">
                            (Stack y<br />tecnologias)
                        </div>
                        <h1 className="third-big-title">
                            <span className="title-line-1">Mis</span>
                            <span className="title-line-2">Proyectos</span>
                        </h1>
                    </div>
                    <div className="third-right">
                        <p className="third-right-text">
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

                <div className="third-carousel" aria-label="Carousel de proyectos">
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
