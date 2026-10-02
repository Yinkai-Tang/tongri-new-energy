import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { site } from '../config/site'

/** 法律声明 / 隐私政策（占位模板，正式文本请由公司法务审定后替换） */
export function LegalPage({ type }: { type: 'terms' | 'privacy' }) {
  const isTerms = type === 'terms'
  usePageMeta({
    title: isTerms ? '法律声明' : '隐私政策',
    description: isTerms
      ? `${site.name}网站法律声明（占位模板）。`
      : `${site.name}网站隐私政策（占位模板）。`,
  })

  const terms = [
    {
      title: '知识产权',
      body: '本网站所载的全部内容（包括但不限于文字、图片、版式、标志与数据）的知识产权归同日新能源及相关权利人所有，未经书面许可，任何单位或个人不得以任何方式复制、转载或传播。【占位条款，请由法务审定】',
    },
    {
      title: '信息真实性',
      body: '本网站展示的业务介绍与案例信息仅供参考，不构成任何形式的承诺或要约。具体合作内容以双方签署的正式协议为准。【占位条款，请由法务审定】',
    },
    {
      title: '免责声明',
      body: '本网站可能包含指向第三方网站的链接，我们对其内容不承担任何责任。因使用本网站信息而产生的任何直接或间接损失，本公司不承担赔偿责任。【占位条款，请由法务审定】',
    },
  ]

  const privacy = [
    {
      title: '信息收集',
      body: '当您通过本网站提交合作咨询或留言时，我们会收集您主动填写的姓名、公司名称、联系电话、邮箱及留言内容，仅用于与您取得联系并响应您的请求。【占位条款，请由法务审定】',
    },
    {
      title: '信息使用与保护',
      body: '我们承诺对收集的信息采取合理的保密与安全措施，不会向任何无关第三方出售或泄露您的个人信息，法律法规另有规定的除外。【占位条款，请由法务审定】',
    },
    {
      title: '您的权利',
      body: '您有权查询、更正或删除我们持有的您的个人信息。如需行使上述权利，请通过商务邮箱与我们联系。【占位条款，请由法务审定】',
    },
  ]

  const items = isTerms ? terms : privacy

  return (
    <>
      <PageHeader
        en={isTerms ? 'LEGAL' : 'PRIVACY'}
        title={isTerms ? '法律声明' : '隐私政策'}
        desc="本页为占位模板，正式文本请由公司法务审定后替换。"
        image="/images/about-park.svg"
        imageAlt="页头背景（占位图，可替换）"
        crumbs={[{ label: '首页', path: '/' }, { label: isTerms ? '法律声明' : '隐私政策' }]}
      />
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-content max-w-3xl space-y-8">
          <Reveal>
            <p className="text-xs text-slate-500">最近更新：2026-09-27（占位日期）</p>
          </Reveal>
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <section className="card-dark p-7">
                <h2 className="text-lg font-semibold text-white">{i + 1}. {item.title}</h2>
                <p className="mt-3 text-sm leading-loose text-slate-400">{item.body}</p>
              </section>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
