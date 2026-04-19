import { useQuery } from "@apollo/client";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "react-router-native";
import { ME_QUERY } from "../graphql/queries";
import useSignout from "../hooks/useSignOut";

const AppBar = () => {
  const insets = useSafeAreaInsets();
  const signOut = useSignout();
  const { data } = useQuery(ME_QUERY);
  const user = data ? data.me : null;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <View className="bg-[#24292e] pb-5" style={{ paddingTop: insets.top + 20 }}>
      <ScrollView horizontal className="flex-row">
        <Link to={"/"}>
          <Text className="font-bold color-white px-5 py-3 text-xl">
            Repositories
          </Text>
        </Link>

        {user ? (
          <>
            <Link to={"/create-review"} asChild>
              <Text className="font-bold color-white px-5 py-3 text-xl">
                Create a review
              </Text>
            </Link>
            <Pressable onPress={handleLogout}>
              <Text className="font-bold color-white px-5 py-3 text-xl">
                Sign Out
              </Text>
            </Pressable>
          </>
        ) : (
          <Link to={"/signin"} asChild>
            <Text className="font-bold color-white px-5 py-3 text-xl">
              Sign In
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
