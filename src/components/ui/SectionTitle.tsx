import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { Reveal } from './Reveal'

/**
 * 品牌 Logo 组件（全站唯一 Logo 入口，Header/Footer/移动端统一引用）：
 * - 使用官方 Tungray 彩色透明底横版 Logo，完整比例 object-contain；
 * - 禁止拉伸、裁切、模糊、反白、发光、描边、渐变等任何处理；
 * - 主体名称"上海同日新能源技术有限公司"以普通文字呈现在 Logo 旁，
 *   不与 Logo 合成，字号小于 Logo 字标；英文名未确认前不显示；
 * - 未来公司提供单色版官方文件后，可在本组件内按页头底色切换。
 */
export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-4" aria-label="Tungray 同日集团">
      <img
        src={site.brand.logo}
        alt={site.brand.alt}
        className="h-7 w-auto object-contain md:h-9"
        width={457}
        height={89}
      />
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span className="text-[15px] font-medium text-slate-100">
            {site.fullName}
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
