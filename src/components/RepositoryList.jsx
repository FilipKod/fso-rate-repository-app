import { FlatList, View, Text } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepository";

const ItemSeparator = () => <View className="h-5 bg-[#e3e6e9]" />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => <RepositoryItem item={item} />;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if (loading) {
    return <Text className="text-center text-xl p-5">Loading...</Text>;
  }

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
