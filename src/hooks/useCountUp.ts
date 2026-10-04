import { useEffect, useRef, useState } from 'react'

/**
 * 数字滚动动画：进入视口后从 0 计数到目标值（一次）。
 * 仅数值部分参与动画，前后缀保持静态；
 * 「减少动态效果」设置下直接显示最终值。
 */
export function useCountUp(target: string, duration = 1400) {
  const ref = useRef<HTMLElement | null>(null)
  const [display, setDisplay] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? target : '0'
  )
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const match = target.match(/^(\d+)(.*)$/)
    if (!match) {
      setDisplay(target)
      return
    }
    const end = parseInt(match[1], 10)
    const rest = match[2]

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        io.disconnect()

        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(String(Math.round(end * eased)) + rest)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])

  return { ref, display }
}
