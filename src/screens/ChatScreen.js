import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView ,ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import InputBox from "../Components/InputBox";
import bg from "../../assets/images/BG.png";
import Message from "../Components/Message";
import { Platform } from "react-native";
import {API, graphqlOperation} from 'aws-amplify'
import {getChatRoom, listMessagesByChatRoom} from "../graphql/queries"
import {onCreateMessage, onUpdateChatRoom} from "../graphql/subscriptions"


const ChatScreen = () => {
  const [chatRoom,setChatRoom] = useState(null);
  const [messages,setMessages] = useState([]);
  

  const route = useRoute();
  const navigation = useNavigation();

  const chatroomID = route.params.id;

  //fetch chat room
  useEffect(() => {
    API.graphql(graphqlOperation(getChatRoom, {id: chatroomID})).then
    ((result) => setChatRoom(result.data?.getChatRoom)
    );

    const subscription = API.graphql(
      graphqlOperation (onUpdateChatRoom, { filter: { id: { eq: chatroomID } } })
      ).subscribe({
        next: ({ value }) => {
        setChatRoom((cr) => ({ 
            ...(cr || {}),
            ...value.data.onUpdateChatRoom,
        }));
      },
        error: (err) => console.warn(err),
        });
      
      return () => subscription.unsubscribe();
  }, [chatroomID]);



  //fetch messages//
  useEffect(() => {
    API.graphql(graphqlOperation(listMessagesByChatRoom, {
      chatroomID, 
      sortDirection: "DESC"
    })
    ).then((result) => {
      setMessages(result.data?.listMessagesByChatRoom?.items);
    });

    //Subscribe to messages
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage, { 
        filter: { chatroomID: { eq: chatroomID } },
      })
        ).subscribe({
      next: ({value}) => {
        console.log("New message")
        console.log(value);
        setMessages((m) => [value.data.onCreateMessage, ...m]);
      },
      error : (err) => console.warn(err),
    })
    return () => subscription.unsubscribe();
  }, [chatroomID]);

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

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
      <InputBox  chatroom={chatRoom}/>
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