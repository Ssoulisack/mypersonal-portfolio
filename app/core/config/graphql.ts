export interface GraphQLQueryRequest {
  query: string;
  variables?: Record<string, any>;
}

// Pre-built queries using the model system
export const BODY_QUERY = {
  GET_CONTRIBUTIONS: (variables: { username: string }) => ({
    query: `
        query GetContributions($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
          }
        }
      `,
    variables,
  }),
} as const;
