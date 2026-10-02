import { Link, Navigate, useParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { getProject, projects } from '../config/projects'
import { site } from '../config/site'

/**
 * 项目案例详情页模板
 * 结构：项目概要 → 背景需求 → 解决方案 → 实施过程 → 项目成果 → 相关图片 → 联系咨询
 */
export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProject(slug ?? '')

  usePageMeta({
    title: project ? project.name : '项目案例',
    description: project?.summary,
    image: project?.image,
  })

  if (!project) return <Navigate to="/projects" replace />

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  const sections = [
    { en: 'BACKGROUND', title: '项目背景', body: project.detail.background },
    { en: 'REQUIREMENTS', title: '客户需求', body: project.detail.needs },
    { en: 'SOLUTION', title: '解决方案', body: project.detail.solution },
    { en: 'IMPLEMENTATION', title: '实施过程', body: project.detail.process },
    { en: 'RESULTS', title: '项目成果', body: project.detail.results },
  ]

  return (
    <>
      <PageHeader
        en={project.category}
        title={project.name}
        desc={project.summary}
        image={project.image}
        imageAlt={project.imageAlt}
        crumbs={[
          { label: '首页', path: '/' },
          { label: '项目案例', path: '/projects' },
          { label: project.name },
        ]}
      />

      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-content">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            {/* 正文 */}
            <article>
              {project.pending && (
                <Reveal>
                  <p className="mb-8 flex items-start gap-2.5 border border-energy/30 bg-energy/5 px-4 py-3 text-xs leading-relaxed text-energy">
                    <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
                    本案例为占位模板，展示详情页完整结构；正式发布前将替换为经客户与公司确认的真实项目资料。
                  </p>
                </Reveal>
              )}

              {/* 首图 */}
              <Reveal>
                <figure>
                  <img src={project.gallery[0]?.src ?? project.image} alt={project.gallery[0]?.alt ?? project.imageAlt} className="aspect-[16/9] w-full object-cover" />
                  <figcaption className="mt-2 text-xs text-slate-600">{project.gallery[0]?.alt ?? project.imageAlt}</figcaption>
                </figure>
              </Reveal>

              {/* 结构化章节 */}
              <div className="mt-12 space-y-10">
                {sections.map((s, i) => (
                  <Reveal key={s.title} delay={i * 60}>
                    <section aria-label={s.title}>
                      <h2 className="flex items-baseline gap-3 text-xl font-bold text-white">
                        <span className="font-mono text-sm text-accent/80">{String(i + 1).padStart(2, '0')}</span>
                        {s.title}
                        <span className="hidden text-[10px] uppercase tracking-widest2 text-slate-600 sm:inline">{s.en}</span>
                      </h2>
                      <p className="mt-3.5 border-l-2 border-white/10 pl-5 text-sm leading-loose text-slate-400">
                        {s.body}
                      </p>
                    </section>
                  </Reveal>
                ))}
              </div>

              {/* 相关图片 */}
              <Reveal>
                <h2 className="mt-12 flex items-baseline gap-3 text-xl font-bold text-white">
                  <span className="font-mono text-sm text-accent/80">{String(sections.length + 1).padStart(2, '0')}</span>
                  相关图片
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((g) => (
                    <figure key={g.src}>
                      <img src={g.src} alt={g.alt} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                      <figcaption className="mt-2 text-xs text-slate-600">{g.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              </Reveal>
            </article>

            {/* 侧栏 */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Reveal>
                <div className="card-dark p-7">
                  <h2 className="text-base font-semibold text-white">项目信息</h2>
                  <dl className="mt-5 space-y-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">业务板块</dt>
                      <dd className="text-right text-slate-300">{project.category}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">项目地点</dt>
                      <dd className="text-right text-slate-300">{project.location}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">项目名称</dt>
                      <dd className="text-right text-slate-300">{project.name}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="relative overflow-hidden border border-accent/20 bg-gradient-to-br from-navy-900 to-navy-950 p-7">
                  <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
                  <div className="relative">
                    <h2 className="text-base font-semibold text-white">相关业务咨询</h2>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      想了解 {project.category} 板块的合作模式与服务能力？
                    </p>
                    <div className="mt-5 space-y-2.5">
                      <Link
                        to={`/contact?field=${encodeURIComponent(project.category)}`}
                        className="btn-primary w-full"
                      >
                        合作咨询
                      </Link>
                      <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`} className="btn-ghost w-full">
                        <Icon name="phone" className="h-4 w-4" />
                        {site.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* 更多案例 */}
      <section className="bg-navy-900/40 py-16 md:py-20">
        <div className="container-content">
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="text-xl font-bold text-white md:text-2xl">更多项目案例</h2>
              <Link to="/projects" className="flex items-center gap-1.5 text-sm text-accent-soft">
                全部案例
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link to={`/projects/${p.slug}`} className="group card-dark card-dark-hover block overflow-hidden">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={p.image} alt={p.imageAlt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] text-accent-soft">{p.category}</span>
                    <h3 className="mt-1.5 text-[15px] font-semibold text-white group-hover:text-accent-soft">{p.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">{p.location}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
