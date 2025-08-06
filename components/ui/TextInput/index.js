import { TextInput, StyleSheet, View, Text, Platform } from "react-native";

export default function Index({
  value,
  setValue,
  customStyles,
  placeholder,
  inputLabel,
  validationText,
  backgroundColor='#ffffff',
  type,
}) {
  return (
    <View style={{ ...customStyles }}>
      {inputLabel && <Text style={Styles.label}>{inputLabel}</Text>}
      <TextInput
        style={{ ...Styles.text, backgroundColor }}
        placeholder={placeholder}
        onChangeText={setValue}
        defaultValue={value}
        placeholderTextColor="#ffffff"
        secureTextEntry={type?.includes("password")}
        cursorColor="#ffffff"
        keyboardType={"numeric"}
      />
      {validationText && (
        <Text style={Styles.validationText}>{validationText}</Text>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontFamily: "Signika",
    color: "#ffffff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 15 : 13,
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 8,
    fontWeight: "bold",
    borderColor: "#ffffff",
    borderWidth: 3
  },
  label: {
    fontFamily: "Signika",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#fff",
  },
  validationText: {
    letterSpacing: 2,
    textAlign: "center",
    fontFamily: "Signika",
    fontSize: 16,
    marginTop: 8,
    color: "red",
  },
});
