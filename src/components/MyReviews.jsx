import { FlatList, Text, Alert } from "react-native";
import ItemSeparator from "./ItemSeparator";
import useMyReviews from "../hooks/useMyReviews";
import ReviewItem from "./ReviewItem";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";
import useDeleteReview from "../hooks/useDeleteReview";

export const MyReviewsContainer = ({ reviews, loading, onDelete }) => {
  const reviewsNode = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const loadingItem = <Text className="text-2xl text-center">Loading...</Text>;

  return (
    <FlatList
      data={reviewsNode}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          item={item}
          title={item.repository.fullName}
          viewRepositoryId={item.repository.id}
          onDelete={onDelete}
        />
      )}
      ListFooterComponent={loading ? loadingItem : null}
    />
  );
};

const MyReviews = () => {
  const { loading, me } = useMyReviews();
  const [deleteReview] = useDeleteReview();
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

  const handleDeleteReview = async (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview(id);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };

  return (
    <MyReviewsContainer
      loading={loading}
      reviews={me?.reviews}
      onDelete={handleDeleteReview}
    />
  );
};

export default MyReviews;
