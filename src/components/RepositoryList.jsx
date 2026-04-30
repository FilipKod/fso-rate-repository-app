import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

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
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
});

const RepositoryListHeader = ({
  order,
  setOrder,
  filterString,
  setFilterString,
}) => {
  return (
    <View>
      <View
        className="flex-row justify-center items-center bg-white m-5 rounded-full px-3 py-2"
        style={pickerStyles.shadow}
      >
        <Ionicons color={"#333"} size={24} name="search" className="p-2" />
        <TextInput
          placeholder="filter"
          autoCapitalize="none"
          className="text-xl flex-1"
          onChangeText={(text) => {
            setFilterString(text.toLowerCase());
          }}
          value={filterString}
        />
        {!!filterString.length && (
          <Ionicons
            color={"#333"}
            size={30}
            name="close-outline"
            className="p-2"
            onPress={() => {
              setFilterString("");
            }}
          />
        )}
      </View>
      <RNPickerSelect
        items={[
          { label: "Latest repositories", value: "LATEST" },
          { label: "Highest rated repositories", value: "HIGHEST_RATED" },
          { label: "Lowest rated repositories", value: "LOWEST_RATED" },
        ]}
        onValueChange={(value) => {
          if (!value) return;
          setOrder(value);
        }}
        value={order}
        style={pickerStyles}
        useNativeAndroidPickerStyle={false}
        placeholder={{}}
        Icon={() => <Ionicons name="chevron-down" size={24} color="gray" />}
      />
    </View>
  );
};

export const RepositoryListContainer = ({
  order,
  setOrder,
  filterString,
  setFilterString,
  repositories,
  loading,
  onEndReached,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderHeader = useMemo(
    () => (
      <RepositoryListHeader
        order={order}
        setOrder={setOrder}
        filterString={filterString}
        setFilterString={setFilterString}
      />
    ),
    [order, setOrder, filterString, setFilterString],
  );

  const loadingItem = <Text className="text-2xl text-center">Loading...</Text>;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={loading ? loadingItem : null}
      keyboardShouldPersistTaps="handled"
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState("LATEST");
  const [filterString, setFilterString] = useState("");
  const [search] = useDebounce(filterString, 500);

  const { repositories, loading, fetchMore } = useRepositories(order, search);

  return (
    <RepositoryListContainer
      order={order}
      setOrder={setOrder}
      filterString={filterString}
      setFilterString={setFilterString}
      repositories={repositories}
      loading={loading}
      onEndReached={fetchMore}
    />
  );
};

export default RepositoryList;
