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
    '汇聚制造业相关经验与产业资源，聚焦智能装备、绿色能源与算力基础设施，推动方案、供应链与应用场景协同。',
  /** 背景）（1920×1080，public/images/hero-home.svg） */
  image: asset('images/hero-home.webp'),
  imageMobile: asset('images/hero-home-m.webp'),
  imageAlt: '工业制造车间焊接作业场景（行业场景示意）',
  sourceType: 'stock' as const,
  isIllustrative: true,
  ctas: {
    primary: { label: '了解TRGE', path: '/about' },
    secondary: { label: '联系我们', path: '/contact' },
  },
}

/**
 * 首屏数据条（数据来源已注明，发布前请逐项确认口径）
 */
export const heroStats = [
  // 「30+ 年集团制造产业积淀」涉及归属认定，经公司确认后可恢复
  { value: '3', unit: '大', label: '战略业务板块', note: '' },
  { value: '100%', unit: '', label: '客户价值导向的长期承诺' },
]

/** 模块一：企业简介概览 */
export const intro = {
  title: '同日新能源',
  titleEn: 'ABOUT TONGRI NEW ENERGY',
  paragraphs: [
    '上海同日新能源技术有限公司立足制造业场景，关注工业自动化、能源系统与算力基础设施的产业需求。公司以产业经验和供应链资源为基础，连接零部件、设备、技术与工程服务伙伴，为客户开展需求分析、方案配置和项目协同。',
    '我们重视方案的实际可行性、供应链稳定性与实施过程中的责任分工，致力于将产业经验转化为可执行的合作方案。具体产品、服务与交付范围以项目约定为准。',
    // ↑ 简介文案以公司确认口径为基础撰写，发布前请最终审定。
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
  desc: '以制造业经验与产业基础为底座，三大业务在场景理解、方案配置、供应链协同与工程落地环节协同联动。',
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
    { title: '制造能力', desc: '制造行业经验与质量要求在方案中的复用' },
    { title: '技术应用', desc: '电控、驱动与能源技术在板块间协同落地' },
    { title: '绿色能源', desc: '光储与能源管理能力赋能制造与算力基础设施场景' },
    { title: '产业运营', desc: '园区化、平台化的长期产业运营思维' },
    { title: '资源协同', desc: '渠道、资本与生态伙伴资源的组织与共享' },
  ],
}

/** 模块四：为什么选择我们 */
export const advantages = {
  title: '产业能力基础',
  titleEn: 'CAPABILITY FOUNDATION',
  items: [
    {
      icon: 'target',
      title: '工业场景理解',
      desc: '从任务、节拍、负载、空间与安全等维度理解工业现场，让方案贴合真实工艺需求。',
    },
    {
      icon: 'chip',
      title: '模块化配置思路',
      desc: '以移动底盘、执行机构、感知导航等模块化组合应对不同场景，支持灵活配置与扩展。',
    },
    {
      icon: 'network',
      title: '供应链组织能力',
      desc: '连接零部件、设备与工程服务伙伴，提供选型、匹配与替代方案的组织能力。',
    },
    {
      icon: 'check',
      title: '工程落地意识',
      desc: '重视适配验证、现场条件与责任分工，推动方案从纸面走向稳定运行。',
    },
    // ↑ 产业能力基础为业务方法与团队积累的概括，不暗示独立工厂/已完成项目/完整自研产品矩阵。
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
