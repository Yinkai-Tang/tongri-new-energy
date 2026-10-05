/**
 * ============================================================
 * 三大业务板块数据（首页展示 + 业务总览页 + 业务详情页）
 * ------------------------------------------------------------
 * 修改本文件即可更新三个业务详情页的全部内容。
 * 内容框架依据：同日集团宣传资料 + 需求文档，具体参数、
 * 客户、产品名称均为【待补充/待确认】状态，发布前请核实。
 * ============================================================
 */

import { asset } from '../utils/asset'

export interface Capability {
  title: string
  desc: string
  icon: string // 见 src/components/ui/Icon.tsx 中的图标名
}

export interface ProcessStep {
  title: string
  desc: string
}

export interface ScenarioItem {
  title: string
  desc: string
}

/** 应用场景两级：当前优先场景 / 拓展方向（拓展≠已交付案例） */
export interface ScenarioGroups {
  current: ScenarioItem[]
  expansion?: ScenarioItem[]
  expansionLabel?: string
}

/** 能力建设方向：正在逐步完善的协同机制（非已具备能力） */
export interface CapabilityBuilding {
  title: string
  en: string
  desc: string
  items: { title: string; desc: string }[]
}

/** 产品与应用规划：未来扩展方向（非已上线产品） */
export interface Planning {
  title: string
  en: string
  desc: string
  items: { title: string; desc: string }[]
}

export interface Business {
  /** URL 路径标识 */
  slug: string
  /** 中文标题 */
  name: string
  /** 英文标题 */
  nameEn: string
  /** 一句话定位 */
  tagline: string
  /** 首页/总览卡片摘要 */
  summary: string
  /** 序号（01/02/03） */
  index: string
  /** 卡片与页头配图（public/images 下） */
  image: string
  imageAlt: string
  /** 素材来源标记：stock = 图库行业场景示意（非公司实景），公司素材到位后逐张替换 */
  sourceType?: 'stock' | 'company'
  isIllustrative?: boolean
  replacementPriority?: 'high' | 'medium' | 'low'
  /** 详情页主题色：accent = 电光蓝，energy = 绿色 */
  theme: 'accent' | 'energy'
  /** 板块定位说明（详情页首段） */
  positioning: string[]
  /** 服务/能力范围 */
  capabilities: Capability[]
  /** 应用场景 */
  /** 业务/协同流程 */
  processTitle: string
  process: ProcessStep[]
  /** 能力区标题（可选，默认"服务与能力范围"） */
  capabilitiesTitle?: string
  /** 应用场景（两级：current 当前优先 / expansion 拓展方向） */
  scenarios: ScenarioGroups
  /** 能力建设方向（可选，正在完善的协同机制） */
  capabilityBuilding?: CapabilityBuilding
  /** 产品与应用规划（可选，未来扩展方向） */
  planning?: Planning
  /** 合作咨询引导语 */
  ctaText: string
}

