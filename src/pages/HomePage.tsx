import { usePageMeta } from '../hooks/usePageMeta'
import { asset } from '../utils/asset'
import { Hero } from '../components/home/Hero'
import { IntroSection } from '../components/home/IntroSection'
import { BusinessSection } from '../components/home/BusinessSection'
import { SynergySection } from '../components/home/SynergySection'
import { AdvantagesSection } from '../components/home/AdvantagesSection'
import { ProjectsSection } from '../components/home/ProjectsSection'
import { NewsSection } from '../components/home/NewsSection'
import { ContactCtaSection } from '../components/home/ContactCtaSection'

/** 首页 */
export function HomePage() {
  usePageMeta({
    title: '同日新能源 - 以产业协同，驱动绿色未来',
    description:
      '同日新能源聚焦具身智能供应链、新能源与算力中心三大业务板块，依托集团智能制造产业基础，与产业伙伴共建绿色未来。',
    image: asset('images/og-cover.svg'),
  })

  return (
    <>
      <Hero />
      <IntroSection />
      <BusinessSection />
      <SynergySection />
      <AdvantagesSection />
      <ProjectsSection />
      <NewsSection />
      <ContactCtaSection />
    </>
  )
}
