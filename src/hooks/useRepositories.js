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

const useRepositories = (order, searchKeyword = "") => {
  const variables = {
    ...orderVariables[order],
    searchKeyword,
  };

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    // notifyOnNetworkStatusChange: false,
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repositories = data ? data.repositories : undefined;

  return { loading, error, repositories, fetchMore: handleFetchMore };
};

export default useRepositories;
