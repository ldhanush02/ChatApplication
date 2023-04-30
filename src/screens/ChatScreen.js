// src/screens/ChatScreen.js
import { useEffect } from "react";
import { ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import InputBox from "../Components/InputBox";
import bg from "../../assets/images/BG.png";
import Message from "../Components/Message";
import messages from "../../assets/data/messages.json";
// import { KeyboardAvoidingView } from "react-native-web";
import { Platform } from "react-native";

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS==='ios' ? 'padding' : 'height'} 
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 168} 
      style={styles.bg}
    >
      
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