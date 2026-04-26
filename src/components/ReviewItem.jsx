import { Pressable, Text, View } from "react-native";
import { format } from "date-fns";
import { Link } from "react-router-native";

const ReviewItem = ({ item, title, viewRepositoryId, onDelete }) => {
  const date = new Date(item.createdAt);
  const formattedDate = format(date, "dd.MM.yyyy");

  return (
    <View className="bg-white p-5">
      <View className="flex-row">
        <View className="mr-5">
          <Text className="border-blue-500 border-solid border-3 rounded-full p-3 text-blue-500 font-bold text-xl">
            {item.rating}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-xl font-bold">{title}</Text>
          <Text className="text-xl text-gray-500">{formattedDate}</Text>
          <Text className="text-lg mt-2">{item.text}</Text>
        </View>
      </View>
      {(viewRepositoryId || onDelete) && (
        <View className="flex-row gap-5 mt-5">
          {viewRepositoryId && (
            <Link
              to={`/repository/${viewRepositoryId}`}
              className="bg-blue-500 rounded-md flex-1"
            >
              <Text className="text-xl text-white font-bold text-center p-5">
                View repository
              </Text>
            </Link>
          )}
          {onDelete && (
            <Pressable
              onPress={() => onDelete(item.id)}
              className="rounded-md bg-red-700 flex-1"
            >
              <Text className="text-xl text-white font-bold text-center p-5">
                Delete
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
