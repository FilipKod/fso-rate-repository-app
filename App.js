import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";
import Main from "./src/components/Main";

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
