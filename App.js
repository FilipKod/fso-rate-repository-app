import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client/react";
import "./global.css";
import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";

import Constants from "expo-constants";

const apolloClient = createApolloClient();

export default function App() {
  console.log(Constants.expoConfig);

  return (
    <SafeAreaProvider>
      <NativeRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
