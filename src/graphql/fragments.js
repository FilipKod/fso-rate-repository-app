import { gql } from "@apollo/client";

export const REPOSITORY_INFO_FRAGMENT = gql`
  fragment RepositoryInfo on Repository {
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
`;

export const REVIEW_BASE_INFO_FRAGMENT = gql`
  fragment ReviewBaseInfo on Review {
    id
    createdAt
    rating
    text
  }
`;
