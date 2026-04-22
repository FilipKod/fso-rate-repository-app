import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const orderVariables = {
  LATEST: {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  HIGHEST_RATED: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  LOWEST_RATED: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};

const useRepositories = (order) => {
  console.log(order);
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      ...orderVariables[order],
    },
  });

  const repositories = data ? data.repositories : undefined;

  return { loading, error, repositories };
};

export default useRepositories;
