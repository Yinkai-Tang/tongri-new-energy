import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { advantages } from '../../config/home'
import { Icon } from '../ui/Icon'

/** 首页模块四：为什么选择我们（4 个核心优势） */
export function AdvantagesSection() {
  return (
    <section className="bg-navy-950 py-20 md:py-28">
      <div className="container-content">
        <SectionTitle en={advantages.titleEn} title={advantages.title} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="card-dark card-dark-hover group relative h-full overflow-hidden p-7">
                {/* 序号水印 */}
                <span className="pointer-events-none absolute -right-2 -top-4 font-mono text-6xl font-bold text-white/[0.04] transition-colors duration-300 group-hover:text-accent/10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex h-12 w-12 items-center justify-center border border-accent/30 bg-accent/5 text-accent-soft transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-400">{item.desc}</p>
                <span className="mt-5 block h-[2px] w-8 bg-white/10 transition-all duration-500 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-energy" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
