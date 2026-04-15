interface LangRow {
  name: string
  percent: number
  color: string
  barW: number
  textY: number
  barY: number
}

export interface LangsVars {
  height: number
  heightInner: number
  clipPaths: string
  rows: LangRow[]
}

const langRow = ({ name, percent, color, barW, textY, barY }: LangRow) => `
  <g>
    <text x="18"  y="${textY}" font-family="'Courier New', Courier, monospace" font-size="12" font-weight="700" fill="${color}">${name}</text>
    <text x="372" y="${textY}" font-family="'Courier New', Courier, monospace" font-size="11" fill="${color}" text-anchor="end">${percent}%</text>
    <rect x="18" y="${barY}" width="354" height="8" rx="3" fill="${color}10"/>
    <rect x="18" y="${barY}" width="${barW}" height="8" rx="3" fill="${color}" opacity="0.85"/>
  </g>
`

export const langsTpl = ({
  height,
  heightInner,
  clipPaths,
  rows,
}: LangsVars) => `
<svg width="100%" viewBox="0 0 390 ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${clipPaths}
  </defs>

  <rect x="0" y="0" width="390" height="${height}" rx="6" fill="#292423"/>
  <rect x="0.5" y="0.5" width="389" height="${heightInner}" rx="6" fill="none" stroke="#51403b" stroke-width="1"/>


${rows.map(langRow).join("")}
</svg>
`
