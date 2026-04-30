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
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    // notifyOnNetworkStatusChange: false,
    variables: {
      ...orderVariables[order],
      searchKeyword,
      first: 3,
    },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...orderVariables[order],
        searchKeyword,
        first: 3,
      },
    });
  };

  const repositories = data ? data.repositories : undefined;

  return { loading, error, repositories, fetchMore: handleFetchMore };
};

export default useRepositories;
