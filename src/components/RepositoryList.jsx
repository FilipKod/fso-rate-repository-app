import { FlatList, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";
import { useState } from "react";

const pickerStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 20,
    paddingHorizontal: 30,
    height: 100,
  },
  placeholder: {
    fontSize: 20,
    color: "gray",
  },
  iconContainer: {
    top: 50 - 12,

    right: 12 + 30,
  },
});

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => <RepositoryItem item={item} />;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      ListHeaderComponent={
        <View>
          <RNPickerSelect
            items={[
              { label: "Latest repositories", value: "LATEST" },
              { label: "Highest rated repositories", value: "HIGHEST_RATED" },
              { label: "Lowest rated repositories", value: "LOWEST_RATED" },
            ]}
            onValueChange={(value) => {
              if (!value) return;
              console.log(value);
              setOrder(value);
            }}
            key={order}
            value={order}
            style={pickerStyles}
            useNativeAndroidPickerStyle={false}
            placeholder={{}}
            Icon={() => {
              return <Ionicons name="chevron-down" size={24} color="gray" />;
            }}
          />
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("LATEST");
  const { repositories, loading } = useRepositories(selectedOrder);

  if (loading) {
    return <Text className="text-center text-xl p-5">Loading...</Text>;
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={selectedOrder}
      setOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;
