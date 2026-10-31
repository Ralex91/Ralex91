import { statsTpl } from "@/templates/stats"
import type { StatsData } from "@/utils/github/types"

export const generateStatsSVG = (stats: StatsData): string => {
  return statsTpl({
    tiles: [
      {
        value: stats.commits,
        delta: stats.monthly.commits,
        label: "Commits",
        color: "#F09177",
        icon: `<path d="M12 3v6"/><circle cx="12" cy="12" r="3"/><path d="M12 15v6"/>`,
      },
      {
        value: stats.repos,
        delta: stats.monthly.repos,
        label: "Repos",
        color: "#6EDDD6",
        icon: `<path d="M10 2v8l3-3 3 3V2"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>`,
      },
      {
        value: stats.stars,
        delta: stats.monthly.stars,
        label: "Stars",
        color: "#f7d979",
        icon: `<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>`,
      },
      {
        value: stats.prs,
        delta: stats.monthly.prs,
        label: "Pull Requests",
        color: "#9DCC57",
        icon: `<circle cx="5" cy="6" r="3"/><path d="M5 9v12"/><circle cx="19" cy="18" r="3"/><path d="m15 9-3-3 3-3"/><path d="M12 6h5a2 2 0 0 1 2 2v7"/>`,
      },
    ],
  })
}
