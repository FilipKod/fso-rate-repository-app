import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id },
  });

  const repository = data ? data.repository : undefined;

  return { loading, error, repository };
};

export default useRepository;
