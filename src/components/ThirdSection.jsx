import { useEffect, useRef, useState } from 'react'
import './ThirdSection.css'

const PROJECTS = [
    {
        num: '(01)',
        title: 'Sistema de reservas',
        desc: 'Diseño e implementación de un sistema de turnos.',
        image: 'https://img.notionusercontent.com/s3/prod-files-secure%2F85690445-b989-4680-adfc-fd1d01fb91ea%2F8c818e90-ddc9-437d-a8b2-088f93607f16%2Fcover-sistema-de-reservas.jpg/size/w=2000?exp=1773422489&sig=A98r8RPeKKJd7QUb8MHBbTLk7NZ02VevjxqDzM4wOhc&id=2d9304a8-e6c5-80ed-8417-f2ba46ca740a&table=block&userId=418612d7-4ac1-4b88-9ab1-f39f2529a7e9'
    },
    {
        num: '(02)',
        title: 'Cloud camera software',
        desc: 'Rediseño de una aplicación de seguridad basada en la nube',
        image: 'https://img.notionusercontent.com/s3/prod-files-secure%2F85690445-b989-4680-adfc-fd1d01fb91ea%2F2652c6c4-050c-43f1-95e9-3d671f68a4f9%2Fmc-portada.jpg/size/w=2000?exp=1773422507&sig=J2G9ENHxQcgVMHzmrNLT_h5XzevVAMB0bzUpQo40Zbw&id=d040c3a1-16dd-442a-87d9-95105fb7a445&table=block&userId=418612d7-4ac1-4b88-9ab1-f39f2529a7e9'
    },
    {
        num: '(03)',
        title: 'Landin pages',
        desc: 'Diseño web para software factory.',
        image: 'https://img.notionusercontent.com/s3/prod-files-secure%2F85690445-b989-4680-adfc-fd1d01fb91ea%2F5194f32c-2af1-4b3a-8aa1-a1965741b544%2Fsoft-factory-image-cover.jpg/size/w=2000?exp=1773422523&sig=5SBqWAiFQLijBgenrFLBcPH6n2NZqvzrCDwPfHGqe1k&id=16e304a8-e6c5-80a1-be7e-f4b5dc49ac6b&table=block&userId=418612d7-4ac1-4b88-9ab1-f39f2529a7e9'
    },
    {
        num: '(04)',
        title: 'Sistema de métricas',
        desc: 'Integración de dos softwares en uno: CRM + Métricas.',
        image: 'https://img.notionusercontent.com/s3/prod-files-secure%2F85690445-b989-4680-adfc-fd1d01fb91ea%2Fb149d3eb-4f3f-4af3-97d0-d954f364de88%2Fcover-metrichub.jpg/size/w=2000?exp=1773422538&sig=7m-jMzFSuurMTqY5x46Q_C1tQ7q30KPHfmAsMSQRo6c&id=a9889f39-9966-4cd7-9bd5-0c0c9b56182e&table=block&userId=418612d7-4ac1-4b88-9ab1-f39f2529a7e9'
    },
    {
        num: '(05)',
        title: 'Sistema de pedidos',
        desc: 'Diseño de sistema de reposición de stock.',
        image: 'https://img.notionusercontent.com/s3/prod-files-secure%2F85690445-b989-4680-adfc-fd1d01fb91ea%2F8cffb7a7-566d-43f0-84c8-a6f0e906767d%2Fsistema-cover.jpg/size/w=2000?exp=1773422552&sig=S-GoTG5NtAWfKH-Zls_QqHemCcr_FNsBN1g5ay4n9cw&id=6410f6a9-64e2-4d32-bec9-a294494a69d8&table=block&userId=418612d7-4ac1-4b88-9ab1-f39f2529a7e9'
    },
    {
        num: '(06)',
        title: 'App de delivery',
        desc: 'Creación de una app de pedidos de comida.',
        image: 'https://img.notionusercontent.com/s3/prod-files-secure%2F85690445-b989-4680-adfc-fd1d01fb91ea%2F39733cf8-87a7-49fc-9a4a-dcf73450e280%2FMacBook_Air_-_6.jpg/size/w=2000?exp=1773422567&sig=JQZDmO8wdLNKSOhCM0lreAmZgDra3AyiufPwiDxrWe8&id=f6c749e6-667d-4acf-a222-96bd1e2dc376&table=block&userId=418612d7-4ac1-4b88-9ab1-f39f2529a7e9'
    },
    {
        num: '(07)',
        title: 'Sitio web de comidas',
        desc: 'Transformación progresiva de app de comidas en sitio web.',
        image: 'https://img.notionusercontent.com/s3/prod-files-secure%2F85690445-b989-4680-adfc-fd1d01fb91ea%2Fa7fb49b8-0692-48b0-a0a2-9528bdbb63db%2FMacBook_Air_-_4.jpg/size/w=2000?exp=1773422583&sig=qyJkd8zGkKWW0_0-M1WxI4QP-W-nZmHBCet2lYNLOZA&id=37d63e45-ef19-4c1f-b1f2-38bd3e9254c9&table=block&userId=418612d7-4ac1-4b88-9ab1-f39f2529a7e9'
    },
    {
        num: '(08)',
        title: 'Sitio de impresiones 3D',
        desc: 'Diseño de sitio web para emprendimiento.',
        image: 'https://img.notionusercontent.com/s3/prod-files-secure%2F85690445-b989-4680-adfc-fd1d01fb91ea%2F2706bcc7-1261-4ee4-a813-2d2b76198171%2Fsam3d-portada.jpg/size/w=2000?exp=1773422598&sig=J6ItI3OLaU08uxkA0xqrUFiykJiDByVtrV4rteWIphs&id=2b91d1a4-d2fd-4761-a5d2-0d7955b807d8&table=block&userId=418612d7-4ac1-4b88-9ab1-f39f2529a7e9'
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
        <section className="section third-section" ref={sectionRef}>
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
                                        <div className="carousel-image">
                                            <img src={item.image} alt={item.title} loading="lazy" draggable="false" />
                                        </div>
                                    </>
                                )}
                                {isInverted && (
                                    <>
                                        <div className="carousel-image">
                                            <img src={item.image} alt={item.title} loading="lazy" draggable="false" />
                                        </div>
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
