import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { db } from "../app-firebase/firebase";

/**
 * Reference of the messages collection.
 */

export default function Chat(props) {
  let { name, color, user } = props.route.params;
  const [messages, setMessages] = useState([]);

  const messagesCollection = collection(db, "messages");
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
  // Set the screen title to the user name entered in the start screen
  useEffect(() => {
    props.navigation.setOptions({ title: name });
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
  }, []);

  //Fecth messages from DB and setState
  const fetchMessages = (data) => {
    const messages = data.docs
      .map((doc) => doc.data())
      .map((data) => ({
        ...data,
        createdAt: data.createdAt.toDate(),
      }));
    setMessages(messages);
  };

  const onSend = useCallback(
    (messages = []) => {
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
