import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../graphql/queries";

const useMyReviews = () => {
  const { data, error, loading } = useQuery(ME_QUERY, {
    variables: {
      includeReviews: true,
    },
  });

  const me = data ? data.me : undefined;

  return { loading, error, me };
};

export default useMyReviews;
