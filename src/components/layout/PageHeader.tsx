import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'

/**
 * 内页页头：深色底 + 配图 + 面包屑导航
 */
export function PageHeader({
  en,
  title,
  desc,
  image,
  imageAlt,
  crumbs,
}: {
  en: string
  title: string
  desc?: string
  image: string
  imageAlt: string
  crumbs: { label: string; path?: string }[]
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-[72px]">
      {/* 背景图 */}
      <div className="absolute inset-0">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/55 to-navy-950" />
        <div className="absolute inset-0 bg-grid opacity-60" />
      </div>

      <div className="container-content relative pb-14 pt-16 md:pb-20 md:pt-24">
        {/* 面包屑 */}
        <Reveal>
          <nav aria-label="面包屑" className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-slate-700">/</span>}
                {c.path ? (
                  <Link to={c.path} className="transition-colors hover:text-accent-soft">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-slate-300">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        <Reveal delay={100}>
          <p className="section-en mt-8">{en}</p>
          <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl">{title}</h1>
          {desc && <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">{desc}</p>}
        </Reveal>
      </div>
      <div className="relative h-[3px] w-full bg-gradient-to-r from-accent/70 via-energy/60 to-transparent" />
    </section>
  )
}
