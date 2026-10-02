import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { Reveal } from './Reveal'

/**
 * 品牌 Logo 组件（全站唯一 Logo 入口，勿在页面内手动放 Logo）：
 * - 使用官方 Tungray 横版单色资产，完整比例 object-contain，禁止拉伸/裁切/加效果；
 * - variant='white'（默认）：深蓝/黑/深灰背景的 Header、Footer 与深色页面；
 * - variant='black'：白/浅灰背景页面及打印（未来若引入浅色页头自动切换即改此参数）；
 * - 主体名称以普通文字形式置于 Logo 旁，不参与 Logo 图形。
 */
export function BrandLogo({
  compact = false,
  variant = 'white',
}: {
  compact?: boolean
  variant?: 'white' | 'black'
}) {
  const src = variant === 'black' ? site.brand.logoBlack : site.brand.logoWhite
  return (
    <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="同日集团 TUNGRAY">
      <img
        src={src}
        alt="同日集团 TUNGRAY"
        className="h-7 w-auto object-contain md:h-9"
        width={355}
        height={81}
      />
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span
            className={`text-xs font-medium transition-colors duration-300 ${
              variant === 'black' ? 'text-ink' : 'text-white'
            }`}
          >
            {site.fullName}
          </span>
          <span
            className={`mt-0.5 text-[9px] uppercase tracking-wide transition-colors duration-300 ${
              variant === 'black' ? 'text-ink-mute' : 'text-slate-500'
            }`}
          >
            {site.fullNameEn}
          </span>
        </span>
      )}
    </Link>
  )
}

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
