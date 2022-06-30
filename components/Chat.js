import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { db } from "../app-firebase/firebase";

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

/**
 * Reference of the messages collection.
 */

const COLLECTION_NAME = "messages";

export default function Chat(props) {
  let { name, color, user } = props.route.params;
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState(false);

  // WORKING WITH ASYNCSTORAGE
  const getMessagesFromStorage = async () => {
    try {
      const storedMessages =
        (await AsyncStorage.getItem(COLLECTION_NAME)) || [];
      setMessages(JSON.parse(storedMessages));
    } catch (error) {
      console.log("Error fetching messages in Async Storage", error.message);
    }
  };

  const saveMessages = async (toAsyncStore) => {
    try {
      await AsyncStorage.setItem(COLLECTION_NAME, JSON.stringify(toAsyncStore));
    } catch (error) {
      console.log(
        "Error saving copy of messages in Async Storage",
        error.message
      );
    }
  };

  const deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem(COLLECTION_NAME);
      // console.log('Messages deleted from Async Storage')
    } catch (error) {
      console.log("Error deleting messages in Async Storage", error.message);
    }
  };

  const systemMessageJoined = () => ({
    _id: `${user.id}-${Date.now()}`,
    text: `${name} has entered the chat.`,
    createdAt: new Date(),
    system: true,
  });
  const systemMessageLeft = () => ({
    _id: `${user.id}-${Date.now()}`,
    text: `${name} has left the chat.`,
    createdAt: new Date(),
    system: true,
  });

  const getMessagesFromFirestore = () => {
    const messagesCollection = collection(db, COLLECTION_NAME);
    addDoc(messagesCollection, systemMessageJoined());
    const messagesQuery = query(
      messagesCollection,
      orderBy("createdAt", "desc")
    );
    const unsubscribeDb = onSnapshot(messagesQuery, fetchMessages);

    return () => {
      addDoc(messagesCollection, systemMessageLeft());
      unsubscribeDb();
    };
  };

  // Set the screen title to the user name entered in the start screen
  useEffect(() => {
    props.navigation.setOptions({ title: name });
    // subscribe user net info.
    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      // Set user online status.
      setOnline(state.isConnected);
    });
    return () => unsubscribeNetInfo();
  }, []);

  useEffect(() => {
    const execute = async () => {
      if (online) {
        await deleteMessages();
        return getMessagesFromFirestore();
      } else {
        await getMessagesFromStorage();
      }
    };
    execute();
  }, [online]);

  //Fecth messages from DB and setState
  const fetchMessages = (data) => {
    const messages = data.docs
      .map((doc) => doc.data())
      .map((data) => ({
        ...data,
        createdAt: data.createdAt.toDate(),
      }));
    setMessages(messages);
    saveMessages(messages);
  };

  const onSend = useCallback(
    (messages = []) => {
      const messagesCollection = collection(db, COLLECTION_NAME);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      messages.forEach((msg) => addDoc(messagesCollection, msg));
    },
    [setMessages]
  );

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
        }}
      />
    );
  };

  return (
    <View style={[{ backgroundColor: color }, styles.container]}>
      <GiftedChat
        renderBubble={renderBubble.bind()}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderInputToolbar={(props) => online && <InputToolbar {...props} />}
        user={{
          _id: user.id,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
        }}
      />

      {/* Avoid keyboard to overlap text messages on older Andriod versions */}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
