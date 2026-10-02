import { Link, Navigate, useParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Icon } from '../components/ui/Icon'
import { getBusiness, businesses } from '../config/businesses'
import { projects } from '../config/projects'

/**
 * 业务板块详情页（数据驱动：具身智能供应链 / 新能源 / 现代农业 共用模板）
 * 结构：定位说明 → 能力范围 → 协同流程 → 应用场景 → 相关案例 → 合作 CTA
 */
export function BusinessDetailPage() {
  const { slug } = useParams()
  const biz = getBusiness(slug ?? '')

  usePageMeta({
    title: biz ? `${biz.name} - 业务板块` : '业务板块',
    description: biz?.summary,
    image: biz?.image,
  })

  if (!biz) return <Navigate to="/business" replace />

  const relatedProjects = projects.filter((p) => p.category === biz.name).slice(0, 3)
  const otherBiz = businesses.filter((b) => b.slug !== biz.slug)
  const themeColor = biz.theme === 'energy' ? 'text-energy' : 'text-accent-soft'
  const themeBorder = biz.theme === 'energy' ? 'border-energy/40' : 'border-accent/40'
  const themeBgHover = biz.theme === 'energy' ? 'group-hover:border-energy' : 'group-hover:border-accent'

  return (
    <>
      <PageHeader
        en={biz.nameEn}
        title={biz.name}
        desc={biz.tagline}
        image={biz.image}
        imageAlt={biz.imageAlt}
        crumbs={[
          { label: '首页', path: '/' },
          { label: '业务板块', path: '/business' },
          { label: biz.name },
        ]}
      />

      {/* 板块定位 */}
      <section className="bg-navy-950 py-20 md:py-24">
        <div className="container-content">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <p className="section-en">POSITIONING</p>
              <h2 className="section-title">板块定位</h2>
              <p className="mt-4 text-sm text-slate-500">{biz.index} / {biz.nameEn}</p>
              <div className={`mt-8 hidden h-[2px] w-24 lg:block ${biz.theme === 'energy' ? 'bg-energy' : 'bg-accent'}`} />
            </Reveal>
            <div className="space-y-5">
              {biz.positioning.map((p, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className={`text-sm leading-loose md:text-[15px] ${i === biz.positioning.length - 1 && p.startsWith('注') ? 'border-l-2 border-energy/50 pl-4 text-slate-500' : 'text-slate-400'}`}>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 服务 / 能力范围 */}
      <section className="bg-navy-900/40 py-20 md:py-24">
        <div className="container-content">
          <SectionTitle en="CAPABILITIES" title="服务与能力范围" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {biz.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className={`card-dark card-dark-hover group h-full border-l-2 p-6 ${themeBorder} ${themeBgHover} transition-colors`}>
                  <span className={`flex h-11 w-11 items-center justify-center border ${themeBorder} ${themeColor} bg-white/[0.02]`}>
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 流程图 */}
      <section className="bg-section-dark relative py-20 md:py-24">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
        <div className="container-content relative">
          <SectionTitle en="PROCESS" title={biz.processTitle} />
          <div className="mt-14">
            {/* 桌面端横向流程 */}
            <div className="hidden items-stretch lg:flex">
              {biz.process.map((step, i) => (
                <Reveal key={step.title} delay={i * 90} className="relative flex-1">
                  <div className="relative h-full border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-accent/40">
                    <span className="font-mono text-sm text-accent/80">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-[15px] font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{step.desc}</p>
                    {i < biz.process.length - 1 && (
                      <span className="absolute -right-[9px] top-1/2 z-10 -translate-y-1/2 text-slate-600">
                        <Icon name="arrowRight" className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            {/* 移动端纵向流程 */}
            <ol className="relative space-y-4 lg:hidden">
              <span className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-[2px] bg-white/10" aria-hidden="true" />
              {biz.process.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 60} className="relative pl-9">
                  <span className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 ${biz.theme === 'energy' ? 'border-energy' : 'border-accent'} bg-navy-950`} />
                  <h3 className="text-[15px] font-semibold text-white">
                    <span className="mr-2 font-mono text-sm text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-slate-500">{step.desc}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 应用场景 */}
      <section className="bg-navy-950 py-20 md:py-24">
        <div className="container-content">
          <SectionTitle en="APPLICATIONS" title="应用场景" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {biz.scenarios.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="card-dark card-dark-hover group h-full p-6">
                  <span className={`h-[2px] w-8 block ${biz.theme === 'energy' ? 'bg-energy' : 'bg-accent'} transition-all duration-500 group-hover:w-full`} />
                  <h3 className="mt-4 text-base font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 相关案例 */}
      <section className="bg-navy-900/40 py-20 md:py-24">
        <div className="container-content">
          <SectionTitle en="RELATED CASES" title="相关案例" desc="案例信息为占位模板，正式内容确认后发布。" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {relatedProjects.length > 0 ? (
              relatedProjects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 90}>
                  <Link to={`/projects/${p.slug}`} className="group card-dark card-dark-hover block h-full overflow-hidden">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={p.image} alt={p.imageAlt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <span className="absolute right-3 top-3 border border-white/15 bg-navy-950/80 px-2 py-0.5 text-[10px] text-slate-500 backdrop-blur-sm">待补充</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[15px] font-semibold text-white group-hover:text-accent-soft">{p.name}</h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                        <Icon name="pin" className="h-3.5 w-3.5" />{p.location}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))
            ) : (
              <Reveal>
                <div className="card-dark col-span-full flex flex-col items-center gap-2 p-10 text-center">
                  <Icon name="doc" className="h-8 w-8 text-slate-600" />
                  <p className="text-sm text-slate-400">本板块案例资料整理中，欢迎直接联系我们了解最新项目进展。</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* 合作咨询 CTA + 其他板块 */}
      <section className="bg-navy-950 py-20 md:py-24">
        <div className="container-content grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="relative flex h-full flex-col justify-center overflow-hidden border border-white/5 bg-gradient-to-br from-navy-900 to-navy-950 p-10">
              <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
              <div className="relative">
                <h2 className="text-2xl font-bold text-white md:text-3xl">开始您的合作咨询</h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400">{biz.ctaText}</p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link to={`/contact?field=${encodeURIComponent(biz.name)}`} className="btn-primary">
                    合作咨询
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-6">
            {otherBiz.map((b, i) => (
              <Reveal key={b.slug} delay={i * 100}>
                <Link to={`/business/${b.slug}`} className="group card-dark card-dark-hover flex items-center gap-5 p-6">
                  <span className="font-mono text-2xl font-bold text-white/20">{b.index}</span>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white group-hover:text-accent-soft">{b.name}</h3>
                    <p className="mt-0.5 text-[11px] uppercase tracking-wider text-slate-500">{b.nameEn}</p>
                  </div>
                  <Icon name="arrowRight" className="h-4 w-4 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-accent-soft" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
