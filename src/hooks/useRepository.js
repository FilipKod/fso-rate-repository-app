import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useRepository = (id) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id },
  });

  const handleFetchMore = () => {
    console.log(JSON.stringify(data, null, 2));
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        repositoryId: id,
      },
    });
  };

  const repository = data ? data.repository : undefined;

  return { loading, error, repository, fetchMore: handleFetchMore };
};

export default useRepository;
