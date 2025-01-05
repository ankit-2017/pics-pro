import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "@/components/Login";

export default function Index() {

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={["#a65cf7", "#2f31d4"]}
        style={{ flex: 1 }}
      >
        <StatusBar style="auto" />
        <View style={Styles.mainContainer}>
          <Login />
        </View>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const Styles = StyleSheet.create({
  mainContainer: {
    paddingTop: "30%",
    paddingRight: 20,
    paddingLeft: 20,
    fontFamily: "Signika"
  },
});