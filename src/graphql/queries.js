import { gql } from "@apollo/client";
import {
  REPOSITORY_INFO_FRAGMENT,
  REVIEW_BASE_INFO_FRAGMENT,
} from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      totalCount
      edges {
        node {
          ...RepositoryInfo
        }
        cursor
      }
    }
  }

  ${REPOSITORY_INFO_FRAGMENT}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryInfo
      url
      reviews {
        edges {
          node {
            ...ReviewBaseInfo
          }
        }
      }
    }
  }

  ${REPOSITORY_INFO_FRAGMENT}
  ${REVIEW_BASE_INFO_FRAGMENT}
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
