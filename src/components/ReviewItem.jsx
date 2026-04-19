import { Text, View } from "react-native";
import { format } from "date-fns";

const ReviewItem = ({ item }) => {
  const date = new Date(item.createdAt);
  const formattedDate = format(date, "dd.MM.yyyy");

  return (
    <View className="bg-white p-5 flex-row">
      <View className="mr-5">
        <Text className="border-blue-500 border-solid border-3 rounded-full p-3 text-blue-500 font-bold text-xl">
          {item.rating}
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-xl font-bold">{item.user.username}</Text>
        <Text className="text-xl text-gray-500">{formattedDate}</Text>
        <Text className="text-lg mt-2">{item.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
