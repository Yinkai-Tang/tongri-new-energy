import { Link } from 'react-router-dom'
import { hero, heroStats } from '../../config/home'
import { Icon } from '../ui/Icon'

/**
 * 首屏 Banner：
 * - 全屏工业科技背景 + 渐变遮罩 + 网格
 * - 主/副标题与双 CTA
 * - 底部滚动提示 + 数据流线动画（纯 CSS/SVG，无重资源）
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-950">
      {/* 背景图与遮罩 */}
      <div className="absolute inset-0">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/60 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60" />
        <div className="absolute inset-0 bg-grid opacity-50" />
      </div>

      {/* 顶部氛围光 */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-energy/10 blur-[110px]" />

      {/* 主内容 */}
      <div className="container-content relative flex flex-1 flex-col justify-center pb-40 pt-40 md:pb-48">
        <p className="flex items-center gap-3 text-xs uppercase tracking-widest2 text-accent-soft md:text-sm">
          <span className="inline-block h-[1px] w-10 bg-accent/70" aria-hidden="true" />
          Tungray New Energy
        </p>
        <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.2] text-white md:text-6xl">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
          {hero.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to={hero.ctas.primary.path} className="btn-primary">
            {hero.ctas.primary.label}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
          <Link to={hero.ctas.secondary.path} className="btn-ghost">
            {hero.ctas.secondary.label}
          </Link>
        </div>

        {/* 数据条（数据口径见 config/home.ts 注释，发布前请确认） */}
        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 md:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dd className="order-1 text-2xl font-bold text-white md:text-3xl">
                {s.value}
                {s.unit && <span className="ml-0.5 text-base font-medium text-accent-soft">{s.unit}</span>}
              </dd>
              <dt className="order-2 mt-1 text-xs text-slate-400 md:text-[13px]">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* 底部：滚动提示 + 数据流线 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 120" className="h-24 w-full opacity-60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 100 C 360 60, 720 130, 1080 90 S 1440 70, 1440 70" fill="none" stroke="#2E9BFF" strokeOpacity="0.35" strokeWidth="1.5" />
          <path d="M0 100 C 360 60, 720 130, 1080 90 S 1440 70, 1440 70" fill="none" stroke="#7CC4FF" strokeWidth="2" strokeDasharray="30 240" strokeLinecap="round" className="animate-dash-flow" />
          <path d="M0 80 C 400 120, 900 40, 1440 95" fill="none" stroke="#34D08C" strokeOpacity="0.3" strokeWidth="1.5" />
          <path d="M0 80 C 400 120, 900 40, 1440 95" fill="none" stroke="#8AE6BD" strokeWidth="2" strokeDasharray="24 260" strokeLinecap="round" className="animate-dash-flow" style={{ animationDelay: '-3s' }} />
        </svg>
        <div className="container-content flex justify-center pb-6">
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
            <span className="relative block h-8 w-[1px] overflow-hidden bg-white/15">
              <span className="absolute left-0 top-0 h-3 w-full bg-accent animate-scroll-hint" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
