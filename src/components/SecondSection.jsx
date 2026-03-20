import { useEffect, useRef, useState, useMemo } from 'react'

const SPEEDWALKER_FRAMES = [
  "/frames/walk/u000_f000-001_alpha_stroke.png",
  "/frames/walk/u001_f002-002_alpha_stroke.png",
  "/frames/walk/u002_f003-003_alpha_stroke.png",
  "/frames/walk/u003_f004-004_alpha_stroke.png",
  "/frames/walk/u004_f005-007_alpha_stroke.png",
  "/frames/walk/u005_f008-009_alpha_stroke.png",
  "/frames/walk/u006_f010-011_alpha_stroke.png",
  "/frames/walk/u007_f012-012_alpha_stroke.png",
  "/frames/walk/u008_f013-014_alpha_stroke.png",
  "/frames/walk/u009_f015-015_alpha_stroke.png",
  "/frames/walk/u010_f016-017_alpha_stroke.png",
  "/frames/walk/u011_f018-019_alpha_stroke.png",
  "/frames/walk/u012_f020-022_alpha_stroke.png",
  "/frames/walk/u013_f023-023_alpha_stroke.png",
  "/frames/walk/u014_f024-024_alpha_stroke.png",
  "/frames/walk/u015_f025-027_alpha_stroke.png",
  "/frames/walk/u016_f028-029_alpha_stroke.png",
  "/frames/walk/u017_f030-031_alpha_stroke.png",
  "/frames/walk/u018_f032-032_alpha_stroke.png",
  "/frames/walk/u019_f033-034_alpha_stroke.png",
  "/frames/walk/u020_f035-035_alpha_stroke.png",
  "/frames/walk/u021_f036-037_alpha_stroke.png",
  "/frames/walk/u022_f038-039_alpha_stroke.png",
  "/frames/walk/u023_f040-042_alpha_stroke.png",
  "/frames/walk/u024_f043-043_alpha_stroke.png",
  "/frames/walk/u025_f044-044_alpha_stroke.png",
  "/frames/walk/u026_f045-047_alpha_stroke.png",
  "/frames/walk/u027_f048-049_alpha_stroke.png",
  "/frames/walk/u028_f050-052_alpha_stroke.png",
  "/frames/walk/u029_f053-054_alpha_stroke.png",
  "/frames/walk/u030_f055-055_alpha_stroke.png",
  "/frames/walk/u031_f056-057_alpha_stroke.png",
  "/frames/walk/u032_f058-059_alpha_stroke.png",
  "/frames/walk/u033_f060-062_alpha_stroke.png",
  "/frames/walk/u034_f063-063_alpha_stroke.png",
  "/frames/walk/u035_f064-064_alpha_stroke.png",
  "/frames/walk/u036_f065-067_alpha_stroke.png",
  "/frames/walk/u037_f068-069_alpha_stroke.png",
  "/frames/walk/u038_f070-072_alpha_stroke.png",
  "/frames/walk/u039_f073-074_alpha_stroke.png",
  "/frames/walk/u040_f075-075_alpha_stroke.png",
  "/frames/walk/u041_f076-077_alpha_stroke.png",
  "/frames/walk/u042_f078-079_alpha_stroke.png",
  "/frames/walk/u043_f080-082_alpha_stroke.png",
  "/frames/walk/u044_f083-083_alpha_stroke.png",
  "/frames/walk/u045_f084-084_alpha_stroke.png",
  "/frames/walk/u046_f085-087_alpha_stroke.png",
  "/frames/walk/u047_f088-089_alpha_stroke.png",
  "/frames/walk/u048_f090-091_alpha_stroke.png",
  "/frames/walk/u049_f092-092_alpha_stroke.png",
  "/frames/walk/u050_f093-094_alpha_stroke.png",
  "/frames/walk/u051_f095-095_alpha_stroke.png",
  "/frames/walk/u052_f096-097_alpha_stroke.png",
  "/frames/walk/u053_f098-099_alpha_stroke.png",
  "/frames/walk/u054_f100-102_alpha_stroke.png",
  "/frames/walk/u055_f103-103_alpha_stroke.png",
  "/frames/walk/u056_f104-104_alpha_stroke.png",
  "/frames/walk/u057_f105-107_alpha_stroke.png",
  "/frames/walk/u058_f108-109_alpha_stroke.png",
  "/frames/walk/u059_f110-111_alpha_stroke.png",
  "/frames/walk/u060_f112-112_alpha_stroke.png",
  "/frames/walk/u061_f113-114_alpha_stroke.png",
  "/frames/walk/u062_f115-115_alpha_stroke.png",
  "/frames/walk/u063_f116-117_alpha_stroke.png",
  "/frames/walk/u064_f118-119_alpha_stroke.png",
  "/frames/walk/u065_f120-122_alpha_stroke.png",
  "/frames/walk/u066_f123-123_alpha_stroke.png",
  "/frames/walk/u067_f124-124_alpha_stroke.png",
  "/frames/walk/u068_f125-127_alpha_stroke.png",
  "/frames/walk/u069_f128-129_alpha_stroke.png",
  "/frames/walk/u070_f130-131_alpha_stroke.png",
  "/frames/walk/u071_f132-132_alpha_stroke.png",
  "/frames/walk/u072_f133-134_alpha_stroke.png",
  "/frames/walk/u073_f135-135_alpha_stroke.png",
  "/frames/walk/u074_f136-137_alpha_stroke.png",
  "/frames/walk/u075_f138-139_alpha_stroke.png",
  "/frames/walk/u076_f140-142_alpha_stroke.png",
  "/frames/walk/u077_f143-143_alpha_stroke.png",
  "/frames/walk/u078_f144-144_alpha_stroke.png",
  "/frames/walk/u079_f145-147_alpha_stroke.png",
  "/frames/walk/u080_f148-149_alpha_stroke.png",
  "/frames/walk/u081_f150-152_alpha_stroke.png",
  "/frames/walk/u082_f153-154_alpha_stroke.png",
  "/frames/walk/u083_f155-155_alpha_stroke.png",
  "/frames/walk/u084_f156-157_alpha_stroke.png",
  "/frames/walk/u085_f158-159_alpha_stroke.png",
  "/frames/walk/u086_f160-162_alpha_stroke.png",
  "/frames/walk/u087_f163-163_alpha_stroke.png",
  "/frames/walk/u088_f164-164_alpha_stroke.png",
  "/frames/walk/u089_f165-167_alpha_stroke.png",
  "/frames/walk/u090_f168-169_alpha_stroke.png",
  "/frames/walk/u091_f170-171_alpha_stroke.png",
  "/frames/walk/u092_f172-172_alpha_stroke.png",
  "/frames/walk/u093_f173-174_alpha_stroke.png",
  "/frames/walk/u094_f175-175_alpha_stroke.png",
  "/frames/walk/u095_f176-177_alpha_stroke.png",
  "/frames/walk/u096_f178-179_alpha_stroke.png",
  "/frames/walk/u097_f180-182_alpha_stroke.png",
  "/frames/walk/u098_f183-183_alpha_stroke.png",
  "/frames/walk/u099_f184-184_alpha_stroke.png",
  "/frames/walk/u100_f185-187_alpha_stroke.png",
  "/frames/walk/u101_f188-189_alpha_stroke.png",
  "/frames/walk/u102_f190-191_alpha_stroke.png",
  "/frames/walk/u103_f192-192_alpha_stroke.png",
  "/frames/walk/u104_f193-194_alpha_stroke.png",
  "/frames/walk/u105_f195-195_alpha_stroke.png",
  "/frames/walk/u106_f196-197_alpha_stroke.png",
  "/frames/walk/u107_f198-199_alpha_stroke.png",
  "/frames/walk/u108_f200-202_alpha_stroke.png",
  "/frames/walk/u109_f203-203_alpha_stroke.png",
  "/frames/walk/u110_f204-204_alpha_stroke.png",
  "/frames/walk/u111_f205-207_alpha_stroke.png",
  "/frames/walk/u112_f208-209_alpha_stroke.png",
  "/frames/walk/u113_f210-212_alpha_stroke.png",
  "/frames/walk/u114_f213-214_alpha_stroke.png",
  "/frames/walk/u115_f215-215_alpha_stroke.png",
  "/frames/walk/u116_f216-217_alpha_stroke.png",
  "/frames/walk/u117_f218-219_alpha_stroke.png",
  "/frames/walk/u118_f220-222_alpha_stroke.png",
  "/frames/walk/u119_f223-223_alpha_stroke.png",
  "/frames/walk/u120_f224-224_alpha_stroke.png",
  "/frames/walk/u121_f225-227_alpha_stroke.png",
  "/frames/walk/u122_f228-229_alpha_stroke.png",
  "/frames/walk/u123_f230-231_alpha_stroke.png",
  "/frames/walk/u124_f232-232_alpha_stroke.png",
  "/frames/walk/u125_f233-234_alpha_stroke.png",
  "/frames/walk/u126_f235-237_alpha_stroke.png",
  "/frames/walk/u127_f238-239_alpha_stroke.png",
  "/frames/walk/u128_f240-242_alpha_stroke.png",
  "/frames/walk/u129_f243-243_alpha_stroke.png",
  "/frames/walk/u130_f244-244_alpha_stroke.png",
  "/frames/walk/u131_f245-247_alpha_stroke.png",
  "/frames/walk/u132_f248-249_alpha_stroke.png",
  "/frames/walk/u133_f250-251_alpha_stroke.png",
  "/frames/walk/u134_f252-252_alpha_stroke.png",
  "/frames/walk/u135_f253-254_alpha_stroke.png",
  "/frames/walk/u136_f255-255_alpha_stroke.png",
  "/frames/walk/u137_f256-257_alpha_stroke.png",
  "/frames/walk/u138_f258-259_alpha_stroke.png",
  "/frames/walk/u139_f260-262_alpha_stroke.png",
  "/frames/walk/u140_f263-263_alpha_stroke.png",
  "/frames/walk/u141_f264-264_alpha_stroke.png",
  "/frames/walk/u142_f265-267_alpha_stroke.png",
  "/frames/walk/u143_f268-269_alpha_stroke.png",
  "/frames/walk/u144_f270-271_alpha_stroke.png",
  "/frames/walk/u145_f272-272_alpha_stroke.png",
  "/frames/walk/u146_f273-274_alpha_stroke.png",
  "/frames/walk/u147_f275-275_alpha_stroke.png",
  "/frames/walk/u148_f276-277_alpha_stroke.png",
  "/frames/walk/u149_f278-279_alpha_stroke.png",
  "/frames/walk/u150_f280-282_alpha_stroke.png",
  "/frames/walk/u151_f283-283_alpha_stroke.png",
  "/frames/walk/u152_f284-284_alpha_stroke.png",
  "/frames/walk/u153_f285-287_alpha_stroke.png",
  "/frames/walk/u154_f288-289_alpha_stroke.png",
  "/frames/walk/u155_f290-291_alpha_stroke.png",
  "/frames/walk/u156_f292-292_alpha_stroke.png",
  "/frames/walk/u157_f293-293_alpha_stroke.png",
];

