import React, { useState, useEffect, useCallback, useContext } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { storage } from "../app-firebase/firebase";
import { getBlob } from "../utils/utils";

const CustomActions = (props) => {
  const [images, setImage] = useState([]);
  const [location, setLocation] = useState([]);
  const { showActionSheetWithOptions } = useActionSheet();

  //  Let the user pick an image from the device's image library
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!result.cancelled) {
          const imageUrl = await uploadFile(result.uri);
          const state = [{ image: imageUrl }];
          setImage(state);
          props.onSend(state);
        }
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const pickLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const result = await Location.getCurrentPositionAsync({});
        if (result) {
          const location = [{ location: result.coords }];
          setLocation(location);
          props.onSend(location);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (!result.cancelled) {
          const imageUrl = await uploadFile(result.uri);
          const state = [{ image: imageUrl }];
          setImage(state);
          props.onSend(state);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const uploadFile = async (uri) => {
    try {
      const imageName = uri.split("/").pop();
      const blob = await getBlob(uri);
      const storageRef = ref(storage, `images/${imageName}`);

      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, blob);
      const downloadUri = await getDownloadURL(storageRef);
      return downloadUri;
    } catch (e) {
      console.log(e);
    }
  };

  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick an image");
            return pickImage();
          case 1:
            console.log("user wants to take a photo");
            return takePhoto();
          case 2:
            console.log("user wants to get their location");
            return pickLocation();
        }
      }
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={onActionPress}
      accessibilityLabel="Message options"
      accessibilityHint="Select images and locations"
    >
      <View style={[styles.wrapper, props.wrapperStyle]}>
        <Text style={[styles.iconText, props.iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
