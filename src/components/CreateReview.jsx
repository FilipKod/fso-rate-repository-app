import * as yup from "yup";
import { useFormik } from "formik";
import { Pressable, Text, TextInput, View } from "react-native";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const initialValues = {
  ownerName: "",
  repoName: "",
  rating: "",
  review: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(2, "Owner name must contain 2 or more characters.")
    .required("Repository owner name is required."),
  repoName: yup
    .string()
    .min(2, "Repository name must contain 2 or more characters.")
    .required("Repository name is required."),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required("Rating is required.")
    .integer(),
  review: yup.string().min(2, "Review must contain 2 or more characters."),
});

export const CreateReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View className="p-5 bg-white">
      <View>
        <TextInput
          placeholder="Repository owner name"
          autoCapitalize="none"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange("ownerName")}
          className={`py-3 px-5 border-solid border rounded-md text-lg ${
            formik.touched.ownerName && formik.errors.ownerName
              ? "border-red-700"
              : "border-gray-600"
          }`}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text className="color-red-700">{formik.errors.ownerName}</Text>
        )}
      </View>

      <View className="mt-3">
        <TextInput
          placeholder="Repository name"
          autoCapitalize="none"
          value={formik.values.repoName}
          onChangeText={formik.handleChange("repoName")}
          className={`py-3 px-5 border-solid border rounded-md text-lg ${
            formik.touched.repoName && formik.errors.repoName
              ? "border-red-700"
              : "border-gray-600"
          }`}
        />
        {formik.touched.repoName && formik.errors.repoName && (
          <Text className="color-red-700">{formik.errors.repoName}</Text>
        )}
      </View>

      <View className="mt-3">
        <TextInput
          placeholder="Rating between 0 and 100"
          autoCapitalize="none"
          value={formik.values.rating}
          onChangeText={formik.handleChange("rating")}
          keyboardType="number-pad"
          className={`py-3 px-5 border-solid border rounded-md text-lg ${
            formik.touched.rating && formik.errors.rating
              ? "border-red-700"
              : "border-gray-600"
          }`}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text className="color-red-700">{formik.errors.rating}</Text>
        )}
      </View>

      <View className="my-3">
        <TextInput
          placeholder="Review"
          multiline
          value={formik.values.review}
          onChangeText={formik.handleChange("review")}
          numberOfLines={5}
          textAlignVertical="top"
          className={`py-3 px-5 border-solid border rounded-md text-lg/6 min-h-32 ${
            formik.touched.review && formik.errors.review
              ? "border-red-700"
              : "border-gray-600"
          }`}
        />
        {formik.touched.review && formik.errors.review && (
          <Text className="color-red-700">{formik.errors.review}</Text>
        )}
      </View>

      <Pressable onPress={formik.handleSubmit}>
        <Text className="bg-sky-600 mt-3 text-xl color-white font-bold text-center p-3 rounded-md">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, rating, review, repoName } = values;

    try {
      const { data } = await createReview({
        ownerName,
        rating: Number(rating),
        repositoryName: repoName,
        text: review,
      });
      if (data?.createReview?.repository) {
        const repository = data.createReview.repository;
        navigate(`/repository/${repository.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
