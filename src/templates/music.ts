export interface MusicVars {
  title: string
  artist: string
  coverBase64: string | null
  genre: string
  year: string
  duration: string
}

export const musicTpl = ({
  title,
  artist,
  coverBase64,
  genre,
  year,
  duration,
}: MusicVars) => `\
<svg width="800" viewBox="0 0 800 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .m-t { font-family:'Courier New',Courier,monospace; font-size:18px; font-weight:bold; fill:#F09177; }
      .m-a { font-family:'Courier New',Courier,monospace; font-size:16px; fill:#c8b0ab; }
      .m-m { font-family:'Courier New',Courier,monospace; font-size:11px; fill:#c8b0ab; }
      .m-c { font-family:'SF Mono','Fira Code','Consolas',monospace; font-size:11px; }
    </style>
    <clipPath id="mc"><rect x="20" y="20" width="120" height="120" rx="5"/></clipPath>
    <clipPath id="card"><rect width="800" height="160" rx="6"/></clipPath>
    <clipPath id="lc"><rect x="220" y="0" width="325" height="160"/></clipPath>
    <radialGradient id="vs" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="white" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="black" stop-opacity="0"/>
    </radialGradient>${
      !coverBase64
        ? `
    <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2d1f2a"/>
      <stop offset="60%" stop-color="#1a2d3a"/>
      <stop offset="100%" stop-color="#2a1a3a"/>
    </linearGradient>`
        : ""
    }
  </defs>
  <rect width="800" height="160" rx="6" fill="#292423"/>
  <g clip-path="url(#card)">
    <rect x="560" y="0" width="240" height="160" fill="#231f1e"/>
    <line x1="560" y1="0" x2="560" y2="160" stroke="#3a3534" stroke-width="0.5"/>
  </g>
  <g>
    <animateTransform attributeName="transform" type="rotate"
      from="0 140 80" to="360 140 80" dur="4s" repeatCount="indefinite"/>
    <circle cx="140" cy="80" r="60" fill="#0e0c0b"/>
    <circle cx="140" cy="80" r="59.5" fill="none" stroke="#252321" stroke-width="0.5"/>
    <circle cx="140" cy="80" r="55" fill="none" stroke="#191614" stroke-width="0.5"/>
    <circle cx="140" cy="80" r="51" fill="none" stroke="#1e1b18" stroke-width="0.5"/>
    <circle cx="140" cy="80" r="47" fill="none" stroke="#191614" stroke-width="0.5"/>
    <circle cx="140" cy="80" r="43" fill="none" stroke="#1e1b18" stroke-width="0.5"/>
    <circle cx="140" cy="80" r="39" fill="none" stroke="#191614" stroke-width="0.5"/>
    <circle cx="140" cy="80" r="35" fill="none" stroke="#1e1b18" stroke-width="0.5"/>
    <circle cx="140" cy="80" r="31" fill="none" stroke="#191614" stroke-width="0.5"/>
    <circle cx="140" cy="80" r="27" fill="none" stroke="#1e1b18" stroke-width="0.5"/>
    <circle cx="140" cy="80" r="60" fill="url(#vs)"/>
    <circle cx="140" cy="80" r="20" fill="#2d2b2a"/>
    <circle cx="140" cy="80" r="19.5" fill="none" stroke="#3a3534" stroke-width="0.5"/>
    <circle cx="140" cy="80" r="13" fill="#3a3534"/>
    <circle cx="140" cy="80" r="3.5" fill="#0e0c0b"/>
  </g>
  <rect x="20" y="20" width="120" height="120" rx="5" fill="${coverBase64 ? "#1a1817" : "url(#cg)"}"/>
  ${
    coverBase64
      ? `<image x="20" y="20" width="120" height="120" clip-path="url(#mc)" href="${coverBase64}" preserveAspectRatio="xMidYMid slice"/>`
      : `<text x="80" y="93" font-size="42" text-anchor="middle" fill="#c8b0ab" opacity="0.3">&#9835;</text>`
  }
  <rect x="220" y="35" width="3" height="5" rx="1" fill="#6EDDD6" opacity="0.9">
    <animate attributeName="height" values="5;11;5" dur="0.8s" repeatCount="indefinite"/>
    <animate attributeName="y" values="35;29;35" dur="0.8s" repeatCount="indefinite"/>
  </rect>
  <rect x="227" y="32" width="3" height="8" rx="1" fill="#6EDDD6" opacity="0.9">
    <animate attributeName="height" values="8;4;8" dur="0.9s" repeatCount="indefinite"/>
    <animate attributeName="y" values="32;36;32" dur="0.9s" repeatCount="indefinite"/>
  </rect>
  <rect x="234" y="34" width="3" height="6" rx="1" fill="#6EDDD6" opacity="0.9">
    <animate attributeName="height" values="6;12;6" dur="0.7s" repeatCount="indefinite"/>
    <animate attributeName="y" values="34;28;34" dur="0.7s" repeatCount="indefinite"/>
  </rect>
  <text class="m-m" x="243" y="40" opacity="0.8">// now spinning</text>
  <g clip-path="url(#lc)">
    <text class="m-t" x="220" y="67">${title}</text>
    <text class="m-a" x="220" y="86">${artist}</text>
    <rect x="220" y="103" width="158" height="26" rx="4" fill="#292423" stroke="#F09177" stroke-width="1.5"/>
    <text x="289" y="120" font-family="'SF Mono','Fira Code','Consolas',monospace" font-size="12" text-anchor="middle" fill="#F09177" font-weight="800">Listen my fav part</text>
    <g transform="translate(359, 111) scale(0.46)" fill="none" stroke="#F09177" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
      <path d="m21 3-9 9"/>
      <path d="M15 3h6v6"/>
    </g>
  </g>
  <rect x="561" y="0" width="140" height="24" fill="#292423"/>
  <rect x="561" y="0" width="140" height="2" fill="#F09177"/>
  <line x1="701" y1="0" x2="701" y2="24" stroke="#3a3534" stroke-width="0.5"/>
  <line x1="561" y1="24" x2="800" y2="24" stroke="#3a3534" stroke-width="0.5"/>
  <text x="568" y="17" font-size="10" fill="#F09177" opacity="0.85">&#9835;</text>
  <text x="584" y="17" font-family="'SF Mono','Fira Code','Consolas',monospace" font-size="11" fill="#c8b0ab">musicplayer.ts</text>
  <text x="685" y="17" font-family="'SF Mono','Fira Code','Consolas',monospace" font-size="16" fill="#c8b0ab">&#215;</text>
  <text class="m-c" x="586" y="55"><tspan fill="#c792ea">const </tspan><tspan fill="#ffcb6b">track</tspan><tspan fill="#89ddff"> = {</tspan></text>
  <text class="m-c" y="72"><tspan x="600" fill="#f07178">genre</tspan><tspan fill="#89ddff">: </tspan><tspan fill="#c3e88d">"${genre}"</tspan><tspan fill="#89ddff">,</tspan></text>
  <text class="m-c" y="89"><tspan x="600" fill="#f07178">year</tspan><tspan fill="#89ddff">: </tspan><tspan fill="#f78c6c">${year}</tspan><tspan fill="#89ddff">,</tspan></text>
  <text class="m-c" y="106"><tspan x="600" fill="#f07178">duration</tspan><tspan fill="#89ddff">: </tspan><tspan fill="#c3e88d">"${duration}"</tspan><tspan fill="#89ddff">,</tspan></text>
  <text class="m-c" x="586" y="123" fill="#89ddff">}</text>
<rect x="0.5" y="0.5" width="799" height="159" rx="6" fill="none" stroke="#51403b" stroke-width="1"/>
</svg>`
