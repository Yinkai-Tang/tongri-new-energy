import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { projects, projectCategories, type ProjectCategory } from '../config/projects'

/** 项目案例列表页（支持按业务板块筛选） */
export function ProjectsPage() {
  usePageMeta({
    title: '项目案例',
    description: '同日新能源项目案例：具身智能供应链、新能源、算力中心领域的应用场景与合作实践。',
  })

  const [active, setActive] = useState<'全部' | ProjectCategory>('全部')
  const filtered = active === '全部' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <PageHeader
        en="PROJECTS"
        title="项目案例"
        desc="以下案例为占位模板，正式上线前将替换为经确认的真实项目资料。"
        image="/images/project-4.svg"
        imageAlt="项目案例页头背景（占位图，可替换）"
        crumbs={[{ label: '首页', path: '/' }, { label: '项目案例' }]}
      />

      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-content">
          {/* 筛选器 */}
          <Reveal>
            <div className="flex flex-wrap gap-3" role="tablist" aria-label="项目分类筛选">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active === cat}
                  onClick={() => setActive(cat)}
                  className={`border px-5 py-2.5 text-sm transition-all duration-300 ${
                    active === cat
                      ? 'border-accent bg-accent/15 text-accent-soft'
                      : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                  <span className="ml-2 text-xs text-slate-600">
                    {cat === '全部' ? projects.length : projects.filter((p) => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* 卡片列表 */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <Link
                  to={`/projects/${p.slug}`}
                  className="group card-dark card-dark-hover flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-4 top-3 border border-accent/40 bg-navy-950/80 px-2.5 py-1 text-[11px] text-accent-soft backdrop-blur-sm">
                      {p.category}
                    </span>
                    {p.pending && (
                      <span className="absolute right-4 top-3 border border-white/15 bg-navy-950/80 px-2 py-1 text-[10px] text-slate-500 backdrop-blur-sm">
                        资料待补充
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-lg font-semibold text-white group-hover:text-accent-soft">{p.name}</h2>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                      <Icon name="pin" className="h-3.5 w-3.5" />
                      {p.location}
                    </p>
                    <p className="mt-3 line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-400">
                      {p.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-accent-soft">
                      查看详情
                      <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-sm text-slate-500">该分类下暂无案例，欢迎选择其他分类。</p>
          )}
        </div>
      </section>
    </>
  )
}
