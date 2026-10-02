import { Link } from 'react-router-dom'
import { navItems, site, footerLegalLinks } from '../../config/site'
import { businesses } from '../../config/businesses'

/** 页脚：品牌信息 / 快速导航 / 业务板块 / 联系方式 / 公众号 / 法务 */
export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950">
      {/* 品牌口号条 */}
      <div className="border-b border-white/5 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900">
        <div className="container-content flex flex-col items-center gap-1 py-6 text-center">
          <p className="text-sm tracking-widest2 text-energy">{site.slogan}</p>
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">{site.sloganEn}</p>
        </div>
      </div>

      <div className="container-content grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        {/* 品牌 */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src={site.brand.logoWhite}
              alt="同日集团 TUNGRAY"
              className="h-10 w-auto object-contain"
              width={355}
              height={81}
            />
            <span className="border-l border-white/10 pl-3 text-sm font-medium text-white">
              {site.fullName}
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
            聚焦具身智能供应链、新能源与算力中心，以产业协同驱动绿色未来。
          </p>
          <div className="mt-5 flex items-center gap-3">
            <img
              src={site.wechatQr}
              alt="官方公众号二维码（占位图，待替换）"
              className="h-20 w-20 border border-white/10 bg-white p-1"
            />
            <p className="text-xs leading-relaxed text-slate-500">
              关注官方公众号
              <br />
              获取最新动态
              <br />
              <span className="text-slate-600">（二维码占位）</span>
            </p>
          </div>
        </div>

        {/* 快速导航 */}
        <nav aria-label="页脚导航">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">快速导航</h3>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm text-slate-400 transition-colors hover:text-accent-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 业务板块 */}
        <nav aria-label="业务板块导航">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">业务板块</h3>
          <ul className="mt-5 space-y-3">
            {businesses.map((b) => (
              <li key={b.slug}>
                <Link
                  to={`/business/${b.slug}`}
                  className="text-sm text-slate-400 transition-colors hover:text-accent-soft"
                >
                  {b.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/business"
                className="text-sm text-slate-500 transition-colors hover:text-accent-soft"
              >
                业务总览 →
              </Link>
            </li>
          </ul>
        </nav>

        {/* 联系方式 */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">联系我们</h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-400">
            <li className="flex gap-2.5">
              <span className="text-slate-600">电话</span>
              <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`} className="transition-colors hover:text-accent-soft">
                {site.contact.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <span className="text-slate-600">邮箱</span>
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-accent-soft">
                {site.contact.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <span className="shrink-0 text-slate-600">地址</span>
              <span>{site.contact.address}</span>
            </li>
            <li className="flex gap-2.5">
              <span className="shrink-0 text-slate-600">时间</span>
              <span>{site.contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 法务条 */}
      <div className="border-t border-white/5">
        <div className="container-content flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 md:flex-row">
          <p>{site.legal.copyright}</p>
          <div className="flex items-center gap-5">
            {footerLegalLinks.map((l) => (
              <Link key={l.path} to={l.path} className="transition-colors hover:text-slate-300">
                {l.label}
              </Link>
            ))}
            <a href="#top" className="transition-colors hover:text-slate-300" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              {site.legal.icp}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
