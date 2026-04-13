import { View, Text } from "react-native";

const Count = ({ label, count, testID }) => {
  let formatedCount = count;

  if (count > 999) {
    formatedCount = (count / 1000).toFixed(1) + "K";
  }

  return (
    <View>
      <Text
        className="font-bold text-xl text-center"
        testID={testID || undefined}
      >
        {formatedCount}
      </Text>
      <Text className="text-xl text-center mt-2">{label}</Text>
    </View>
  );
};

export default Count;
