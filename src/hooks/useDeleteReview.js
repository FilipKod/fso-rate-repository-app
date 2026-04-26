import { useMutation } from "@apollo/client";
import { DELETE_REVIEW_MUTATION } from "../graphql/mutations";
import { ME_QUERY } from "../graphql/queries";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW_MUTATION, {
    refetchQueries: [ME_QUERY],
  });

  const deleteReview = async (id) => {
    const { data } = await mutate({
      variables: { deleteReviewId: id },
    });

    return { data };
  };

  return [deleteReview, result];
};

export default useDeleteReview;
