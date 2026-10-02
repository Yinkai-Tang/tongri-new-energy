import { Reveal } from '../ui/Reveal'
import { Icon } from '../ui/Icon'
import { synergy } from '../../config/home'
import { businesses } from '../../config/businesses'

/**
 * 产业协同 / 核心能力：
 * 纯 SVG 绘制的协同关系图——三大业务环绕中心，连线带流动动画；
 * 外圈六个协同能力。全部内容来自 config/home.ts，可替换。
 */
export function SynergySection() {
  return (
    <section className="relative overflow-hidden bg-section-dark py-20 md:py-28">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="container-content relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="section-en">{synergy.titleEn}</p>
            <h2 className="section-title">{synergy.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">{synergy.desc}</p>
          </Reveal>
        </div>

        {/* 协同关系图（移动端简化为纵向布局） */}
        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* 桌面端：环形关系图 */}
          <div className="hidden md:block">
            <svg viewBox="0 0 900 560" className="w-full" role="img" aria-label="三大业务板块产业协同关系图">
              <defs>
                <radialGradient id="syn-center" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#1B2E48" />
                  <stop offset="1" stopColor="#0B1628" />
                </radialGradient>
              </defs>

              {/* 连线（中心 → 三个业务） */}
              {[
                { x: 450, y: 280, tx: 160, ty: 120 },
                { x: 450, y: 280, tx: 740, ty: 120 },
                { x: 450, y: 280, tx: 450, ty: 440 },
              ].map((l, i) => (
                <g key={i}>
                  <path
                    d={`M ${l.x} ${l.y} L ${l.tx} ${l.ty}`}
                    stroke="#2E9BFF"
                    strokeOpacity="0.25"
                    strokeWidth="1.5"
                  />
                  <path
                    d={`M ${l.x} ${l.y} L ${l.tx} ${l.ty}`}
                    stroke={i === 2 ? '#34D08C' : '#2E9BFF'}
                    strokeWidth="2"
                    strokeDasharray="12 90"
                    strokeLinecap="round"
                    className="animate-dash-flow"
                    style={{ animationDelay: `${-i * 2}s` }}
                  />
                </g>
              ))}

              {/* 业务间弧线 */}
              <path d="M 200 130 Q 450 10 700 130" fill="none" stroke="#34D08C" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 6" />
              <path d="M 160 150 Q 140 380 430 455" fill="none" stroke="#2E9BFF" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 6" />
              <path d="M 740 150 Q 760 380 470 455" fill="none" stroke="#2E9BFF" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 6" />

              {/* 中心节点 */}
              <circle cx="450" cy="280" r="95" fill="url(#syn-center)" stroke="#2E9BFF" strokeOpacity="0.5" strokeWidth="1.5" />
              <circle cx="450" cy="280" r="110" fill="none" stroke="#2E9BFF" strokeOpacity="0.15" strokeWidth="1" className="animate-pulse-soft" />
              <text x="450" y="272" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="700" fontFamily="PingFang SC, Microsoft YaHei, sans-serif">
                {synergy.centerLabel}
              </text>
              <text x="450" y="302" textAnchor="middle" fill="#7CC4FF" fontSize="12" letterSpacing="4" fontFamily="PingFang SC, Microsoft YaHei, sans-serif">
                {synergy.centerSub}
              </text>

              {/* 三个业务节点 */}
              {[
                { x: 160, y: 120, label: synergy.nodes[0].label, en: synergy.nodes[0].en, color: '#2E9BFF' },
                { x: 740, y: 120, label: synergy.nodes[1].label, en: synergy.nodes[1].en, color: '#34D08C' },
                { x: 450, y: 440, label: synergy.nodes[2].label, en: synergy.nodes[2].en, color: '#34D08C' },
              ].map((n) => (
                <g key={n.label}>
                  <circle cx={n.x} cy={n.y} r="56" fill="#0B1628" stroke={n.color} strokeOpacity="0.6" strokeWidth="1.5" />
                  <circle cx={n.x} cy={n.y} r="64" fill="none" stroke={n.color} strokeOpacity="0.15" strokeWidth="1" />
                  <text x={n.x} y={n.y - 2} textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="600" fontFamily="PingFang SC, Microsoft YaHei, sans-serif">
                    {n.label}
                  </text>
                  <text x={n.x} y={n.y + 20} textAnchor="middle" fill={n.color} fontSize="8.5" letterSpacing="1.5" fontFamily="Arial, sans-serif">
                    {n.en}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* 六大协同能力（环绕在图下方，两列/三列网格） */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {synergy.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="card-dark card-dark-hover group h-full p-5">
                  <span className="text-[10px] font-mono text-accent/70">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-1 text-[15px] font-semibold text-white">{c.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500 group-hover:text-slate-400">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 移动端业务节点 */}
          <div className="mt-8 flex flex-col gap-3 md:hidden">
            {businesses.map((b, i) => (
              <Reveal key={b.slug} delay={i * 80}>
                <div className="card-dark flex items-center gap-4 p-4">
                  <span className="text-2xl font-bold text-accent/60">{b.index}</span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-white">{b.name}</h3>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">{b.nameEn}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 协同说明条 */}
        <Reveal className="mx-auto mt-12 max-w-3xl text-center">
          <p className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 md:text-sm">
            {synergy.capabilities.map((c) => (
              <span key={c.title} className="flex items-center gap-2">
                <Icon name="bolt" className="h-3.5 w-3.5 text-energy" />
                {c.title}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
