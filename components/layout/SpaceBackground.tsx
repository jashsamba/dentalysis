'use client'

import { useEffect, useRef } from 'react'

type Star = { x: number; y: number; z: number; phase: number; speed: number; color: string }
type Meteor = { x: number; y: number; vx: number; vy: number; life: number }

const STAR_COLORS = ['#ffffff', '#ffffff', '#ffffff', '#dbe4ff', '#c7d2fe', '#fde68a', '#a5f3fc']

/**
 * Fixed, full-screen space backdrop: drifting nebula clouds plus a canvas starfield
 * that twinkles, moves with depth as you scroll, and throws the odd shooting star.
 * With reduced motion it renders a still sky.
 */
export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let stars: Star[] = []
    let meteor: Meteor | null = null
    let nextMeteor = performance.now() + 2500
    let raf = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(520, Math.round((w * h) / 3200))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() ** 2.2 * 0.9 + 0.1, // most stars far away, a few close
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.6,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }))
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const scroll = window.scrollY

      for (const s of stars) {
        // Closer stars move further when scrolling (parallax)
        const y = (((s.y - scroll * s.z * 0.3) % h) + h) % h
        const twinkle = reduce ? 1 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.speed + s.phase)
        const alpha = (0.25 + 0.75 * s.z) * twinkle
        const r = 0.35 + s.z * 1.5

        ctx.globalAlpha = alpha
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(s.x, y, r, 0, Math.PI * 2)
        ctx.fill()

        if (s.z > 0.8) {
          // soft halo on the brightest stars
          ctx.globalAlpha = alpha * 0.18
          ctx.beginPath()
          ctx.arc(s.x, y, r * 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (!reduce) {
        if (!meteor && t > nextMeteor) {
          meteor = {
            x: w * (0.3 + Math.random() * 0.7),
            y: h * Math.random() * 0.35,
            vx: -(7 + Math.random() * 5),
            vy: 3 + Math.random() * 2.5,
            life: 0,
          }
        }
        if (meteor) {
          const m = meteor
          const tailX = m.x - m.vx * 14
          const tailY = m.y - m.vy * 14
          const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
          grad.addColorStop(0, 'rgba(255,255,255,0.95)')
          grad.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.globalAlpha = Math.max(0, 1 - m.life / 55)
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.6
          ctx.beginPath()
          ctx.moveTo(m.x, m.y)
          ctx.lineTo(tailX, tailY)
          ctx.stroke()
          m.x += m.vx
          m.y += m.vy
          m.life++
          if (m.life > 55 || m.x < -50 || m.y > h + 50) {
            meteor = null
            nextMeteor = t + 3500 + Math.random() * 7000
          }
        }
      }
      ctx.globalAlpha = 1
    }

    const loop = (t: number) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      if (reduce) draw(0)
      else raf = requestAnimationFrame(loop)
    }

    const onResize = () => {
      resize()
      if (reduce) draw(0)
    }
    const onScroll = () => {
      if (reduce) draw(0)
    }
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else start()
    }

    resize()
    start()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ viewTransitionName: 'starfield' }}>
      <div className="nebula -top-[20vh] -left-[15vw] h-[70vh] w-[60vw] bg-[#5b3fd1]" />
      <div className="nebula top-[30vh] -right-[20vw] h-[65vh] w-[55vw] bg-[#0e7490]" style={{ animationDelay: '-12s' }} />
      <div className="nebula -bottom-[25vh] left-[20vw] h-[55vh] w-[50vw] bg-[#9d174d] opacity-20" style={{ animationDelay: '-24s' }} />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
