import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { businesses } from '../../config/businesses'
import { Icon } from '../ui/Icon'

/**
 * 首页模块二：三大业务板块（大图分屏卡片）
 * 序号 / 图标 / 中英文标题 / 描述 / 箭头按钮，悬停时图片轻微放大
 */
export function BusinessSection() {
  return (
    <section className="bg-navy-900/40 py-20 md:py-28">
      <div className="container-content">
        <SectionTitle
          en="OUR BUSINESS"
          title="三大业务板块"
          desc="以制造为根基，三大产业方向互为支撑、协同发展。"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {businesses.map((b, i) => (
            <Reveal key={b.slug} delay={i * 110}>
              <Link
                to={`/business/${b.slug}`}
                className="group card-dark relative block overflow-hidden"
                aria-label={`${b.name} ${b.nameEn}`}
              >
                {/* 配图 */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                  <span className="absolute left-5 top-4 font-mono text-4xl font-bold text-white/15 transition-colors duration-300 group-hover:text-accent/40">
                    {b.index}
                  </span>
                  <span className="absolute bottom-4 left-5 flex h-11 w-11 items-center justify-center border border-white/20 bg-navy-950/70 text-accent-soft backdrop-blur-sm transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <Icon
                      name={
                        i === 0 ? 'chip' : i === 1 ? 'solar' : 'leaf'
                      }
                      className="h-5 w-5"
                    />
                  </span>
                </div>

                {/* 文案 */}
                <div className="p-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">{b.nameEn}</p>
                  <h3 className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-accent-soft">
                    {b.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-energy/90">{b.tagline}</p>
                  <p className="mt-3 line-clamp-3 min-h-[60px] text-[13px] leading-relaxed text-slate-400">
                    {b.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-accent-soft">
                    查看板块
                    <Icon
                      name="arrowRight"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