export const businesses: Business[] = [
  /* ================= 板块一：具身智能供应链 ================= */
  {
    slug: 'embodied-intelligence-supply-chain',
    name: '具身智能供应链',
    nameEn: 'Embodied Intelligence Supply Chain',
    tagline: '以工业场景为起点的模块化方案与供应链协同',
    summary:
      '以工业场景和工艺适配为起点，围绕移动底盘、执行机构、感知导航等模块，开展核心零部件与系统的方案配置、供应链协同与项目落地支持。',
    index: '01',
    image: asset('images/biz-supply-chain-hero.webp'),
    sourceType: 'stock' as const,
    isIllustrative: true,
    replacementPriority: 'medium' as const,
    imageAlt: '精密加工车间场景（行业场景示意，非公司实景）',
    theme: 'accent',
    positioning: [
      '具身智能的产业化，离不开对工业场景和工艺需求的深刻理解，以及可靠、柔性的供应链体系。本板块以工业场景和工艺适配为起点，聚焦机器人及自动化装备的核心零部件供应、方案配置与供应链协同服务。',
      '我们不单纯是贸易型供应商，而是以「制造能力 + 供应链整合 + 质量管理」为核心，为客户提供从选型、集成、制造到交付售后的全链条服务，助力客户缩短产品落地周期、保障品质与交付确定性。',
      '注：本板块具体产品型号、技术参数与合作客户均为待补充内容，以下能力框架供合作洽谈参考。',
    ],
    capabilitiesTitle: '从工艺需求到工程落地',
    capabilities: [
      {
        title: '工业场景与工艺分析',
        desc: '理解任务、节拍、负载、空间与安全等工况要求，明确方案边界与目标。',
        icon: 'target',
      },
      {
        title: '模块化方案配置',
        desc: '以移动底盘、执行机构、感知导航等模块的组合思路，匹配不同工艺需求。',
        icon: 'chip',
      },
      {
        title: '设备与零部件选型',
        desc: '基于工况与预算开展设备、零部件选型与参数匹配，兼顾性能与可维护性。',
        icon: 'gear',
      },
      {
        title: '供应链组织与协同',
        desc: '组织合作伙伴选型与资源匹配，提供替代方案，保障供应稳定。',
        icon: 'network',
      },
      {
        title: '适配验证与项目协调',
        desc: '推动方案适配验证，协调现场条件、实施安排与各方责任分工。',
        icon: 'check',
      },
      {
        title: '实施协调与合作支持',
        desc: '协调实施过程与合作伙伴分工，提供项目周期内的协作与支持（责任范围以项目约定为准）。',
        icon: 'headset',
      },
    ],
    scenarios: {
      current: [
        { title: '工业搬运与物料配送', desc: '面向车间与产线环节的物料搬运与配送任务。' },
        { title: '上下料与装配辅助', desc: '面向加工与装配环节的上下料与装配辅助作业。' },
        { title: '检测与柔性工位', desc: '面向质量检测与柔性工位的自动化配套需求。' },
        { title: '工业机器人与自动化设备配套', desc: '面向工业机器人与自动化设备企业的零部件供应与产线配套。' },
      ],
      expansion: [
        { title: '服务机器人', desc: '面向商用与家用服务机器人方向的拓展。' },
        { title: '具身智能终端', desc: '面向具身智能终端产品方向的拓展。' },
        { title: '跨场景模块化智能装备应用', desc: '探索模块化智能装备在更多工业场景的应用。' },
      ],
      expansionLabel: '拓展方向',
    },
    capabilityBuilding: {
      title: '从方案配置到交付服务的能力建设',
      en: 'CAPABILITY BUILDING',
      desc: '围绕工业智能装备的规模化应用需求，同日新能源将逐步完善模块选型、生产组织、质量协同、交付部署与服务支持等环节，与设备、制造和工程合作伙伴共同构建更完整的项目服务体系。',
      items: [
        { title: '生产组织', desc: '围绕项目需求，协同制造与设备伙伴开展生产计划、资源匹配和进度协调。' },
        { title: '批量制造协同', desc: '面向经验证的产品与客户需求，探索可复制的生产组织与批量供应机制。' },
        { title: '质量协同', desc: '在供应商选择、模块适配和项目实施环节，逐步完善质量要求与验证机制。' },
        { title: '交付部署协同', desc: '结合项目条件，与合作伙伴明确设备配置、安装调试和验收安排。' },
        { title: '运维协作', desc: '根据项目责任分工，探索远程支持、现场响应和持续优化的合作机制。' },
        { title: '售后服务网络建设', desc: '逐步完善与设备厂商、工程伙伴及区域服务资源的协同机制。' },
      ],
    },
    processTitle: '供应链协同流程',
    process: [
      { title: '需求沟通', desc: '理解客户产品定义、批量计划与供应链诉求' },
      { title: '方案与选型', desc: '输出零部件选型、供应组合与成本方案' },
      { title: '样品与验证', desc: '样品测试、小批量验证与质量确认' },
      { title: '生产组织', desc: '协调制造与合作资源，组织生产与全检' },
      { title: '交付部署', desc: '按计划批量交付，支持现场集成' },
      { title: '运维协作', desc: '持续供货保障与协作响应' },
    ],
    ctaText: '如需了解具身智能供应链合作模式与产品目录，欢迎与我们联系。',
  },

  /* ================= 板块二：新能源 ================= */
  {
    slug: 'new-energy',
    name: '新能源',
    nameEn: 'New Energy',
    tagline: '从动力电池到储能系统的绿色能源解决方案',
    summary:
      '围绕动力电池、储能系统与能源管理等方向，提供覆盖户用、工商业与园区的绿色能源产品与解决方案。',
    index: '02',
    image: asset('images/biz-energy-hero.webp'),
    sourceType: 'stock' as const,
    isIllustrative: true,
    replacementPriority: 'medium' as const,
    imageAlt: '风电场日落场景（行业场景示意，非公司实景）',
    theme: 'energy',
    positioning: [
      '新能源板块围绕动力电池、储能系统集成与能源管理等方向，为户用、工商业与园区客户提供安全、高效的绿色能源产品与解决方案（相关产品与制造归属待公司确认）。',
      '我们的业务覆盖动力电池系统、户用储能、工商业储能、光伏储能充电一体化与智慧能源管理平台，逐步构建「发 — 储 — 充 — 用」一体化的能源服务能力，助力客户降本增效与绿色转型。',
      '注：以下业务方向与产品系列为框架性介绍，具体设备型号、项目规模与认证资质以公司确认后的正式发布资料为准。',
    ],
    capabilities: [
      {
        title: '动力电池系统',
        desc: '面向新能源车辆与工程设备的动力电池包定制方案（磷酸铁锂体系，具体规格待补充）。',
        icon: 'battery',
      },
      {
        title: '户用储能',
        desc: '壁挂式、堆叠式低压/高压户用储能系列，支持容量灵活扩展（产品系列待补充）。',
        icon: 'home',
      },
      {
        title: '工商业储能',
        desc: '面向工商业场景的柜式/集装箱式储能系统，支持光储协同与并离网切换（规格待补充）。',
        icon: 'building',
      },
      {
        title: '光伏储能充电一体化',
        desc: '集光伏发电、储能与充电模块于一体的离网一体化系统，即装即用（产品参数待补充）。',
        icon: 'solar',
      },
      {
        title: '智慧能源管理',
        desc: '设备级 EMS、微网级 EMS 与云平台监控运维体系，实现发电、储能、用电的智能调度。',
        icon: 'monitor',
      },
      {
        title: '绿色园区与节能改造',
        desc: '面向园区与既有设施的绿色能源改造方案（光储充、源网荷储一体化，方案框架待补充）。',
        icon: 'park',
      },
    ],
    scenarios: {
      current: [
        { title: '工商业', desc: '工厂、商业体屋顶光伏与储能配置，削峰填谷与绿电消费。' },
        { title: '产业园区', desc: '源网荷储一体化园区、光储充停车场与绿色微电网。' },
        { title: '农业设施', desc: '温室、灌溉与农产品加工设施的绿电供应与储能保障。' },
        { title: '家庭与离网场景', desc: '家庭光储系统与偏远地区、户外作业的离网供电。' },
      ],
    },
    planning: {
      title: '面向多元场景的能源产品与系统规划',
      en: 'PRODUCT & SCENARIO PLANNING',
      desc: '同日新能源围绕不同场景的用能需求，持续研究储能系统、能源管理与配套设备的方案组合，并推进相关产品和服务方向的验证。',
      items: [
        { title: '户用储能', desc: '关注家庭侧储能设备配置与用能管理需求。' },
        { title: '家庭与离网场景', desc: '关注离网供电、备用电源及独立能源系统的应用需求。' },
        { title: '农业设施', desc: '关注温室、农业设备及农产品加工设施中的供电与储能需求。' },
        { title: '光储充一体化', desc: '探索光伏、储能与充电设施的协同配置方案。' },
        { title: '智慧 EMS 平台', desc: '规划能源管理系统（EMS，Energy Management System）的监测、调度及数据管理能力。' },
      ],
    },
    processTitle: '新能源项目解决方案流程',
    process: [
      { title: '需求诊断', desc: '用能分析、场地勘察与可行性评估' },
      { title: '方案设计', desc: '光储容量配置、投资模型与并网方案' },
      { title: '设备与集成', desc: '核心设备选型、系统集成与供应链保障' },
      { title: '工程实施', desc: '施工组织、安装调试与并网验收' },
      { title: '智能运维', desc: '云平台监控、故障预警与效率优化' },
    ],
    ctaText: '如需获取光储项目方案或产品资料，欢迎与我们联系。',
  },

  /* ================= 板块三：算力中心 ================= */
  {
    slug: 'computing-infrastructure',
    name: '算力中心',
    nameEn: 'Computing Infrastructure',
    tagline: '面向 AI 与高性能计算需求的基础设施解决方案',
    summary:
      '面向 AI 算力、高性能计算与企业数字化需求，提供模块化数据中心及算力基础设施解决方案，连接算力需求与基础设施能力。',
    index: '03',
    image: asset('images/biz-computing-hero.webp'),
    sourceType: 'stock' as const,
    isIllustrative: true,
    replacementPriority: 'medium' as const,
    imageAlt: '数据中心机房布线场景（行业场景示意，非公司实景）',
    theme: 'accent',
    positioning: [
      '算力中心不仅是服务器和机柜的集合，还需要稳定的供配电系统、高效的制冷系统、可靠的网络架构、安全体系和持续运维能力。同日新能源围绕算力基础设施建设需求，关注模块化数据中心、供配电、制冷、网络与安全等关键环节。',
      '围绕数据中心及算力基础设施项目，公司可参与方案设计、系统集成、设备配置和项目交付等环节的协同，为 AI 算力、高性能计算及企业数字化场景提供可扩展的基础设施方案，具体业务范围与责任分工以实际项目和公司确认信息为准。',
      '注：本板块能力框架供合作洽谈参考，项目案例与技术参数待公司确认后发布。',
    ],
    capabilities: [
      {
        title: '模块化数据中心',
        desc: '围绕模块化、可扩展和快速部署需求，提供数据中心基础设施规划与方案设计。',
        icon: 'server',
      },
      {
        title: '供配电与 UPS',
        desc: '关注数据中心供配电、UPS、ATS 及冗余架构，为关键 IT 负载提供稳定的电力保障。',
        icon: 'battery',
      },
      {
        title: '制冷与能效',
        desc: '围绕机房制冷、环境控制与能效优化，支持算力基础设施稳定运行。',
        icon: 'cooling',
      },
      {
        title: '网络基础设施',
        desc: '根据项目需求规划网络基础设施，支持数据中心内部连接、扩展与系统集成。',
        icon: 'network',
      },
      {
        title: '安全与监控',
        desc: '关注机房安全、运行监控、环境监测和基础设施保障体系。',
        icon: 'shield',
      },
      {
        title: '项目集成与交付',
        desc: '围绕需求分析、方案设计、设备配置、系统集成、测试交付与后续支持建立项目流程。',
        icon: 'gear',
      },
    ],
    scenarios: {
      current: [
        { title: 'AI 训练与推理基础设施', desc: '面向 AI 算力场景的基础设施规划与建设合作方向（目标场景说明待补充）。' },
        { title: '高性能计算（HPC）', desc: '面向科研与工程计算等高密度算力场景的基础设施方案（场景说明待补充）。' },
        { title: '企业私有云与数据中心扩容', desc: '支持企业数字化升级的数据中心新建与扩容需求（场景说明待补充）。' },
        { title: '园区及行业数字化基础设施', desc: '面向园区与行业客户的算力基础设施配套（场景说明待补充）。' },
        { title: '模块化、边缘化与快速部署场景', desc: '以模块化架构支持应急、临时与边缘侧的快速部署需求（场景说明待补充）。' },
      ],
    },
    processTitle: '从需求到交付的协同流程',
    process: [
      { title: '需求评估', desc: '了解算力规模、部署环境、可靠性与扩展需求' },
      { title: '方案设计', desc: '围绕机房形态、供配电、制冷、网络和安全进行系统设计' },
      { title: '设备选型', desc: '根据项目需求确定服务器、机柜、UPS、制冷和配套设备方案' },
      { title: '系统集成', desc: '协调基础设施、设备、网络和环境控制系统之间的协同' },
      { title: '测试交付', desc: '完成系统调试、运行测试和项目交付' },
      { title: '运维支持', desc: '根据项目约定提供运行保障、维护和后续技术支持' },
    ],
    ctaText: '如需了解算力中心板块的合作方向与方案能力，欢迎与我们联系。',
  },
]

/** 按 slug 获取业务板块 */
export const getBusiness = (slug: string) =>
  businesses.find((b) => b.slug === slug)
