import { gql } from "@apollo/client";
import {
  REPOSITORY_INFO_FRAGMENT,
  REVIEW_BASE_INFO_FRAGMENT,
} from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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
            user {
              id
              username
            }
          }
        }
      }
    }
  }

  ${REPOSITORY_INFO_FRAGMENT}
  ${REVIEW_BASE_INFO_FRAGMENT}
`;

export const ME_QUERY = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        totalCount
        edges {
          node {
            ...ReviewBaseInfo
            repository {
              fullName
              id
            }
          }
        }
      }
    }
  }

  ${REVIEW_BASE_INFO_FRAGMENT}
`;
