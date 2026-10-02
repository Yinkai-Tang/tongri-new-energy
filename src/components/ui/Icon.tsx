/**
 * 线性风格 SVG 图标集（stroke 线性图标，工业感、非拟物）
 * 在数据配置中以 icon 名称字符串引用，如 icon: 'chip'
 */
const icons: Record<string, React.ReactNode> = {
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M4 9h3M4 12h3M4 15h3M17 9h3M17 12h3M17 15h3M9 4v3M12 4v3M15 4v3M9 17v3M12 17v3M15 17v3" />
    </>
  ),
  bolt: <path d="M13 2 5 13h5l-1 9 8-11h-5l1-9z" />,
  factory: (
    <>
      <path d="M3 21V9l6 4V9l6 4V5h6v16H3z" />
      <path d="M8 17h2M13 17h2M18 17h1" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="19" r="2.2" />
      <circle cx="19" cy="19" r="2.2" />
      <path d="M11 7 6 17M13 7l5 10M7.2 19h9.6" />
    </>
  ),
  shield: <path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3zM9 12l2 2 4-4" />,
  headset: (
    <>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19v1a2 2 0 0 1-2 2h-4" />
    </>
  ),
  battery: (
    <>
      <rect x="2" y="8" width="16" height="9" rx="1.5" />
      <path d="M21 11v3" />
      <path d="M6 11v3M10 11v3" />
      <path d="M11.5 5.5 9.5 8h3l-2 2.5" />
    </>
  ),
  home: <path d="M4 11 12 4l8 7v9h-5v-5h-6v5H4v-9z" />,
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" />
    </>
  ),
  solar: (
    <>
      <path d="m5 8 1.5-4h11L19 8M5 8h14M5 8l1 8h12l1-8M9 16l-1 4M15 16l1 4M8 12h8" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M9 20h6M12 16v4M7 12l2.5-3 2.5 2 3-4 2 3" />
    </>
  ),
  park: (
    <>
      <path d="M12 3 7 10h3l-4 6h5v5h2v-5h5l-4-6h3L12 3z" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C5 9 12 4 20 4c0 9-5 15-13 15h-2z" />
      <path d="M5 19c3-5 7-8 11-10" />
    </>
  ),
  greenhouse: (
    <>
      <path d="M3 20v-8a9 6.5 0 0 1 18 0v8" />
      <path d="M12 20V7M8 20v-9M16 20v-9M3 20h18" />
    </>
  ),
  truck: (
    <>
      <rect x="2" y="7" width="12" height="9" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1" />
    </>
  ),
  handshake: (
    <>
      <path d="M2 8l4-3 6 4 6-4 4 3v7l-3 4-4-3M9 14l3 3M12 11l3 3M2 8v7l3 4 3-3" />
    </>
  ),
  phone: (
    <path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
  ),
  message: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z" />
      <path d="M9 11h6M9 14h4" />
    </>
  ),
  arrowUp: <path d="M12 20V5M6 11l6-6 6 6" />,
  arrowRight: <path d="M4 12h16M13 5l7 7-7 7" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  check: <path d="M4 12.5 9.5 18 20 6.5" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12 12 3h9v9l-9 9-9-9z" />
      <circle cx="16.5" cy="7.5" r="1.2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.5 3 14 0 18-3-4-3-14.5 0-18z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  heart: (
    <path d="M12 20.5C6 16 3 12.7 3 9.2 3 6.4 5.2 4 8 4c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.8 0 5 2.4 5 5.2 0 3.5-3 6.8-9 11.3z" />
  ),
  doc: (
    <>
      <path d="M6 2h9l5 5v15H6V2z" />
      <path d="M15 2v5h5M9 13h8M9 17h8M9 9h3" />
    </>
  ),
}

export type IconName = keyof typeof icons

export function Icon({
  name,
  className = 'h-6 w-6',
  strokeWidth = 1.6,
}: {
  name: string
  className?: string
  strokeWidth?: number
}) {
  const glyph = icons[name] ?? icons.bolt
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {glyph}
    </svg>
  )
}
