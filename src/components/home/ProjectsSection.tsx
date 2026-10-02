import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { projects } from '../../config/projects'
import { Icon } from '../ui/Icon'

/** 首页模块五：重点项目 / 应用场景（取前 4 个案例卡片，含"待补充"标识） */
export function ProjectsSection() {
  const featured = projects.slice(0, 4)
  return (
    <section className="bg-navy-900/40 py-20 md:py-28">
      <div className="container-content">
        <SectionTitle
          en="PROJECTS & SCENARIOS"
          title="重点项目 · 应用场景"
          desc="以下案例为占位模板，正式上线前将替换为经确认的真实项目资料。"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
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
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[15px] font-semibold text-white group-hover:text-accent-soft">
                    {p.name}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <Icon name="pin" className="h-3.5 w-3.5" />
                    {p.location}
                  </p>
                  <p className="mt-3 line-clamp-2 flex-1 text-[13px] leading-relaxed text-slate-400">
                    {p.summary}
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
          <Link to="/projects" className="btn-ghost">
            查看全部项目案例
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
