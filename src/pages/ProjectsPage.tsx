import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { asset } from '../utils/asset'

/**
 * 项目案例页（当前对外隐藏入口，代码保留供未来启用）
 * 同日新能源暂无可公开的真实项目案例：本页仅展示中性说明，不呈现
 * 任何占位案例或虚构内容；案例数据仍保留在 config/projects.ts 中。
 */
export function ProjectsPage() {
  usePageMeta({
    title: '应用场景与合作',
    description: '了解同日新能源三大业务板块的应用场景、方案能力与合作方式。',
  })

  return (
    <>
      <PageHeader
        en="APPLICATION & COOPERATION"
        title="应用场景与合作"
        desc="我们暂未对外发布项目案例。欢迎通过业务板块，了解各方向的应用场景、方案能力与合作方式。"
        image={asset('images/biz-computing-scene.webp')}
        imageAlt="数据中心网络基础设施场景（行业场景示意）"
        crumbs={[{ label: '首页', path: '/' }, { label: '应用场景与合作' }]}
      />

      <section className="bg-navy-950 py-16 md:py-24">
        <div className="container-content">
          <Reveal>
            <div className="card-dark mx-auto max-w-3xl p-10 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center border border-accent/30 bg-accent/5 text-accent-soft">
                <Icon name="doc" className="h-7 w-7" />
              </span>
              <h2 className="mt-6 text-xl font-bold text-white md:text-2xl">项目案例整理中</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
                同日新能源目前暂无可对外发布的项目案例。我们正在梳理面向行业场景的
                解决方案与应用实践，待内容确认后将在此页面正式发布。
              </p>
              <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-500">
                在此之前，欢迎通过下方入口了解我们的业务能力、应用场景与合作方式。
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { label: '业务板块', path: '/business', icon: 'globe', desc: '三大业务方向总览' },
              { label: '应用场景', path: '/', icon: 'target', desc: '行业场景与合作方向' },
              { label: '联系我们', path: '/contact', icon: 'message', desc: '提交合作咨询' },
            ].map((item, i) => (
              <Reveal key={item.path} delay={i * 80}>
                <Link
                  to={item.path}
                  className="card-dark card-dark-hover group flex h-full flex-col items-center gap-2 p-7 text-center"
                >
                  <Icon name={item.icon} className="h-6 w-6 text-accent-soft" />
                  <span className="text-base font-semibold text-white group-hover:text-accent-soft">
                    {item.label}
                  </span>
                  <span className="text-xs text-slate-500">{item.desc}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
