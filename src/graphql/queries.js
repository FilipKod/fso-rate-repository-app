import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      totalCount
      edges {
        node {
          id
          ownerAvatarUrl
          language
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
        }
        cursor
      }
    }
  }
`;
