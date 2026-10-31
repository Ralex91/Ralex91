export interface GithubQueryResponse {
  data: {
    user: {
      repositories: {
        totalCount: number
        nodes: {
          stargazerCount: number
          stargazers: { edges: { starredAt: string }[] }
          languages: {
            edges: {
              size: number
              node: { name: string }
            }[]
          }
        }[]
      }
      contributionsCollection: {
        totalCommitContributions: number
        restrictedContributionsCount: number
      }
      thisMonth: {
        totalCommitContributions: number
        restrictedContributionsCount: number
        totalPullRequestContributions: number
        totalRepositoryContributions: number
      }
      pullRequests: {
        totalCount: number
      }
    }
  }
}

export interface StatsData {
  commits: number
  repos: number
  stars: number
  prs: number
  monthly: { commits: number; repos: number; stars: number; prs: number }
}

export interface LangData {
  name: string
  percent: number
  color: string
}
