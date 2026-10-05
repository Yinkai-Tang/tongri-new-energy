import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { businesses } from '../../config/businesses'
import { Icon } from '../ui/Icon'

const bizIcons = ['chip', 'solar', 'server']

/**
 * 首页模块五：应用场景（承接原"重点项目/应用场景"栏目位置）
 * 三大业务各自的目标应用场景，来自 config/businesses.ts，
 * 均为目标方向与合作方向，不代表已落地项目。
 */
export function ApplicationScenariosSection() {
  return (
    <section className="bg-navy-900/40 py-24 md:py-32">
      <div className="container-content">
        <SectionTitle
          en="APPLICATION SCENARIOS"
          title="应用场景"
          desc="围绕三大业务方向，我们关注以下行业与应用场景，欢迎产业伙伴共同探讨合作方式。"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {businesses.map((b, i) => (
            <Reveal key={b.slug} delay={i * 110}>
              <div className="card-dark flex h-full flex-col p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center border border-accent/30 bg-accent/5 text-accent-soft">
                    <Icon name={bizIcons[i]} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{b.name}</h3>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">{b.nameEn}</p>
                  </div>
                </div>
                <ul className="mt-6 flex-1 space-y-3.5">
                  {b.scenarios.current.map((s) => (
                    <li key={s.title} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                      <span aria-hidden="true" className="mt-[9px] h-1 w-3 shrink-0 bg-energy/70" />
                      <span>
                        {s.title}
                        <span className="block text-xs text-slate-500">{s.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/business/${b.slug}`}
                  className="mt-6 inline-flex items-center gap-2 border-t border-white/5 pt-5 text-sm text-accent-soft transition-colors hover:text-white"
                >
                  了解{b.name}板块
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-slate-500">
            以上为面向行业与合作方向的应用场景描述，具体合作范围以双方沟通与公司确认为准。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
