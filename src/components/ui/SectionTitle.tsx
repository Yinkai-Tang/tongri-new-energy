import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

/** 通用区块标题：英文小标 + 中文大标 + 可选描述 */
export function SectionTitle({
  en,
  title,
  desc,
  align = 'center',
  dark = false,
}: {
  en: string
  title: string
  desc?: string
  align?: 'center' | 'left'
  dark?: boolean
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <Reveal className={`max-w-2xl ${alignCls}`}>
      <p className={`section-en ${dark ? 'text-energy' : ''}`}>{en}</p>
      <h2 className="section-title">{title}</h2>
      {desc && <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">{desc}</p>}
      <span
        className={`mt-6 block h-[2px] w-14 bg-gradient-to-r from-accent to-energy ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </Reveal>
  )
}

/** 品牌 Logo 组合（SVG 绘制，清晰且无版权风险；正式品牌 Logo 出品后可替换） */
export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="同日新能源 首页">
      {/* 图形标：能量核心 */}
      <svg viewBox="0 0 44 44" className="h-9 w-9 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2E9BFF" />
            <stop offset="1" stopColor="#34D08C" />
          </linearGradient>
        </defs>
        <path
          d="M22 3 6.5 12v20L22 41l15.5-9V12L22 3z"
          fill="none"
          stroke="url(#logo-g)"
          strokeWidth="2.4"
        />
        <path d="M24.5 11 15 24h6l-1.8 9L29 19.5h-6.2l1.7-8.5z" fill="url(#logo-g)" />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-wide text-white">同日新能源</span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-slate-400">
            Tungray New Energy
          </span>
        </span>
      )}
    </Link>
  )
}
