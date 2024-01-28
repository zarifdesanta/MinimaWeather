import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LightIcon from "./assets/openweathermap/01d.svg";
import DarkIcon from "./assets/openweathermap/01n.svg";

import LocationModal from "./components/LocationModal";
import Weather from "./components/Weather";
import { setData, getData } from "./helper/SaveLoad";
import { colors } from "./helper/ColorPalette";

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
    return isDark ? styles.lightText : styles.darkText;
  };

  const changeStatusBarTheme = () => {
    return isDark ? "light" : "dark";
  };

  const changeThemeIconBtn = () => {
    if (isDark) {
      return <Icon name="weather-sunny" size={25} color={colors.light}></Icon>;
    } else {
      return <Icon name="weather-night" size={25} color={colors.dark}></Icon>;
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
      return colors.light;
    } else {
      return colors.dark;
    }
  };

  const changeColorReverse = () => {
    if (!isDark) {
      return colors.light;
    } else {
      return colors.dark;
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

  const handleLocationModalComponent = () => {
    if (visible) {
      return (
        <LocationModal
          changeContainerTheme={changeContainerTheme}
          changeColor={changeColor}
          changeColorReverse={changeColorReverse}
          changeTextTheme={changeTextTheme}
          handleCityName={handleCityName}
          handleCodeName={handleCodeName}
          handleSubmit={handleSubmit}
          hideModal={hideModal}
          visible={visible}
        ></LocationModal>
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
    <View style={[styles.container, changeContainerTheme()]}>
      <StatusBar style={changeStatusBarTheme()} />

      {/**Top bar */}
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

      {/**Location modal handler */}
      {handleLocationModalComponent()}

      {/**Weather component */}
      <Weather
        changeTextTheme={changeTextTheme}
        cityName={city}
        codeName={code}
      ></Weather>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  darkContainer: {
    backgroundColor: colors.dark,
  },
  lightContainer: {
    backgroundColor: colors.light,
  },
  darkText: {
    color: colors.dark,
  },
  lightText: {
    color: colors.light,
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
});
