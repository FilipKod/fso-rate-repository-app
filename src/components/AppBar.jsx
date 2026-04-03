import { View, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AppBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-[#24292e]" style={{ paddingTop: insets.top }}>
      <Pressable>
        <Text className="font-bold color-white px-5 py-10 text-xl">
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
