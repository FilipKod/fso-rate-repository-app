import { View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";

const Main = () => {
  return (
    <View className="grow shrink">
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;
