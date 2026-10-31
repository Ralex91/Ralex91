export const GITHUB_QUERY = `
  query($login: String!, $monthStart: DateTime!) {
    user(login: $login) {
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
        totalCount
        nodes {
          stargazerCount
          stargazers(first: 100, orderBy: { field: STARRED_AT, direction: DESC }) {
            edges { starredAt }
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name } }
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        restrictedContributionsCount
      }
      thisMonth: contributionsCollection(from: $monthStart) {
        totalCommitContributions
        restrictedContributionsCount
        totalPullRequestContributions
        totalRepositoryContributions
      }
      pullRequests(states: [OPEN, MERGED, CLOSED]) {
        totalCount
      }
    }
  }
`
