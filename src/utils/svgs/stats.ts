import { statsTpl } from "@/templates/stats"
import type { StatsData } from "@/utils/github/types"

export const generateStatsSVG = (stats: StatsData): string => {
  return statsTpl({
    COMMITS: stats.commits,
    REPOS: stats.repos,
    STARS: stats.stars,
    PRS: stats.prs,
  })
}
