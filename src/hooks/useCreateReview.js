import { useMutation } from "@apollo/client";
import { CREATE_REVIEW_MUTATION } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW_MUTATION);

  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName,
          rating,
          repositoryName,
          text,
        },
      },
    });

    return { data };
  };

  return [createReview, result];
};

export default useCreateReview;
