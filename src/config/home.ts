/**
 * ============================================================
 * 首页文案与模块数据
 * ------------------------------------------------------------
 * 除注明来源外，所有数字类展示均为可配置占位，发布前请确认。
 * ============================================================
 */

/** 首屏 Banner */
import { asset } from '../utils/asset'

export const hero = {
  /** 主标题 */
  title: '以产业协同，驱动绿色未来',
  /** 副标题 */
  subtitle:
    '聚焦具身智能供应链、新能源与算力中心，构建面向未来的产业能力。',
  /** 背景）（1920×1080，public/images/hero-home.svg） */
  image: asset('images/hero-home.webp'),
  imageMobile: asset('images/hero-home-m.webp'),
  imageAlt: '工业制造车间焊接作业场景（行业场景示意）',
  sourceType: 'stock' as const,
  isIllustrative: true,
  ctas: {
    primary: { label: '了解同日新能源', path: '/about' },
    secondary: { label: '联系我们', path: '/contact' },
  },
}

/**
 * 首屏数据条（数据来源已注明，发布前请逐项确认口径）
 */
export const heroStats = [
  {
    value: '30+',
    unit: '年',
    label: '集团制造产业积淀',
    // 来源：集团资料"深耕智能制造与新能源三十年"，指同日集团层面
  },
  { value: '3', unit: '大', label: '战略业务板块', note: '' },
  { value: '100%', unit: '', label: '客户价值导向的长期承诺' },
]

/** 模块一：企业简介概览 */
export const intro = {
  title: '同日新能源',
  titleEn: 'ABOUT TONGRI NEW ENERGY',
  paragraphs: [
    '同日新能源是同日集团面向产业升级与绿色发展设立的新业务主体。依托集团三十余年智能制造产业基础与新能源技术积淀，我们聚焦具身智能供应链、新能源与算力中心三大方向，致力于以可靠的制造能力与持续的科技创新，与产业伙伴共建绿色、高效的未来产业体系。',
    '我们相信，产业协同是驱动长期价值的核心。以制造为根基、以技术为纽带、以绿色为方向，同日新能源愿与客户和伙伴共同成长。',
    // ↑ 简介文案为占位撰写，发布前请按公司审定口径修改。
  ],
  image: asset('images/intro-company.webp'),
  sourceType: 'stock' as const,
  isIllustrative: true,
  replacementPriority: 'high' as const,
  imageAlt: '工业制造车间场景（行业场景示意，非公司实景）',
  cta: { label: '了解更多', path: '/about' },
}

/** 模块三：产业协同 / 核心能力 */
export const synergy = {
  title: '产业协同',
  titleEn: 'INDUSTRIAL SYNERGY',
  desc: '三大业务板块互为支撑，形成从制造根基到绿色运营的产业闭环。',
  /** 协同图中心能力（全部为理念型表述，非事实声明） */
  centerLabel: '同日新能源',
  centerSub: '产业协同 · 绿色发展',
  nodes: [
    { key: 'supply', label: '具身智能供应链', en: 'SUPPLY CHAIN' },
    { key: 'energy', label: '新能源', en: 'NEW ENERGY' },
    { key: 'compute', label: '算力中心', en: 'COMPUTING INFRASTRUCTURE' },
  ],
  capabilities: [
    { title: '供应链整合', desc: '内外部资源统筹，保障供应确定性与成本优化' },
    { title: '制造能力', desc: '集团制造体系与质量管理经验共享复用' },
    { title: '技术应用', desc: '电控、驱动与能源技术在板块间协同落地' },
    { title: '绿色能源', desc: '光储与能源管理能力赋能制造与算力基础设施场景' },
    { title: '产业运营', desc: '园区化、平台化的长期产业运营思维' },
    { title: '资源协同', desc: '集团资本、渠道与生态伙伴资源共享' },
  ],
}

/** 模块四：为什么选择我们 */
export const advantages = {
  title: '为什么选择我们',
  titleEn: 'WHY CHOOSE US',
  items: [
    {
      icon: 'network',
      title: '产业资源整合',
      desc: '依托集团产业布局与全球合作生态，整合上下游资源，为客户提供系统化的产业协同价值。',
    },
    {
      icon: 'factory',
      title: '技术与制造能力',
      desc: '三十余年智能制造积淀与成熟质量管理体系，为合作项目提供可靠的制造与交付保障。',
    },
    {
      icon: 'leaf',
      title: '绿色发展理念',
      desc: '以绿色能源与低碳运营为导向，让每一个产业环节都朝可持续的方向演进。',
    },
    {
      icon: 'handshake',
      title: '长期合作服务',
      desc: '以长期主义陪伴客户成长，从方案咨询到售后响应，提供全周期的服务支持。',
    },
    // ↑ 四条说明为占位撰写，可按公司审定口径修改。
  ],
}

/** 模块七：联系我们 CTA */
export const contactCta = {
  title: '携手产业伙伴，共创可持续未来',
  desc: '无论您是寻求供应链协同、绿色能源方案，还是产业园区合作，我们都期待与您深入交流。',
  primary: { label: '获取合作方案', path: '/contact' },
  secondary: { label: '联系我们', path: '/contact' },
  backgroundImage: '',
  // 背景使用纯色 + 网格纹理（见组件），如需图片可填 public/images 路径
}
