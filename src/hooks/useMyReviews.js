import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../graphql/queries";

const useMyReviews = () => {
  const { data, error, loading, refetch } = useQuery(ME_QUERY, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    },
  });

  const me = data ? data.me : undefined;

  return { loading, error, me, refetch };
};

export default useMyReviews;
