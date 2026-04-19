import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER_MUTATION);

  const createUser = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });

    return { data };
  };

  return [createUser, result];
};

export default useSignUp;