const DUNGEON_MASTER_FRAMES = [
  "/frames/dice/frame_0001.png",
  "/frames/dice/frame_0002.png",
  "/frames/dice/frame_0003.png",
  "/frames/dice/frame_0004.png",
  "/frames/dice/frame_0005.png",
  "/frames/dice/frame_0006.png",
  "/frames/dice/frame_0007.png",
  "/frames/dice/frame_0008.png",
  "/frames/dice/frame_0009.png",
  "/frames/dice/frame_0010.png",
  "/frames/dice/frame_0011.png",
  "/frames/dice/frame_0012.png",
  "/frames/dice/frame_0013.png",
  "/frames/dice/frame_0014.png",
  "/frames/dice/frame_0015.png",
  "/frames/dice/frame_0016.png",
  "/frames/dice/frame_0017.png",
  "/frames/dice/frame_0018.png",
  "/frames/dice/frame_0019.png",
  "/frames/dice/frame_0020.png",
  "/frames/dice/frame_0021.png",
  "/frames/dice/frame_0022.png",
  "/frames/dice/frame_0023.png",
  "/frames/dice/frame_0024.png",
  "/frames/dice/frame_0025.png",
  "/frames/dice/frame_0026.png",
  "/frames/dice/frame_0027.png",
  "/frames/dice/frame_0028.png",
  "/frames/dice/frame_0029.png",
  "/frames/dice/frame_0030.png",
];

