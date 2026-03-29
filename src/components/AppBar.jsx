import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
  },
  text: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    color: "#fff",
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.text} fontSize={"subheading"}>
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
