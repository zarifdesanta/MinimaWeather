import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { iconList } from "../helper/IconList";
import { API_KEY } from "../helper/WeatherAPI";

export default function Weather({ changeTextTheme, cityName, codeName }) {
  const city = cityName;
  const code = codeName;

  const changeWeatherIcon = () => {
    let iconNameFromOWM =
      weatherData["weather"] && weatherData["weather"][0]["icon"];
    //console.log(iconNameFromOWM);
    //console.log(weatherData);
    //console.log(location + "hi");
    //console.log(weatherData["name"]);
    for (let i = 0; i < iconList.length; i++) {
      if (iconList[i].name == iconNameFromOWM) {
        const Icon = iconList[i].icon;
        return <Icon width={300} height={300}></Icon>;
      }
    }
  };

  const [weatherData, setWeatherData] = useState([]);

  const getTemperature = () => {
    return (
      weatherData["main"] && (weatherData["main"]["temp"] - 273).toFixed(2)
    );
  };

  const getCondition = () => {
    return weatherData["weather"] && weatherData["weather"][0]["main"];
  };

  const getFeelsLike = () => {
    return (
      weatherData["main"] &&
      (weatherData["main"]["feels_like"] - 273).toFixed(2)
    );
  };

  const getCityName = () => {
    return weatherData["name"] && weatherData["name"];
  };

  const getCountryName = () => {
    return weatherData["sys"] && weatherData["sys"]["country"];
  };

  useEffect(() => {
    async function fetchWeatherData() {
      await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "," +
          code +
          "&appid=" +
          API_KEY
      )
        .then((res) => res.json())
        .then((res) => setWeatherData(res))
        .catch((err) => console.log(err));
    }

    fetchWeatherData();

    //console.log(weatherData);
  }, [city, code]);

  return (
    <React.Fragment>
      <View style={styles.loc_container}>
        <Text style={[styles.text, changeTextTheme(), styles.loc_text]}>
          {getCityName()}, {getCountryName()}
        </Text>

        <Text
          style={[
            styles.text,
            { fontSize: 15, alignSelf: "center" },
            changeTextTheme(),
          ]}
        >
          {getCondition()}
        </Text>
      </View>
      <View style={styles.weat_cond_icon_container}>{changeWeatherIcon()}</View>
      <Text style={[styles.text, changeTextTheme(), styles.weat_text]}>
        {getTemperature()}&deg;C
      </Text>
      <Text
        style={[
          styles.text,
          changeTextTheme(),
          { fontSize: 15, alignSelf: "center" },
        ]}
      >
        Feels Like {getFeelsLike()}&deg;C
      </Text>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "monospace",
    fontSize: 25,
  },
  loc_container: {
    marginTop: 80,
  },
  weat_cond_icon_container: {
    marginTop: 80,
  },
  weat_text: {
    marginTop: 80,
  },
});
