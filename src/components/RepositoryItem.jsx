import { Image, Text, View, Platform, Pressable } from "react-native";
import Count from "./Count";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";

const RepositoryItem = ({ item, showButton }) => {
  const navigate = useNavigate();

  return (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <View className="p-5 bg-white" testID="repositoryItem">
        <View className="flex-row gap-5">
          <Image
            className="h-[60] w-[60] rounded-md"
            source={{ uri: item.ownerAvatarUrl }}
          />
          <View className="flex-1">
            <Text
              className="text-2xl font-bold"
              style={{
                fontFamily: Platform.select({
                  android: "Roboto",
                  ios: "Arial",
                  default: "System",
                }),
              }}
            >
              {item.fullName}
            </Text>
            <Text className="text-xl color-slate-600 my-2">
              {item.description}
            </Text>
            <Text className="bg-sky-700 color-white text-xl py-1 px-3 rounded-md self-start">
              {item.language}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-evenly my-5">
          <Count
            label={"Stars"}
            count={item.stargazersCount}
            testID={"stargazersCount"}
          />
          <Count
            label={"Forks"}
            count={item.forksCount}
            testID={"forksCount"}
          />
          <Count
            label={"Reviews"}
            count={item.reviewCount}
            testID={"reviewCount"}
          />
          <Count
            label={"Rating"}
            count={item.ratingAverage}
            testID={"ratingAverage"}
          />
        </View>

        {showButton && (
          <Pressable
            onPress={() => Linking.openURL(item.url)}
            className="bg-blue-500 p-4 rounded-md active:opacity-70"
          >
            <Text className="text-white text-center font-bold">
              Open in Github
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
