interface StatsVars {
  COMMITS: number | string
  REPOS: number | string
  STARS: number | string
  PRS: number | string
}

export const statsTpl = ({ COMMITS, REPOS, STARS, PRS }: StatsVars) => `
<svg width="100%" viewBox="0 0 390 212" xmlns="http://www.w3.org/2000/svg">
  <defs>
  </defs>

  <rect x="0" y="0" width="390" height="212" rx="6" fill="#292423"/>
  <rect x="0.5" y="0.5" width="389" height="211" rx="6" fill="none" stroke="#51403b" stroke-width="1"/>

  <g>
    <rect x="18" y="16" width="172" height="82" rx="6" fill="#231f1e" stroke="#F0917730" stroke-width="1"/>
    <g transform="translate(24, 32) rotate(-15) scale(2.5)" fill="none" stroke="#F09177" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.18">
      <path d="M12 3v6"/><circle cx="12" cy="12" r="3"/><path d="M12 15v6"/>
    </g>
    <text x="104" y="56" font-family="'Courier New', Courier, monospace" font-size="26" font-weight="700" fill="#F09177" text-anchor="middle">${COMMITS}</text>
    <text x="104" y="88" font-family="'Courier New', Courier, monospace" font-size="13" fill="#c8b0ab" text-anchor="middle">total commits</text>
  </g>

  <g>
    <rect x="200" y="16" width="172" height="82" rx="6" fill="#231f1e" stroke="#6EDDD630" stroke-width="1"/>
    <g transform="translate(206, 32) rotate(-15) scale(2.5)" fill="none" stroke="#6EDDD6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.18">
      <path d="M10 2v8l3-3 3 3V2"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
    </g>
    <text x="286" y="56" font-family="'Courier New', Courier, monospace" font-size="26" font-weight="700" fill="#6EDDD6" text-anchor="middle">${REPOS}</text>
    <text x="286" y="88" font-family="'Courier New', Courier, monospace" font-size="13" fill="#c8b0ab" text-anchor="middle">public repos</text>
  </g>

  <g>
    <rect x="18" y="114" width="172" height="82" rx="6" fill="#231f1e" stroke="#f7d97930" stroke-width="1"/>
    <g transform="translate(24, 130) rotate(-15) scale(2.5)" fill="none" stroke="#f7d979" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.18">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
    </g>
    <text x="104" y="154" font-family="'Courier New', Courier, monospace" font-size="26" font-weight="700" fill="#f7d979" text-anchor="middle">${STARS}</text>
    <text x="104" y="186" font-family="'Courier New', Courier, monospace" font-size="13" fill="#c8b0ab" text-anchor="middle">stars earned</text>
  </g>

  <g>
    <rect x="200" y="114" width="172" height="82" rx="6" fill="#231f1e" stroke="#9DCC5730" stroke-width="1"/>
    <g transform="translate(206, 130) rotate(-15) scale(2.5)" fill="none" stroke="#9DCC57" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.18">
      <circle cx="5" cy="6" r="3"/><path d="M5 9v12"/><circle cx="19" cy="18" r="3"/><path d="m15 9-3-3 3-3"/><path d="M12 6h5a2 2 0 0 1 2 2v7"/>
    </g>
    <text x="286" y="154" font-family="'Courier New', Courier, monospace" font-size="26" font-weight="700" fill="#9DCC57" text-anchor="middle">${PRS}</text>
    <text x="286" y="186" font-family="'Courier New', Courier, monospace" font-size="13" fill="#c8b0ab" text-anchor="middle">pull requests</text>
  </g>

</svg>
`
