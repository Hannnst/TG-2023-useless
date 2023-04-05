import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Pressable,
  Text,
  Button,
  View,
  FlatList,
  Image,
  WebApplication,
} from "react-native";

export default function App() {
  const [timesPressed, setTimesPressed] = useState(0);
  const [timesPressedXD, setTimesPressedXD] = useState(0);
  const [insult, setInsult] = useState([]);
  const [kitten, setKitten] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "orange",
      alignItems: "center",
      justifyContent: "center",
    },
    counterText: {
      fontFamily: "Comic Sans MS",
      fontSize: 50,
      fontWeight: "bold",
      color: "cyan",
      padding: 20,
    },
    titleText: {
      fontFamily: "Comic Sans MS",
      fontSize: 30,
      fontWeight: "bold",
      color: "pink",
      paddingHorizontal: 50,
    },
  });

  const getKitten = async () => {
    try {
      const response = await fetch("https://randombig.cat/roar.json");
      const json = await response.json();
      setKitten(json.url);
    } catch (error) {
      console.error(error);
    }
  };

  const getInsult = async () => {
    try {
      const response = await fetch(
        "https://v2.jokeapi.dev/joke/Any?safe-mode",
        {
          method: "GET",
          withCredentials: true,
          crossorigin: true,
          mode: "cors",
        }
      );
      const json = await response.json();
      setInsult(json.setup);
    } catch (error) {
      console.error(error);
    }
  };

  const click = async () => {
    if (timesPressedXD > 69) {
      getKitten();
      getInsult();
      setTimesPressedXD(0);
    }
    setTimesPressed((current) => current + 1);
    setTimesPressedXD((current) => current + 1);
  };

  useEffect(() => {
    getInsult();
    getKitten();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}> Cat poked: {timesPressed}</Text>
      <Pressable
        onPress={() => {
          click();
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
          },
          styles.wrapperCustom,
        ]}
      >
        {({ pressed }) => (
          <Image
            style={{ width: 500, height: 500 }}
            source={{
              uri: kitten,
            }}
          />
        )}
      </Pressable>
      <Text style={styles.titleText}>{insult}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
