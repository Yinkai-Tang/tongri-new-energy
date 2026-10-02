import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { contactCta } from '../../config/home'
import { Icon } from '../ui/Icon'

/** 首页模块七：联系我们 CTA（深色背景 + 简洁咨询表单入口） */
export function ContactCtaSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* 深色背景 + 网格 + 光晕 */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[640px] -translate-x-1/2 rounded-full bg-accent/10 blur-[100px]" />
      <span className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l border-t border-accent/40" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b border-r border-energy/40" aria-hidden="true" />

      <div className="container-content relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal>
              <p className="section-en">PARTNERSHIP</p>
              <h2 className="mt-3 text-3xl font-bold leading-snug text-white md:text-4xl">
                {contactCta.title}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
                {contactCta.desc}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to={contactCta.primary.path} className="btn-primary">
                  {contactCta.primary.label}
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
                <Link to={contactCta.secondary.path} className="btn-ghost">
                  {contactCta.secondary.label}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* 简洁咨询表单入口（点击跳转完整表单，减少首屏成本） */}
          <Reveal delay={150}>
            <div className="card-dark relative p-7">
              <span className="corner-frame absolute inset-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white">快速咨询入口</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                选择合作方向，直达对应的合作咨询表单。
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { label: '具身智能供应链合作', icon: 'chip' },
                  { label: '新能源项目合作', icon: 'solar' },
                  { label: '算力中心合作', icon: 'server' },
                  { label: '其他合作事项', icon: 'handshake' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={`${contactCta.primary.path}?field=${encodeURIComponent(item.label.replace('合作', '').replace('项目', '').replace('事项', '').trim() || '其他')}`}
                    className="group flex items-center justify-between border border-white/10 bg-navy-950/50 px-5 py-3.5 text-sm text-slate-300 transition-all hover:border-accent/50 hover:bg-accent/5 hover:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name={item.icon} className="h-[18px] w-[18px] text-accent-soft" />
                      {item.label}
                    </span>
                    <Icon
                      name="arrowRight"
                      className="h-4 w-4 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-accent-soft"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
