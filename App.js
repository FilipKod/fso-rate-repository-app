import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeRouter } from "react-router-native";
import "./global.css";
import Main from "./src/components/Main";

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Main />
      </NativeRouter>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
