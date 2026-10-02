import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../../config/site'
import { BrandLogo } from '../ui/SectionTitle'
import { Icon } from '../ui/Icon'

/**
 * 顶部导航：
 * - 首页顶部透明，滚动后切换为玻璃质感深色导航
 * - 桌面端"业务板块"悬停下拉；移动端汉堡菜单 + 手风琴
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 路由变化时收起移动端菜单
  useEffect(() => {
    setMobileOpen(false)
    setExpanded(null)
  }, [location.pathname])

  const solid = scrolled || !isHome

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'glass-nav py-0' : 'bg-transparent py-1'
      }`}
    >
      <div className="container-content flex h-[72px] items-center justify-between">
        <BrandLogo />

        {/* 桌面端导航 */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="主导航">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-4 py-2.5 text-[15px] transition-colors ${
                      isActive ? 'text-accent-soft' : 'text-slate-200 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                  <Icon name="chevronDown" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </NavLink>
                {/* 下拉菜单 */}
                <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <div className="border border-white/10 bg-navy-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-md">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="group/item block border-l-2 border-transparent px-4 py-3 transition-colors hover:border-accent hover:bg-white/5"
                      >
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="text-[15px] font-medium text-slate-100 group-hover/item:text-white">
                            {child.label}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-slate-500">
                            {child.en}
                          </span>
                        </span>
                        <span className="mt-1 block text-xs text-slate-500">{child.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2.5 text-[15px] transition-colors ${
                    isActive ? 'text-accent-soft' : 'text-slate-200 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute inset-x-4 bottom-1 h-[2px] origin-left bg-accent transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            )
          )}
          <Link
            to="/contact"
            className="ml-4 border border-accent/50 bg-accent/10 px-5 py-2 text-sm text-accent-soft transition-all duration-300 hover:bg-accent hover:text-white"
          >
            商务合作
          </Link>
        </nav>

        {/* 移动端汉堡按钮 */}
        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={`h-[1.5px] w-6 bg-white transition-all duration-300 ${mobileOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`h-[1.5px] w-6 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`h-[1.5px] w-6 bg-white transition-all duration-300 ${mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* 移动端菜单 */}
      <div
        className={`glass-nav overflow-hidden transition-[max-height] duration-500 lg:hidden ${
          mobileOpen ? 'max-h-[calc(100vh-72px)] overflow-y-auto' : 'max-h-0'
        }`}
      >
        <nav className="container-content flex flex-col py-3" aria-label="移动端导航">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-white/5 last:border-0">
              {item.children ? (
                <>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-[15px] text-slate-100"
                    onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                    aria-expanded={expanded === item.label}
                  >
                    {item.label}
                    <Icon
                      name="chevronDown"
                      className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
                        expanded === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height] duration-400 ${
                      expanded === item.label ? 'max-h-64' : 'max-h-0'
                    }`}
                  >
                    <Link to={item.path} className="block py-2.5 pl-3 text-sm text-slate-400">
                      板块总览
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block py-2.5 pl-3 text-sm text-slate-300"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `block py-4 text-[15px] ${isActive ? 'text-accent-soft' : 'text-slate-100'}`
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  )
}
