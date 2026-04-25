import { FlatList, Text, View } from "react-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import ItemSeparator from "./ItemSeparator";
import ReviewItem from "./ReviewItem";

export const SingleRepositoryContainer = ({ repository }) => {
  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <ReviewItem item={item} title={item.user.username} />
  );

  return (
    <View className="flex-1">
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <RepositoryItem item={repository} showButton />
            <ItemSeparator />
          </>
        }
      />
    </View>
  );
};

const SingleRepository = () => {
  const { id: repositoryId } = useParams();
  const { loading, repository } = useRepository(repositoryId);

  if (loading) {
    return <Text className="text-center text-xl p-5">Loading...</Text>;
  }

  return <SingleRepositoryContainer repository={repository} />;
};

export default SingleRepository;
