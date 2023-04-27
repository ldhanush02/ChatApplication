// src/screens/ChatScreen.js

import { ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView } from "react-native";
import InputBox from "../Components/InputBox";
import bg from "../../assets/images/BG.png";
import Message from "../Components/Message";
import messages from "../../assets/data/messages.json";
// import { KeyboardAvoidingView } from "react-native-web";
import { Platform } from "react-native";

const ChatScreen = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS==='ios' ? 'padding' : 'height'} style={styles.bg}>
    <ImageBackground source={bg} style={styles.bg}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
				style={{ padding: 12 }}
				inverted
      />
      <InputBox />
    </ImageBackground> 
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});

export default ChatScreen;