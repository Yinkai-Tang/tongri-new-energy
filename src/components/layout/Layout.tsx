import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { SideToolbar } from './SideToolbar'

/** 全局布局：顶部导航 + 页面内容 + 页脚 + 右侧功能栏；路由切换时回到顶部 */
export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <div id="top" className="flex min-h-screen flex-col bg-navy-950">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <SideToolbar />
    </div>
  )
}
