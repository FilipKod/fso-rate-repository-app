import { useMutation } from "@apollo/client";
import { USER_AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
  const [authMutate, result] = useMutation(USER_AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await authMutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
