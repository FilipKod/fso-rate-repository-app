import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "react-router-native";

const AppBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-[#24292e] pb-5" style={{ paddingTop: insets.top + 20 }}>
      <ScrollView horizontal className="flex-row">
        <Link to={"/"}>
          <Text className="font-bold color-white px-5 py-3 text-xl">
            Repositories
          </Text>
        </Link>

        <Link to={"/signin"} asChild>
          <Text className="font-bold color-white px-5 py-3 text-xl">
            Sign In
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
