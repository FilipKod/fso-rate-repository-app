import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: "http://192.168.100.55:4000/graphql" }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
