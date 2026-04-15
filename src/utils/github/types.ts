export interface GithubQueryResponse {
  data: {
    user: {
      repositories: {
        totalCount: number
        nodes: {
          stargazerCount: number
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
}

export interface LangData {
  name: string
  percent: number
  color: string
}
