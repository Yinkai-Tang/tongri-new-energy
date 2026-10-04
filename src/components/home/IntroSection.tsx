import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { intro } from '../../config/home'
import { Icon } from '../ui/Icon'

/** 首页模块一：企业简介概览 */
export function IntroSection() {
  return (
    <section className="relative bg-navy-950 py-24 md:py-32">
      <div className="container-content">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 文案 */}
          <div>
            <Reveal>
              <p className="section-en">{intro.titleEn}</p>
              <h2 className="section-title">{intro.title}</h2>
            </Reveal>
            {intro.paragraphs.map((p, i) => (
              <Reveal key={i} delay={100 + i * 80}>
                <p className="mt-5 text-sm leading-loose text-slate-400 md:text-[15px]">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={300}>
              <Link to={intro.cta.path} className="btn-primary mt-8">
                {intro.cta.label}
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          {/* 配图 */}
          <Reveal delay={150}>
            <figure className="group relative">
              <span className="corner-frame absolute -left-3 -top-3 h-full w-full" aria-hidden="true" />
              <img
                src={intro.image}
                alt={intro.imageAlt}
                className="img-brand aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="absolute bottom-0 left-0 bg-navy-950/85 px-4 py-2 text-[11px] text-slate-500 backdrop-blur-sm">
                工业制造车间场景示意
              </figcaption>
              <span className="absolute -bottom-1 left-0 h-[3px] w-24 bg-gradient-to-r from-accent to-energy" />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** 通用区块头（带英文小标） */
export { SectionTitle }
