import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client/react";
import Constants from "expo-constants";

import "./global.css";
import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  console.log(Constants.expoConfig);

  return (
    <SafeAreaProvider>
      <NativeRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
