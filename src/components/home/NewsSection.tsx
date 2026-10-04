import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { news } from '../../config/news'
import { Icon } from '../ui/Icon'

/** 日期格式化：YYYY-MM-DD → YYYY.MM.DD */
const fmt = (d: string) => d.replaceAll('-', '.')

/** 首页模块六：新闻动态（前 3 条） */
export function NewsSection() {
  const latest = news.slice(0, 3)
  return (
    <section className="bg-navy-950 py-24 md:py-32">
      <div className="container-content">
        <SectionTitle en="NEWS & INSIGHTS" title="新闻动态" />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {latest.map((n, i) => (
            <Reveal key={n.slug} delay={i * 100}>
              <Link to={`/news/${n.slug}`} className="group card-dark card-dark-hover flex h-full flex-col">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-3 border border-white/15 bg-navy-950/80 px-2.5 py-1 text-[11px] text-slate-300 backdrop-blur-sm">
                    {n.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <Icon name="calendar" className="h-3.5 w-3.5" />
                    <time dateTime={n.date}>{fmt(n.date)}</time>
                    <span className="text-slate-700">·</span>
                    <span>{n.source}</span>
                  </p>
                  <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-white transition-colors group-hover:text-accent-soft">
                    {n.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-400">
                    {n.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-accent-soft">
                    查看详情
                    <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link to="/news" className="btn-ghost">
            更多新闻
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