const TRAINED_CHEF_FRAMES = [
  "/frames/chef/frame_0001.png",
  "/frames/chef/frame_0002.png",
  "/frames/chef/frame_0003.png",
  "/frames/chef/frame_0004.png",
  "/frames/chef/frame_0005.png",
  "/frames/chef/frame_0006.png",
  "/frames/chef/frame_0007.png",
  "/frames/chef/frame_0008.png",
  "/frames/chef/frame_0009.png",
  "/frames/chef/frame_0010.png",
  "/frames/chef/frame_0011.png",
  "/frames/chef/frame_0012.png",
  "/frames/chef/frame_0013.png",
  "/frames/chef/frame_0014.png",
  "/frames/chef/frame_0015.png",
  "/frames/chef/frame_0016.png",
  "/frames/chef/frame_0017.png",
  "/frames/chef/frame_0018.png",
  "/frames/chef/frame_0019.png",
  "/frames/chef/frame_0020.png",
];

const sampleFrames = (frames, step) => frames.filter((_, index) => index % step === 0)
const MOBILE_SPEEDWALKER_FRAMES = sampleFrames(SPEEDWALKER_FRAMES, 3)
const MOBILE_DUNGEON_MASTER_FRAMES = sampleFrames(DUNGEON_MASTER_FRAMES, 2)
const MOBILE_TRAINED_CHEF_FRAMES = sampleFrames(TRAINED_CHEF_FRAMES, 2)

