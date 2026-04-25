import { FlatList, Text } from "react-native";
import ItemSeparator from "./ItemSeparator";
import useMyReviews from "../hooks/useMyReviews";
import ReviewItem from "./ReviewItem";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";

export const MyReviewsContainer = ({ reviews, loading }) => {
  const reviewsNode = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const loadingItem = <Text className="text-2xl text-center">Loading...</Text>;

  return (
    <FlatList
      data={reviewsNode}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem item={item} title={item.repository.fullName} />
      )}
      ListFooterComponent={loading ? loadingItem : null}
    />
  );
};

const MyReviews = () => {
  const { loading, me } = useMyReviews();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !me) navigate("/");
  }, [loading, me]);

  if (!loading && me && !me.reviews.totalCount) {
    return (
      <Text className="text-xl text-center py-5 px-2">
        You have not review any repository yet.
      </Text>
    );
  }

  return <MyReviewsContainer loading={loading} reviews={me?.reviews} />;
};

export default MyReviews;
