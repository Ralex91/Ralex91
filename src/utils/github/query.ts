export const GITHUB_QUERY = `
  query($login: String!) {
    user(login: $login) {
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
        totalCount
        nodes {
          stargazerCount
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name } }
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        restrictedContributionsCount
      }
      pullRequests(states: [OPEN, MERGED, CLOSED]) {
        totalCount
      }
    }
  }
`
