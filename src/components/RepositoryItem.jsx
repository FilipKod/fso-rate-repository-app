import { Image, Text, View } from "react-native";
import Count from "./Count";

const RepositoryItem = ({ item }) => {
  return (
    <View className="p-5">
      <View className="flex-row gap-5">
        <Image
          className="h-[60] w-[60] rounded-md"
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View className="flex-1">
          <Text className="text-2xl font-bold">{item.fullName}</Text>
          <Text className="text-xl color-slate-600 my-2">
            {item.description}
          </Text>
          <Text className="bg-sky-700 color-white text-xl py-1 px-3 rounded-md self-start">
            {item.language}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-evenly my-5">
        <Count label={"Stars"} count={item.stargazersCount} />
        <Count label={"Forks"} count={item.forksCount} />
        <Count label={"Reviews"} count={item.reviewCount} />
        <Count label={"Rating"} count={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