const getRoleFrames = (role, isMobileLayout) => {
  if (role === 'speedwalker') {
    return isMobileLayout ? MOBILE_SPEEDWALKER_FRAMES : SPEEDWALKER_FRAMES
  }
  if (role === 'dungeonmaster') {
    return isMobileLayout ? MOBILE_DUNGEON_MASTER_FRAMES : DUNGEON_MASTER_FRAMES
  }
  return isMobileLayout ? MOBILE_TRAINED_CHEF_FRAMES : TRAINED_CHEF_FRAMES
}

const getRoleFrameIntervalMs = (role, isMobileLayout) => {
  if (role === 'speedwalker') {
    return isMobileLayout ? 70 : 40
  }
  if (role === 'dungeonmaster') {
    return isMobileLayout ? 70 : 40
  }
  return isMobileLayout ? 120 : 100
}

const DEFAULT_AVATAR = "https://i.ibb.co/HTjyR6Rg/avatar-big.png";
const MOBILE_ROLE_SEQUENCE = ['speedwalker', 'dungeonmaster', 'chef']
const MOBILE_ROLE_INTERVAL_MS = 1500
const MOBILE_ROLE_START_DELAY_MS = 4300

export default function SecondSection() {
  const sectionRef = useRef(null)
  const topHeaderRef = useRef(null)
  const rightTitleMaskRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isArrowDrawn, setIsArrowDrawn] = useState(false)
  const [iconPos, setIconPos] = useState({ x: null, y: null })

  // Consolidamos el estado de hover
  const [hoveredRole, setHoveredRole] = useState(null) // null | 'speedwalker' | 'dungeonmaster' | 'chef'
  const [walkFrame, setWalkFrame] = useState(0)
  const [isMobileLayout, setIsMobileLayout] = useState(false)
  const [mobileRoleIndex, setMobileRoleIndex] = useState(0)
  const [isMobileRoleCycleReady, setIsMobileRoleCycleReady] = useState(false)
  const activeAnimationRole = hoveredRole || (isMobileLayout && isMobileRoleCycleReady ? MOBILE_ROLE_SEQUENCE[mobileRoleIndex] : null)
  const setHoveredRoleStable = (role) => {
    setHoveredRole((previous) => (previous === role ? previous : role))
  }
  const clearHoveredRole = () => {
    setHoveredRole((previous) => (previous == null ? previous : null))
  }

  // Precarga de imágenes
  useEffect(() => {
    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches
    const allImages = [
      ...getRoleFrames('speedwalker', isMobileDevice),
      ...getRoleFrames('dungeonmaster', isMobileDevice),
      ...getRoleFrames('chef', isMobileDevice),
      DEFAULT_AVATAR
    ];
    allImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const currentRef = sectionRef.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsArrowDrawn(true)
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  useEffect(() => {
    const updateIconPosition = () => {
      const section = sectionRef.current
      const topHeader = topHeaderRef.current
      const rightTitleMask = rightTitleMaskRef.current
      if (!section || !topHeader || !rightTitleMask) return

      const sectionRect = section.getBoundingClientRect()
      const topRect = topHeader.getBoundingClientRect()
      const rightRect = rightTitleMask.getBoundingClientRect()
      const halfIcon = 28

      setIconPos({
        x: rightRect.right - sectionRect.left - halfIcon,
        y: topRect.top - sectionRect.top - halfIcon,
      })
    }

    updateIconPosition()
    window.addEventListener('resize', updateIconPosition)
    window.addEventListener('scroll', updateIconPosition, { passive: true })

    const topHeader = topHeaderRef.current
    const rightTitleMask = rightTitleMaskRef.current
    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => updateIconPosition())
      : null

    if (observer && topHeader) observer.observe(topHeader)
    if (observer && rightTitleMask) observer.observe(rightTitleMask)

    return () => {
      window.removeEventListener('resize', updateIconPosition)
      window.removeEventListener('scroll', updateIconPosition)
      if (observer) observer.disconnect()
    }
  }, [])


  // Lógica de animación optimizada
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const updateMobileLayout = () => setIsMobileLayout(mediaQuery.matches)
    updateMobileLayout()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMobileLayout)
      return () => mediaQuery.removeEventListener('change', updateMobileLayout)
    }

    mediaQuery.addListener(updateMobileLayout)
    return () => mediaQuery.removeListener(updateMobileLayout)
  }, [])

  useEffect(() => {
    if (!isMobileLayout || !isVisible) {
      const resetRafId = requestAnimationFrame(() => {
        setIsMobileRoleCycleReady(false)
        setMobileRoleIndex(0)
      })
      return () => cancelAnimationFrame(resetRafId)
    }

    const initRafId = requestAnimationFrame(() => {
      setIsMobileRoleCycleReady(false)
      setMobileRoleIndex(0)
    })

    const readyTimeoutId = setTimeout(() => {
      setIsMobileRoleCycleReady(true)
    }, MOBILE_ROLE_START_DELAY_MS)

    return () => {
      cancelAnimationFrame(initRafId)
      clearTimeout(readyTimeoutId)
    }
  }, [isMobileLayout, isVisible])

  useEffect(() => {
    if (!isMobileLayout || !isVisible || !isMobileRoleCycleReady) return

    const intervalId = setInterval(() => {
      setMobileRoleIndex((previous) => (previous + 1) % MOBILE_ROLE_SEQUENCE.length)
    }, MOBILE_ROLE_INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [isMobileLayout, isVisible, isMobileRoleCycleReady])

  useEffect(() => {
    let rafId;
    let resetRafId;
    if (activeAnimationRole) {
      const activeRoleFrames = getRoleFrames(activeAnimationRole, isMobileLayout)
      const maxFrames = Math.max(activeRoleFrames.length, 1)
      const intervalMs = getRoleFrameIntervalMs(activeAnimationRole, isMobileLayout)
      let lastTime = performance.now();
      let accumulator = 0;

      const tick = (time) => {
        const delta = time - lastTime;
        lastTime = time;
        accumulator += delta;

        if (isMobileLayout) {
          if (accumulator >= intervalMs) {
            const steps = Math.floor(accumulator / intervalMs)
            accumulator -= steps * intervalMs
            setWalkFrame(prev => (prev + steps) % maxFrames)
          }
        } else {
          while (accumulator >= intervalMs) {
            accumulator -= intervalMs
            setWalkFrame(prev => (prev + 1) % maxFrames)
          }
        }

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    } else {
      resetRafId = requestAnimationFrame(() => {
        setWalkFrame(0)
      })
    }
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resetRafId) cancelAnimationFrame(resetRafId);
    };
  }, [activeAnimationRole, isMobileLayout]);

  const getAnimatedRoleFrame = (role) => {
    const roleFrames = getRoleFrames(role, isMobileLayout)

    if (activeAnimationRole !== role) {
      return roleFrames[0]
    }

    return roleFrames[walkFrame] || roleFrames[0]
  }

  const currentAvatarInfo = useMemo(() => {
    let src = DEFAULT_AVATAR;
    let transform = "";

    if (hoveredRole === 'speedwalker') {
      const speedwalkerFrames = getRoleFrames('speedwalker', isMobileLayout)
      src = speedwalkerFrames[walkFrame] || speedwalkerFrames[0];
    } else if (hoveredRole === 'dungeonmaster') {
      const dungeonMasterFrames = getRoleFrames('dungeonmaster', isMobileLayout)
      src = dungeonMasterFrames[walkFrame] || dungeonMasterFrames[0];
    } else if (hoveredRole === 'chef') {
      const chefFrames = getRoleFrames('chef', isMobileLayout)
      src = chefFrames[walkFrame] || chefFrames[0];
    }

    return { src, transform };
  }, [hoveredRole, isMobileLayout, walkFrame]);

  return (
    <section id="section-2" className="section second-section" ref={sectionRef}>
      <div
        className={`second-corner-icon ${isVisible ? 'is-visible' : ''}`}
        aria-hidden="true"
        style={
          iconPos.x != null && iconPos.y != null
            ? { left: `${iconPos.x}px`, top: `${iconPos.y}px` }
            : undefined
        }
      >
        <svg viewBox="0 0 100 100" className="second-corner-icon-svg">
          <path
            className="second-corner-path second-corner-path-top"
            d="M 51 10 L 51 28 Q 51 51 71 51 L 90 51"
          />
          <path
            className="second-corner-path second-corner-path-bottom"
            d="M 10 49 L 29 49 Q 49 49 49 69 L 49 90"
          />
        </svg>
      </div>
      <div className="lorem-container section-text-block">
        <p ref={topHeaderRef} className={`section-text section-text-1 ${isVisible ? 'is-visible' : ''}`}>
          ANTES DE SEGUIR
        </p>
        <p className={`section-text section-text-2 ${isVisible ? 'is-visible' : ''}`}>
          TE INVITO A <span className="bold-text">CONOCERME</span>
        </p>

        <svg
          className={`section-connection-arrow ${isVisible ? 'is-visible' : ''} ${isArrowDrawn ? 'arrowhead-visible' : ''}`}
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="section-connection-arrowhead"
              markerWidth="14"
              markerHeight="14"
              refX="10"
              refY="7"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path
                className="section-connection-arrowhead-side section-connection-arrowhead-side-1"
                d="M 0 0 L 14 7"
                pathLength="1"
                fill="none"
                stroke="rgba(250, 250, 250, 1.0)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="section-connection-arrowhead-side section-connection-arrowhead-side-2"
                d="M 14 7 L 0 14"
                pathLength="1"
                fill="none"
                stroke="rgba(250, 250, 250, 1.0)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>
          <path
            className="section-connection-arrow-body"
            d="M 713 133 C 1135 86 1061 211 916 210 C 786 215 506 101 357 228 C 315 268 306 326 322 371"
            pathLength="1"
            fill="none"
            stroke="rgba(250, 250, 250, 1.0)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            markerEnd="url(#section-connection-arrowhead)"
          />
        </svg>

        <div className="section-content-row">
          <p className={`section-side-text ${isVisible ? 'is-visible' : ''}`}>
            Soy Ale, trabajo<br />como UXD hace más<br />de 5 años
          </p>

          <div className="section-avatar-container">
            <svg viewBox="0 0 270 270" className="section-avatar-svg">
              <defs>
                <path id="section-circle-text" d="M 135, 135 m -105, 0 a 105,105 0 1,1 210,0 a 105,105 0 1,1 -210,0" />
                <mask id="section-avatar-mask">
                  <rect width="270" height="270" fill="black" />
                  <path
                    d="M 75 82 H 195 L 75 97 H 195 L 75 112 H 195 L 75 127 H 195 L 75 142 H 195 L 75 157 H 195 L 75 172 H 195 L 75 187 H 195"
                    className={`section-mask-path ${isVisible ? 'is-visible' : ''}`}
                    pathLength="1"
                    transform="rotate(-80 135 135)"
                    fill="none"
                    stroke="white"
                    strokeWidth="22"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="75"
                    y="75"
                    width="120"
                    height="120"
                    fill="white"
                    className={`section-mask-final ${isVisible ? 'is-visible' : ''}`}
                  />
                </mask>
              </defs>
              <circle
                cx="135"
                cy="135"
                r="82.5"
                fill="none"
                stroke="rgba(250, 250, 250, 1.0)"
                strokeWidth="0.5"
              />
              <image
                href={currentAvatarInfo.src}
                x="75"
                y="75"
                width="120"
                height="120"
                className="section-avatar-image"
                mask="url(#section-avatar-mask)"
                transform={currentAvatarInfo.transform}
              />
              <text className="section-avatar-text" fill="rgba(250, 250, 250, 1.0)" fontSize="13" letterSpacing="0.4" dominantBaseline="middle">
                <textPath href="#section-circle-text" textLength="660" lengthAdjust="spacing">
                  EN&#160;MARKETING UX&#160;DESIGNER FRONTEND&#160;VIBE&#160;CODER COPYWRITER RESEARCHER&#160;●&#160;TÉCNICO&#160;
                </textPath>
              </text>
              <circle
                cx="135"
                cy="135"
                r="127.5"
                fill="none"
                stroke="rgba(250, 250, 250, 1.0)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          <div className="section-side-text-right">
            <div ref={rightTitleMaskRef} className={`side-text-title-mask ${isVisible ? 'is-visible' : ''}`}>
              <p className="side-text-title">Pero también soy</p>
              <div className="side-text-title-underline"></div>
            </div>
            <ul className="side-text-list" onMouseLeave={clearHoveredRole}>
              <li
                className={`${isVisible ? 'is-visible' : ''} ${isMobileLayout && activeAnimationRole === 'speedwalker' ? 'is-mobile-active' : ''}`}
                onMouseEnter={() => setHoveredRoleStable('speedwalker')}
                onMouseMove={() => setHoveredRoleStable('speedwalker')}
              >
                <span className="item-num">
                  {splitText("(01)", 2.6, isVisible)}
                </span>
                {splitText(" SPEEDWALKER", 2.7, isVisible)}
                <span className={`side-text-mobile-anim ${isMobileLayout && activeAnimationRole === 'speedwalker' ? 'is-visible' : ''}`} aria-hidden="true">
                  <img src={getAnimatedRoleFrame('speedwalker')} alt="" draggable="false" />
                </span>
              </li>
              <li
                className={`${isVisible ? 'is-visible' : ''} ${isMobileLayout && activeAnimationRole === 'dungeonmaster' ? 'is-mobile-active' : ''}`}
                onMouseEnter={() => setHoveredRoleStable('dungeonmaster')}
                onMouseMove={() => setHoveredRoleStable('dungeonmaster')}
              >
                <span className="item-num">
                  {splitText("(02)", 3.1, isVisible)}
                </span>
                {splitText(" DUNGEON MASTER", 3.2, isVisible)}
                <span className={`side-text-mobile-anim ${isMobileLayout && activeAnimationRole === 'dungeonmaster' ? 'is-visible' : ''}`} aria-hidden="true">
                  <img src={getAnimatedRoleFrame('dungeonmaster')} alt="" draggable="false" />
                </span>
              </li>
              <li
                className={`${isVisible ? 'is-visible' : ''} ${isMobileLayout && activeAnimationRole === 'chef' ? 'is-mobile-active' : ''}`}
                onMouseEnter={() => setHoveredRoleStable('chef')}
                onMouseMove={() => setHoveredRoleStable('chef')}
              >
                <span className="item-num">
                  {splitText("(03)", 3.6, isVisible)}
                </span>
                {splitText(" TRAINED CHEF", 3.7, isVisible)}
                <span className={`side-text-mobile-anim ${isMobileLayout && activeAnimationRole === 'chef' ? 'is-visible' : ''}`} aria-hidden="true">
                  <img src={getAnimatedRoleFrame('chef')} alt="" draggable="false" />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function splitText(text, baseDelay, isVisible) {
  return text.split('').map((char, index) => (
    <span
      key={index}
      className="char"
      style={{
        animationDelay: isVisible ? `${baseDelay + (index * 0.03)}s` : '0s'
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
}
