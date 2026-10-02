/**
 * ============================================================
 * 项目案例数据（首页展示 + 案例列表页 + 案例详情页）
 * ------------------------------------------------------------
 * 【重要】当前所有案例均为占位模板（"待补充"结构），未虚构任何
 * 客户名称、项目数据。正式上线前请逐条替换为真实项目资料。
 *
 * 可供整理案例时参考的集团资料线索（发布前需逐项确认授权）：
 * - 户用光储系统（德国，13kW 光伏 / 10kWh 储能）
 * - 工商业集装箱储能（新加坡、罗马尼亚、斯洛伐克等）
 * - 工厂光储系统（越南食品厂 250kW/600kWh、缅甸纸巾厂等）
 * - 大型集装箱光储（西非科特迪瓦 2MW/6MWh、柬埔寨 250kW/1.2MWh）
 * - 物流车队电动化改装、叉车/环卫车换电等
 * - 模块化数据中心基础设施方案（算力中心方向，状态与参数待公司确认）
 * ============================================================
 */

/** 业务板块分类（用于筛选） */
import { asset } from '../utils/asset'

export type ProjectCategory = '具身智能供应链' | '新能源' | '算力中心'

export interface ProjectDetailBlock {
  background: string
  needs: string
  solution: string
  process: string
  results: string
}

export interface Project {
  slug: string
  name: string
  category: ProjectCategory
  location: string
  /** 列表页摘要 */
  summary: string
  image: string
  imageAlt: string
  /** 详情页结构化内容（均为占位文案） */
  detail: ProjectDetailBlock
  /** 详情页配图（至少 1 张，可追加） */
  gallery: { src: string; alt: string }[]
  /** 是否为占位案例（为 true 时卡片显示"待补充"标签） */
  pending: boolean
}

export const projectCategories: ('全部' | ProjectCategory)[] = [
  '全部',
  '具身智能供应链',
  '新能源',
  '算力中心',
]

export const projects: Project[] = [
  {
    slug: 'project-placeholder-01',
    name: '项目名称待补充',
    category: '具身智能供应链',
    location: '项目地点待补充',
    summary:
      '项目简介待补充：建议描述项目背景、建设内容与合作价值，控制在 60 字以内。此处为占位示例，不会展示任何虚构的客户或数据。',
    image: asset('images/project-1.svg'),
    imageAlt: '具身智能供应链项目封面（占位图，可替换）',
    detail: {
      background: '项目背景待补充：介绍客户所属行业、面临的发展阶段与本项目的由来。',
      needs: '客户需求待补充：描述客户在产品、交付、成本或技术方面希望解决的问题。',
      solution: '解决方案待补充：描述我方提供的供应链整合 / 制造 / 集成方案与技术路线。',
      process: '实施过程待补充：描述项目关键节点、周期与协同方式。',
      results: '项目成果待补充：描述交付成果与客户价值（需客户确认后发布）。',
    },
    gallery: [
      { src: asset('images/project-1.svg'), alt: '项目图片占位 1（可替换）' },
      { src: asset('images/biz-supply-chain-scene.svg'), alt: '项目图片占位 2（可替换）' },
    ],
    pending: true,
  },
  {
    slug: 'project-placeholder-02',
    name: '项目名称待补充',
    category: '新能源',
    location: '项目地点待补充',
    summary:
      '项目简介待补充：建议描述项目类型（光伏 / 储能 / 光储一体）、规模量级与应用场景。发布前请替换为经确认的真实项目信息。',
    image: asset('images/project-2.svg'),
    imageAlt: '新能源项目封面（占位图，可替换）',
    detail: {
      background: '项目背景待补充：介绍项目所在地区、用能主体与建设缘由。',
      needs: '客户需求待补充：描述用电成本、供电保障或降碳方面的诉求。',
      solution: '解决方案待补充：描述光储配置、设备选型与并网 / 离网方案。',
      process: '实施过程待补充：描述勘察设计、施工并网与运维交接过程。',
      results: '项目成果待补充：描述运行情况与客户价值（需客户确认后发布）。',
    },
    gallery: [
      { src: asset('images/project-2.svg'), alt: '项目图片占位 1（可替换）' },
      { src: asset('images/biz-energy-scene.svg'), alt: '项目图片占位 2（可替换）' },
    ],
    pending: true,
  },
  {
    slug: 'project-placeholder-03',
    name: '模块化数据中心基础设施方案',
    category: '算力中心',
    location: '[待公司确认是否可公开]',
    summary:
      '算力中心 / 数据中心基础设施方向的模块化数据中心方案能力展示。项目状态、系统配置与技术参数均为占位字段，待公司确认后发布。',
    image: asset('images/project-3.svg'),
    imageAlt: '模块化数据中心基础设施方案封面（占位图，可替换）',
    detail: {
      background: '[待补充：项目背景与建设目标，需公司确认是否可公开]',
      needs: '[待补充：算力规模、部署环境与可靠性要求]',
      solution: '[待补充：方案范围与系统构成（模块化机房、供配电、制冷、网络与安全）]',
      process: '[待补充：项目阶段与关键节点（方案设计 / 实施进展）]',
      results: '[待补充：实施成果。项目状态待确认：规划方案 / 设计方案 / 已签约 / 建设中 / 已交付]',
    },
    gallery: [
      { src: asset('images/project-3.svg'), alt: '模块化数据中心方案图片占位 1（可替换）' },
      { src: asset('images/biz-computing-scene.svg'), alt: '模块化数据中心方案图片占位 2（可替换）' },
    ],
    pending: true,
  },
  {
    slug: 'project-placeholder-04',
    name: '项目名称待补充',
    category: '新能源',
    location: '项目地点待补充',
    summary:
      '项目简介待补充：建议描述项目类型、规模量级与合作模式（投资 / EPC / 设备供应），发布前替换为真实项目。',
    image: asset('images/project-4.svg'),
    imageAlt: '综合产业项目封面（占位图，可替换）',
    detail: {
      background: '项目背景待补充：介绍项目主体与合作模式。',
      needs: '客户需求待补充：描述客户核心诉求与约束条件。',
      solution: '解决方案待补充：描述整体方案构成与关键设备。',
      process: '实施过程待补充：描述项目里程碑与交付过程。',
      results: '项目成果待补充：描述项目价值（需确认后发布）。',
    },
    gallery: [
      { src: asset('images/project-4.svg'), alt: '项目图片占位 1（可替换）' },
      { src: asset('images/biz-energy-hero.svg'), alt: '项目图片占位 2（可替换）' },
    ],
    pending: true,
  },
]

/** 按 slug 获取项目 */
export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug)
