import { useSearchParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { asset } from '../utils/asset'
import { PageHeader } from '../components/layout/PageHeader'
import { ContactForm } from '../components/forms/ContactForm'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { site } from '../config/site'

/** 地图占位组件（后续可替换为高德/百度地图嵌入） */
function MapPlaceholder() {
  return (
    <div
      className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden border border-white/5 bg-navy-900"
      role="img"
      aria-label="公司位置地图（占位，待接入高德或百度地图）"
    >
      {/* 网格街道示意 */}
      <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
        <defs>
          <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0v48" fill="none" stroke="#28405F" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
        <path d="M-20 200 C 180 160, 320 260, 560 220 S 900 140, 1100 210" fill="none" stroke="#3A567E" strokeWidth="10" opacity="0.5" />
        <path d="M120 -20 C 160 140, 100 300, 180 520" fill="none" stroke="#3A567E" strokeWidth="7" opacity="0.4" />
        <path d="M700 -20 C 660 180, 760 340, 680 520" fill="none" stroke="#3A567E" strokeWidth="7" opacity="0.4" />
      </svg>
      {/* 定位点 */}
      <div className="relative flex flex-col items-center">
        <span className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute h-full w-full animate-ping rounded-full border border-accent/40" style={{ animationDuration: '2.4s' }} />
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-navy-950 text-accent-soft shadow-lg shadow-accent/20">
            <Icon name="pin" className="h-6 w-6" />
          </span>
        </span>
        <p className="mt-4 text-sm font-medium text-white">{site.name}</p>
        <p className="mt-1 text-xs text-slate-500">{site.contact.address}</p>
        <p className="mt-3 border border-dashed border-white/15 px-3 py-1 text-[11px] text-slate-600">
          地图占位组件 · 可接入高德 / 百度地图
        </p>
      </div>
    </div>
  )
}

/** 联系我们：商务合作表单 + 联系方式 + 地图占位 */
export function ContactPage() {
  usePageMeta({
    title: '联系我们',
    description: '联系同日新能源：商务合作咨询、联系方式与总部地址。',
  })

  // 支持从其他页面带合作方向跳转（如 /contact?field=新能源）
  const [params] = useSearchParams()
  const defaultField = params.get('field') ?? ''

  const contactCards = [
    { icon: 'phone', title: '联系电话', lines: [site.contact.phone, site.contact.phoneAlt] },
    { icon: 'mail', title: '商务邮箱', lines: [site.contact.email] },
    { icon: 'pin', title: '总部地址', lines: [site.contact.address] },
    { icon: 'clock', title: '工作时间', lines: [site.contact.hours] },
  ]

  return (
    <>
      <PageHeader
        en="CONTACT US"
        title="联系我们"
        desc="携手产业伙伴，共创可持续未来。期待与您的每一次交流。"
        image={asset('images/contact-banner.svg')}
        imageAlt="联系我们页头背景（占位图，可替换）"
        crumbs={[{ label: '首页', path: '/' }, { label: '联系我们' }]}
      />

      {/* 联系方式卡片 */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-content">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="card-dark card-dark-hover h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center border border-accent/30 bg-accent/5 text-accent-soft">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 text-sm font-semibold uppercase tracking-wider text-white">{c.title}</h2>
                  <div className="mt-2 space-y-1">
                    {c.lines.map((line) => (
                      <p key={line} className="break-all text-[13px] leading-relaxed text-slate-400">{line}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 表单 + 地址信息 */}
      <section className="bg-navy-900/40 py-16 md:py-20">
        <div className="container-content grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <ContactForm defaultField={defaultField} />
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={100}>
              <div className="card-dark p-7">
                <h2 className="text-base font-semibold text-white">联系方式</h2>
                <ul className="mt-5 space-y-4 text-sm text-slate-400">
                  <li className="flex gap-3">
                    <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
                    <span>
                      {site.contact.phone}
                      <br />
                      {site.contact.phoneAlt}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
                    <a href={`mailto:${site.contact.email}`} className="break-all transition-colors hover:text-accent-soft">
                      {site.contact.email}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
                    <span>
                      {site.contact.address}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
                    <span>{site.contact.hours}</span>
                  </li>
                </ul>
                <p className="mt-5 border-t border-white/5 pt-4 text-xs leading-relaxed text-slate-600">
                  以上联系信息以公司最终公布为准。
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="card-dark p-7">
                <h2 className="text-base font-semibold text-white">关注我们</h2>
                <div className="mt-5 flex items-center gap-5">
                  <img
                    src={site.wechatQr}
                    alt="官方公众号二维码（占位图，待替换）"
                    className="h-28 w-28 border border-white/10 bg-white p-1.5"
                  />
                  <p className="text-[13px] leading-relaxed text-slate-400">
                    关注官方公众号
                    <br />
                    获取最新产品与项目动态
                    <br />
                    <span className="text-slate-600">（二维码占位）</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 地图占位 */}
      <section className="bg-navy-950 pb-16 md:pb-20">
        <div className="container-content">
          <Reveal>
            <MapPlaceholder />
          </Reveal>
        </div>
      </section>
    </>
  )
}
