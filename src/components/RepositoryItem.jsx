import { Image, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  numbersData: {
    flexDirection: "row",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 3,
  },
});

const RepositoryItem = ({ item }) => {
  console.log(item);
  return (
    <View>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>

      <View style={styles.numbersData}>
        <Text>Stars: {item.stargazersCount}</Text>
        <Text>Forks: {item.forksCount}</Text>
        <Text>Reviews: {item.reviewCount}</Text>
        <Text>Rating: {item.ratingAverage}</Text>
      </View>
    </View>
  );
};

export default RepositoryItem;
