import * as yup from "yup";
import { Pressable, Text, TextInput, View } from "react-native";
import { useFormik } from "formik";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const errorMessage = {
  username: {
    characters:
      "Please enter username with length between 5 and 30 characters.",
    required: "Please enter username.",
  },
  password: {
    characters:
      "Please enter username with length between 5 and 50 characters.",
    required: "Please enter password.",
    confirmation: "Passwords not matches.",
    confirmationReq: "Please confirm your password.",
  },
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, errorMessage.username.characters)
    .max(30, errorMessage.username.characters)
    .required(errorMessage.username.required),
  password: yup
    .string()
    .min(5, errorMessage.password.characters)
    .max(50, errorMessage.password.characters)
    .required(errorMessage.password.required),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], errorMessage.password.confirmation)
    .required(errorMessage.password.confirmationReq),
});

export const SignUpContainer = ({ onSubmit }) => {
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
          autoCapitalize="none"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          className={`py-3 px-5 border-solid border rounded-md text-lg ${
            formik.touched.username && formik.errors.username
              ? "border-red-700"
              : "border-gray-600"
          }`}
        />
        {formik.touched.username && formik.errors.username && (
          <Text className="color-red-700">{formik.errors.username}</Text>
        )}
      </View>

      <View className="mt-3">
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          className={`py-3 px-5 border-solid border rounded-md text-lg ${
            formik.touched.password && formik.errors.password
              ? "border-red-700"
              : "border-gray-600"
          }`}
        />
        {formik.touched.password && formik.errors.password && (
          <Text className="color-red-700">{formik.errors.password}</Text>
        )}
      </View>

      <View className="my-3">
        <TextInput
          placeholder="Password confirmation"
          autoCapitalize="none"
          secureTextEntry
          value={formik.values.passwordConfirmation}
          onChangeText={formik.handleChange("passwordConfirmation")}
          className={`py-3 px-5 border-solid border rounded-md text-lg ${
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
              ? "border-red-700"
              : "border-gray-600"
          }`}
        />
        {formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation && (
            <Text className="color-red-700">
              {formik.errors.passwordConfirmation}
            </Text>
          )}
      </View>

      <Pressable onPress={formik.handleSubmit}>
        <Text className="bg-sky-600 text-xl color-white font-bold text-center p-3 rounded-md">
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await createUser({ username, password });
      if (data?.createUser?.id) {
        await signIn({ username, password });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
