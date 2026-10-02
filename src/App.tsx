import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { BusinessPage } from './pages/BusinessPage'
import { BusinessDetailPage } from './pages/BusinessDetailPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { NewsPage } from './pages/NewsPage'
import { NewsDetailPage } from './pages/NewsDetailPage'
import { ContactPage } from './pages/ContactPage'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="business" element={<BusinessPage />} />
        <Route path="business/:slug" element={<BusinessDetailPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:slug" element={<NewsDetailPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="legal" element={<LegalPage type="terms" />} />
        <Route path="privacy" element={<LegalPage type="privacy" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
