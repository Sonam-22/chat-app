import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  SafeAreaView,
} from "react-native";

import BackgroundImage from "../img/Background_Image.png";

// Create constant that holds background colors for Chat Screen
const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

export default function Start(props) {
  const [name, setName] = useState();
  const [color, setColor] = useState();
  const scrollRef = useRef();
  const [padding, setPadding] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        const padding = Platform.OS === "ios" ? e.endCoordinates.height : 1;
        setPadding(padding);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setPadding(0)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [scrollRef, setPadding]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [padding]);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={styles.container}
    >
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.image}
      >
        <SafeAreaView style={styles.scrollViewContainer}>
          <ScrollView ref={scrollRef}>
            <View style={[{ paddingBottom: padding }, styles.scrollView]}>
              <Text style={styles.title}>Welcome to Chat</Text>
              <View style={styles.box}>
                {/* Input box to set user name passed to chat screen */}
                <TextInput
                  onChangeText={(name) => setName(name)}
                  value={name}
                  style={styles.input}
                  placeholder="Your name..."
                />

                {/* Allow user to choose a background color for the chat screen */}
                <Text style={styles.text}>Choose Background Color:</Text>
                <View style={styles.colorContainer}>
                  {colors.map((c, i) =>
                    c !== color ? (
                      <TouchableOpacity
                        key={i}
                        style={[{ backgroundColor: c }, styles.colorbutton]}
                        onPress={() => setColor(c)}
                      />
                    ) : (
                      <View key={i} style={styles.colorbutton}>
                        <Text>✔</Text>
                      </View>
                    )
                  )}
                </View>

                {/* Open chatroom, passing user name and background color as props */}
                <Pressable
                  onPress={() =>
                    props.navigation.navigate("Chat", {
                      name: name,
                      color: color,
                    })
                  }
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#585563" : "#757083",
                    },
                    styles.button,
                  ]}
                >
                  <Text style={styles.buttontext}>Start Chatting</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },

  image: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  scrollViewContainer: {
    flex: 1,
    minHeight: "100%",
    width: "100%",
  },

  scrollView: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    marginBottom: 40,
    marginTop: 120,
    color: "#ffffff",
  },

  box: {
    width: "88%",
    backgroundColor: "white",
    alignItems: "center",
    height: 300,
    justifyContent: "space-evenly",
    marginBottom: 30,
  },

  input: {
    height: 50,
    width: "88%",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  text: {
    color: "#757083",
    fontSize: 20,
    fontWeight: "300",
  },

  colorContainer: {
    width: "88%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  colorbutton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    height: 50,
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttontext: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
