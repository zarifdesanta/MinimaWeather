import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function LocationModal({
  changeContainerTheme,
  changeColor,
  changeColorReverse,
  changeTextTheme,
  handleCityName,
  handleCodeName,
  handleSubmit,
  hideModal,
}) {
  return (
    <View
      style={[
        styles.modalContainer,
        changeContainerTheme(),
        { borderColor: changeColor() },
      ]}
    >
      <Text style={[styles.text, changeTextTheme()]}>CITY</Text>
      <TextInput
        onChangeText={(text) => handleCityName(text)}
        placeholder="e.g. dhaka, toronto..."
        placeholderTextColor="gray"
        style={[
          {
            backgroundColor: changeColor(),
            color: changeColorReverse(),
            borderRadius: 10,
            fontSize: 20,
            padding: 3,
            fontFamily: "monospace",
          },
        ]}
      ></TextInput>
      <Text style={[styles.text, changeTextTheme()]}>CODE</Text>
      <TextInput
        onChangeText={(text) => handleCodeName(text)}
        placeholder="e.g. BD, CA..."
        placeholderTextColor="gray"
        style={[
          {
            backgroundColor: changeColor(),
            color: changeColorReverse(),
            borderRadius: 10,
            fontSize: 20,
            padding: 3,
            fontFamily: "monospace",
          },
        ]}
      ></TextInput>
      <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
        <TouchableOpacity
          onPress={() => hideModal()}
          style={{ alignSelf: "center" }}
        >
          <Icon name="close-circle" size={40} style={changeTextTheme()}></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{ alignSelf: "center" }}
        >
          <Icon
            name="chevron-right-circle"
            size={40}
            style={changeTextTheme()}
          ></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "monospace",
    fontSize: 25,
  },
  modalContainer: {
    position: "absolute",
    top: "35%",
    zIndex: 200,
    width: "80%",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    gap: 5,
  },
});