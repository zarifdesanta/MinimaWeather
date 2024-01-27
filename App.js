import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LightIcon from "./assets/openweathermap/01d.svg";
import DarkIcon from "./assets/openweathermap/01n.svg";

import Weather from "./components/Weather";
import { setData, getData } from "./helper/SaveLoad";

//filled
//map-marker, map-marker-question
//moon-waning-crescent, white-balance-sunny
//outlined
//map-marker-outline, map-marker-question-outline
//weather-night, weather-sunny

export default function App() {
  //Theme
  const [isDark, setIsDark] = useState(true);

  const changeContainerTheme = () => {
    return isDark ? styles.darkContainer : styles.lightContainer;
  };

  const changeTextTheme = () => {
    return isDark ? styles.darkText : styles.lightText;
  };

  const changeStatusBarTheme = () => {
    return isDark ? "light" : "dark";
  };

  const changeThemeIconBtn = () => {
    if (isDark) {
      return <Icon name="weather-sunny" size={25} color="#f3f3f3"></Icon>;
    } else {
      return <Icon name="weather-night" size={25} color="#241f2f"></Icon>;
    }
  };

  const changeThemeIconBtn_Backup = () => {
    if (isDark) {
      return <LightIcon width={30} height={30}></LightIcon>;
    } else {
      return <DarkIcon width={30} height={30}></DarkIcon>;
    }
  };

  const changeColor = () => {
    if (isDark) {
      return "#f3f3f3";
    } else {
      return "#241f2f";
    }
  };

  const changeColorReverse = () => {
    if (!isDark) {
      return "#f3f3f3";
    } else {
      return "#241f2f";
    }
  };

  const changeTheme = () => {
    setIsDark(!isDark);
    setData("theme", !isDark);
  };
  //Theme

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [city, setCity] = useState("");
  const [code, setCode] = useState("");

  var location = {
    name: "",
    code: "",
  };
  const handleCityName = (name) => {
    location.name = name;
  };
  const handleCodeName = (code) => {
    location.code = code;
  };

  const handleSubmit = () => {
    //console.log(location);
    setCity(location.name);
    setCode(location.code);
    setData("city", location.name);
    setData("code", location.code);
    hideModal();
  };

  const modalComponent = () => {
    if (visible) {
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
              onPress={hideModal}
              style={{ alignSelf: "center" }}
            >
              <Icon
                name="close-circle"
                size={40}
                style={changeTextTheme()}
              ></Icon>
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
    } else {
      return null;
    }
  };

  useEffect(() => {
    async function getAllData() {
      setCity(await getData("city"));
      setCode(await getData("code"));
      setIsDark(await getData("theme"));
    }

    getAllData();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={hideModal}
      style={[styles.container, changeContainerTheme()]}
    >
      <View style={[styles.container, changeContainerTheme()]}>
        <StatusBar style={changeStatusBarTheme()} />

        <View style={styles.topBarContainer}>
          <TouchableOpacity
            style={styles.topBarItem}
            onPress={() => setVisible(!visible)}
          >
            <Icon
              name="map-marker-outline"
              size={25}
              style={changeTextTheme()}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.topBarItem}
            onPress={() => changeTheme()}
          >
            {changeThemeIconBtn()}
          </TouchableOpacity>
        </View>

        {modalComponent()}

        <Weather
          changeTextTheme={changeTextTheme}
          cityName={city}
          codeName={code}
        ></Weather>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  darkContainer: {
    backgroundColor: "#241F2F",
  },
  lightContainer: {
    backgroundColor: "#F3F3F3",
  },
  lightText: {
    color: "#241F2F",
  },
  darkText: {
    color: "#F3F3F3",
  },
  text: {
    fontFamily: "monospace",
    fontSize: 25,
  },
  loc_text: {
    marginTop: 80,
    marginBottom: 80,
  },
  weat_text: {
    marginTop: 80,
  },
  topBarContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginRight: 10,
    marginLeft: "auto",
  },
  topBarItem: {
    marginLeft: 2.5,
    marginRight: 2.5,
  },
  modalContainer: {
    position: "absolute",
    top: "50%",
    zIndex: 200,
    width: "80%",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    gap: 5,
  },
});
