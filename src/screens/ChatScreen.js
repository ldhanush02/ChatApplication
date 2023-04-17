// src/screens/ChatScreen.js

import { ImageBackground, StyleSheet, FlatList } from "react-native";
import bg from "../../assets/images/BG.png";
import Message from "../Components/Message";
import messages from "../../assets/data/messages.json";

const ChatScreen = () => {
  return (
    <ImageBackground source={bg} style={styles.bg}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
				style={{ padding: 12 }}
				inverted
      />
    </ImageBackground> 
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});

export default ChatScreen;