import { useApolloClient, useMutation } from "@apollo/client";

import { USER_AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [authMutate, result] = useMutation(USER_AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await authMutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    await authStorage.setAccessToken(data.authenticate.accessToken);

    await apolloClient.resetStore();

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
