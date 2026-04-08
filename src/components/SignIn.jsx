import { Pressable, Text, TextInput, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must contain 3 or more characters.")
    .required("Username is required."),
  password: yup
    .string()
    .min(3, "Password must contain 3 or more characters.")
    .required("Password is required."),
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View className="p-5 bg-white">
      <View>
        <TextInput
          placeholder="Username"
          onChangeText={formik.handleChange("username")}
          value={formik.values.username}
          autoCapitalize="none"
          className={`py-3 px-5 border-solid border rounded-md ${
            formik.touched.username && formik.errors.username
              ? "border-red-700"
              : "border-gray-600"
          }`}
        />
        {formik.touched.username && formik.errors.username && (
          <Text className="color-red-700">{formik.errors.username}</Text>
        )}
      </View>

      <View className="my-3">
        <TextInput
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={formik.handleChange("password")}
          value={formik.values.password}
          className={`py-3 px-5 border-solid border rounded-md ${
            formik.touched.password && formik.errors.password
              ? "border-red-700"
              : "border-gray-600"
          }`}
        />
        {formik.touched.password && formik.errors.password && (
          <Text className="color-red-700">{formik.errors.password}</Text>
        )}
      </View>

      <Pressable onPress={formik.handleSubmit}>
        <Text className="bg-sky-600 text-xl color-white font-bold text-center p-3 rounded-md">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
