import React from "react";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { View, Text, StyleSheet, Alert, Image, Pressable } from "react-native";
import { LoginSchema } from "@/utility/formSchema";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import UserButton from "../ui/Button";
import TextInput from "../ui/TextInput";

export default function Login() {
  const router = useRouter();

  const onLogin = () => {
    router.replace('/(tabs)/(category)');
  };

  return (
      <Formik
        initialValues={{ password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          // console.log(values);
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
            <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
              <FontAwesome5 name="user-lock" size={128} color="white" />
            </View>
            <TextInput
              value={values.password}
              setValue={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="Enter Password"
              validationText={
                (errors.password && touched.password) ? errors.password : false
              }
              type="password"
              backgroundColor="transparent"
              customStyles={Styles.textInputStyles}
            />
            <UserButton
              onPress={handleSubmit}
              title="Login"
              type="linear"
              backgroundColor={["#f73946", "#e0468e"]}
              customStyles={{ marginTop: 16 }}
            />
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
    marginBottom: 20,
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
