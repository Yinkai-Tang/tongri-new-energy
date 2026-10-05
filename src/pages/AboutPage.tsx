import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Icon } from '../components/ui/Icon'
import { about } from '../config/about'
import { site } from '../config/site'

/** 关于我们 */
export function AboutPage() {
  usePageMeta({
    title: '关于我们',
    description: `${site.name}公司简介、使命愿景、产业基础、发展历程与可持续发展（ESG）。`,
  })

  return (
    <>
      <PageHeader
        en={about.header.titleEn}
        title={about.header.title}
        desc={about.header.desc}
        image={about.header.image}
        imageAlt={about.header.imageAlt}
        crumbs={[{ label: '首页', path: '/' }, { label: '关于我们' }]}
      />

      {/* 公司简介 */}
      <section className="bg-navy-950 py-24 md:py-32">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="section-en">COMPANY PROFILE</p>
              <h2 className="section-title">{about.profile.title}</h2>
            </Reveal>
            {about.profile.paragraphs.map((p, i) => (
              <Reveal key={i} delay={80 + i * 70}>
                <p className="mt-5 text-sm leading-loose text-slate-400 md:text-[15px]">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <figure className="group relative">
              <span className="corner-frame absolute -left-3 -top-3 h-full w-full" aria-hidden="true" />
              <img src={about.profile.image} alt={about.profile.imageAlt} className="img-brand aspect-[16/10] w-full object-cover" loading="lazy" />
              <span className="absolute -bottom-1 left-0 h-[3px] w-24 bg-gradient-to-r from-accent to-energy" />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* 使命 · 愿景 · 价值观 */}
      <section className="bg-navy-900/40 py-24 md:py-32">
        <div className="container-content">
          <SectionTitle en="MISSION · VISION · VALUES" title={about.mvv.title} />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {about.mvv.items.map((item, i) => (
              <Reveal key={item.key} delay={i * 100}>
                <div className="card-dark card-dark-hover relative h-full overflow-hidden p-8">
                  <span className="absolute right-4 top-4 font-mono text-5xl font-bold text-white/[0.04]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-xs uppercase tracking-[0.25em] text-energy">{item.en}</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">{item.key}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 集团背景 · 产业基础 */}
      <section className="bg-navy-950 py-24 md:py-32">
        <div className="container-content">
          <SectionTitle en="GROUP BACKGROUND" title={about.group.title} desc={about.group.desc} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {about.group.blocks.map((b, i) => (
              <Reveal key={b.title} delay={i * 90}>
                <div className="card-dark card-dark-hover group flex h-full gap-5 p-7">
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center border border-accent/30 bg-accent/5 text-accent-soft">
                    <Icon name={['factory', 'target', 'heart', 'globe'][i]} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{b.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-slate-400">{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 发展历程 Timeline */}
      <section className="bg-section-dark py-24 md:py-32">
        <div className="container-content">
          <SectionTitle en="MILESTONES" title={about.timeline.title} desc={about.timeline.desc} />

          <div className="relative mx-auto mt-16 max-w-3xl">
            {/* 纵向轴线 */}
            <span className="absolute left-[19px] top-0 h-full w-[2px] bg-gradient-to-b from-accent/60 via-white/10 to-energy/60 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
            <ol className="space-y-10">
              {about.timeline.items.map((item, i) => (
                <Reveal as="li" key={item.year} delay={i * 80} className="relative">
                  {/* 节点 */}
                  <span className="absolute left-[12px] top-1 flex h-[17px] w-[17px] items-center justify-center md:left-1/2 md:-translate-x-1/2">
                    <span className="absolute h-full w-full rounded-full border border-accent/50 bg-navy-950" />
                    <span className="relative h-[6px] w-[6px] rounded-full bg-accent" />
                  </span>
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                      i % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto'
                    }`}
                  >
                    <p className="font-mono text-2xl font-bold text-accent-soft">{item.year}</p>
                    <h3 className="mt-1 text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 企业文化 · 团队风貌 */}
      <section className="bg-navy-950 py-24 md:py-32">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <figure className="group relative">
              <span className="corner-frame absolute -left-3 -top-3 h-full w-full" aria-hidden="true" />
              <img src={about.culture.image} alt={about.culture.imageAlt} className="img-brand aspect-[16/10] w-full object-cover" loading="lazy" />
              <span className="absolute -bottom-1 left-0 h-[3px] w-24 bg-gradient-to-r from-energy to-accent" />
            </figure>
          </Reveal>
          <div>
            <Reveal>
              <p className="section-en">CULTURE & TEAM</p>
              <h2 className="section-title">{about.culture.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">{about.culture.desc}</p>
            </Reveal>
            <div className="mt-7 flex flex-wrap gap-3">
              {about.culture.keywords.map((k, i) => (
                <Reveal key={k} delay={i * 70}>
                  <span className="border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-slate-300">
                    {k}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 可持续发展 ESG */}
      <section className="bg-navy-900/40 py-24 md:py-32">
        <div className="container-content">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <p className="section-en text-energy">{about.esg.titleEn}</p>
              <h2 className="section-title">{about.esg.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">{about.esg.desc}</p>
              <img src={about.esg.image} alt={about.esg.imageAlt} className="mt-8 aspect-[16/9] w-full object-cover" loading="lazy" />
            </Reveal>
            <div className="space-y-4">
              {about.esg.items.map((item, i) => (
                <Reveal key={item.key} delay={i * 90}>
                  <div className="card-dark card-dark-hover flex gap-5 p-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-energy/40 bg-energy/10 text-energy">
                      <Icon name="leaf" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.key}</h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 联系入口 */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-content">
          <Reveal>
            <div className="relative overflow-hidden border border-white/5 bg-gradient-to-r from-navy-900 to-navy-950 px-8 py-12 text-center md:py-14">
              <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
              <div className="relative">
                <h2 className="text-2xl font-bold text-white md:text-3xl">期待与您深入交流</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
                  了解产业基础与合作方式，欢迎随时与我们联系。
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="btn-primary">联系我们</Link>
                  <Link to="/business" className="btn-ghost">了解业务板块</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
