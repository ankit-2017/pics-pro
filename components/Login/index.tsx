import React from "react";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { View, Text, StyleSheet, Alert, Image, Pressable } from "react-native";
import { LoginSchema } from "@/utility/formSchema";

import UserButton from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";

export default function Login() {
  const router = useRouter();

  const onLogin = () => {
    router.replace('/(tabs)/(category)');
  };

  return (
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
          onLogin();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require('@/assets/images/splash-icon.png')}
                style={Styles.image}
              />
            </View>
            <TextInput
              value={values.email}
              setValue={handleChange("email")}
              onBlur={handleBlur("email")}
              placeholder="Enter Email ID"
              inputLabel="Email ID"
              validationText={
                (errors.email && touched.email) ? errors.email : false
              }
              customStyles={Styles.textInputStyles}
            />
            <TextInput
              value={values.password}
              setValue={handleChange("password")}
              onBlur={handleBlur("email")}
              placeholder="Enter Password"
              inputLabel="Password"
              validationText={
                (errors.password && touched.password) ? errors.password : false
              }
              type="password"
              customStyles={Styles.textInputStyles}
            />
            <UserButton
              onPress={onLogin}
              title="Login"
              type="linear"
              backgroundColor={["#f73946", "#e0468e"]}
              customStyles={{ marginTop: 16 }}
            />
            <View style={Styles.signupWrapper}>
              <Text style={{ fontSize: 14, color: "#fff" }}>
                Don&apos;t have account!{" "}
              </Text>
              <Pressable>
                <Text style={Styles.signupText}>Sign up</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
  );
}

const Styles = StyleSheet.create({
  textInputStyles: {
    marginTop: 8,
    marginBottom: 8,
  },
  textStyles: {
    textAlign: "center",
    fontFamily: "Signika",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  image: {
    width: 170,
    height: 160,
  },
  signupWrapper: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  signupText: {
    fontSize: 14,
    color: "#e0468e",
  },
});
