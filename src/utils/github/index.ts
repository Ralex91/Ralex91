import { LANG_COLORS, LANG_FALLBACK_COLOR, MERGED_LANGS } from "@/utils/colors"
import { CACHE_TTL } from "@/utils/constants"
import { GITHUB_QUERY } from "@/utils/github/query"
import type {
  GithubQueryResponse,
  LangData,
  StatsData,
} from "@/utils/github/types"
import ky from "ky"
import {
  entries,
  flatMap,
  groupBy,
  identity,
  map,
  mapValues,
  pipe,
  sortBy,
  sumBy,
  take,
} from "remeda"

let cache: { stats: StatsData; langs: LangData[]; expiresAt: number } | null =
  null

const gql = (query: string, variables: Record<string, unknown>) => {
  const token = Bun.env.GITHUB_TOKEN

  return ky
    .post<GithubQueryResponse>("https://api.github.com/graphql", {
      headers: {
        "User-Agent": "ralex-readme-stats",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      json: { query, variables },
    })
    .json()
}

export const getGithubData = async (): Promise<{
  stats: StatsData
  langs: LangData[]
}> => {
  if (cache && Date.now() < cache.expiresAt) {
    return { stats: cache.stats, langs: cache.langs }
  }

  const {
    data: {
      user: { repositories, contributionsCollection, pullRequests },
    },
  } = await gql(GITHUB_QUERY, { login: Bun.env.GITHUB_NAME })

  const stars = repositories.nodes.reduce((s, r) => s + r.stargazerCount, 0)
  const commits =
    contributionsCollection.totalCommitContributions +
    contributionsCollection.restrictedContributionsCount
  const repos = repositories.totalCount
  const prs = pullRequests.totalCount

  const langBytes = pipe(
    repositories.nodes,
    flatMap((repo) => repo.languages.edges),
    map((edge) => ({
      name: MERGED_LANGS[edge.node.name] ?? edge.node.name,
      size: edge.size,
    })),
    groupBy(({ name }) => name),
    mapValues((group) => sumBy(group, ({ size }) => size)),
  )

  const total = sumBy(Object.values(langBytes), identity())
  const langs = pipe(
    entries(langBytes),
    sortBy([([, bytes]) => bytes, "desc"]),
    take(5),
    map(([name, bytes]) => ({
      name,
      percent: Math.round((bytes / total) * 100),
      color: LANG_COLORS[name] ?? LANG_FALLBACK_COLOR,
    })),
  )

  cache = {
    stats: { commits, repos, stars, prs },
    langs,
    expiresAt: Date.now() + CACHE_TTL,
  }

  return { stats: cache.stats, langs: cache.langs }
}
