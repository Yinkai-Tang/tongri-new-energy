import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { businesses } from '../config/businesses'
import { Icon } from '../components/ui/Icon'

/** 业务板块总览页 */
export function BusinessPage() {
  usePageMeta({
    title: '业务板块',
    description:
      '同日新能源三大业务板块：具身智能供应链、新能源、算力中心——产业协同，互为支撑。',
  })

  return (
    <>
      <PageHeader
        en="OUR BUSINESS"
        title="业务板块"
        desc="以制造为根基、以技术为纽带、以绿色为方向，三大业务互为支撑、协同发展。"
        image="/images/biz-energy-hero.svg"
        imageAlt="业务板块页头背景（占位图，可替换）"
        crumbs={[{ label: '首页', path: '/' }, { label: '业务板块' }]}
      />

      <section className="bg-navy-950 py-20 md:py-24">
        <div className="container-content space-y-8">
          {businesses.map((b, i) => (
            <Reveal key={b.slug} delay={i * 60}>
              <Link
                to={`/business/${b.slug}`}
                className="group card-dark card-dark-hover grid overflow-hidden md:grid-cols-[5fr_6fr]"
              >
                <div className={`relative aspect-[16/9] md:aspect-auto md:min-h-[300px] ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <img
                    src={b.image}
                    alt={b.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-950/40 to-transparent" />
                  <span className="absolute left-6 top-5 font-mono text-6xl font-bold text-white/20">
                    {b.index}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">{b.nameEn}</p>
                  <h2 className="mt-2.5 text-2xl font-bold text-white transition-colors group-hover:text-accent-soft md:text-3xl">
                    {b.name}
                  </h2>
                  <p className="mt-1.5 text-sm font-medium text-energy/90">{b.tagline}</p>
                  <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-slate-400 md:text-sm">
                    {b.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {b.capabilities.slice(0, 4).map((c) => (
                      <span key={c.title} className="border border-white/10 px-3 py-1.5 text-xs text-slate-400">
                        {c.title}
                      </span>
                    ))}
                  </div>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm text-accent-soft">
                    进入板块详情
                    <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
