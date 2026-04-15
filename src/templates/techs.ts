export interface TechsVars {
  size: { w: number; h: number }
  assets: { defs: string[]; symbols: string[] }
  rows: { dist: number; dur: string; track: string }[]
}

export const techsTpl = ({ size, assets, rows }: TechsVars) => `
<svg width="${size.w}" viewBox="0 0 ${size.w} ${size.h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @keyframes sl { from { transform: translateX(0) } to { transform: translateX(-${rows[0].dist}px) } }
      @keyframes sr { from { transform: translateX(-${rows[1].dist}px) } to { transform: translateX(0) } }
      .tl { animation: sl ${rows[0].dur}s linear infinite }
      .tr { animation: sr ${rows[1].dur}s linear infinite }
      .cl { font-family: 'Courier New', Courier, monospace; font-size: 10px; fill: #c8b0ab; text-anchor: middle }
    </style>
    ${assets.defs.join("\n    ")}
    ${assets.symbols.join("\n    ")}
    <clipPath id="clip"><rect width="${size.w}" height="${size.h}" rx="6"/></clipPath>
    <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%"   stop-color="white" stop-opacity="0"/>
      <stop offset="8%"   stop-color="white" stop-opacity="1"/>
      <stop offset="92%"  stop-color="white" stop-opacity="1"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <mask id="fadeMask">
      <rect width="${size.w}" height="${size.h}" fill="url(#fade)"/>
    </mask>
  </defs>
  <rect width="${size.w}" height="${size.h}" rx="6" fill="#292423"/>
  <g clip-path="url(#clip)" mask="url(#fadeMask)">
    ${rows[0].track}
    ${rows[1].track}
  </g>
  <rect x="0.5" y="0.5" width="${size.w - 1}" height="${size.h - 1}" rx="6" fill="none" stroke="#51403b" stroke-width="1"/>
</svg>
`
