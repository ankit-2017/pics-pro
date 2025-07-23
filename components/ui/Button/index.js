import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";
import { Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";

export default function UserButton({
  type = "primary",
  title = "",
  onPress,
  textColor = "white",
  customStyles = {},
  backgroundColor = ["#f73946", "#e0468e"],
}) {
  if (type === "primary") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...styles.buttonStyles,
          ...customStyles,
          backgroundColor: backgroundColor[0],
        }}
      >
        <Text style={{ ...styles.text, color: textColor }}>{title}</Text>
      </TouchableOpacity>
    );
  }
  if (type === "linear") {
    return (
      <Pressable onPress={onPress}>
        <LinearGradient
          colors={backgroundColor}
          style={{
            ...styles.buttonStyles,
            ...customStyles,
          }}
        >
          <Text style={{ ...styles.text, color: textColor }}>{title}</Text>
        </LinearGradient>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyles: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: "Signika",
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
});

UserButton.propTypes = {
  type: PropTypes.oneOf(["primary", "linear"]),
  title: PropTypes.string,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  customStyles: PropTypes.object,
  backgroundColor: PropTypes.array,
};
