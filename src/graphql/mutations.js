import { gql } from "@apollo/client";
import {
  REPOSITORY_INFO_FRAGMENT,
  REVIEW_BASE_INFO_FRAGMENT,
} from "./fragments";

export const USER_AUTHENTICATE = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repository {
        ...RepositoryInfo
        reviews {
          edges {
            node {
              ...ReviewBaseInfo
            }
          }
        }
      }
    }
  }

  ${REPOSITORY_INFO_FRAGMENT}
  ${REVIEW_BASE_INFO_FRAGMENT}
`;
