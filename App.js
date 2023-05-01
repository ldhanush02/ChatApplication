import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/navigation';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from "aws-amplify-react-native" 
import awsconfig from "./src/aws-exports"
//import ChatListItem from './src/Components/ChatListItem';

Amplify.configure({...awsconfig, Analytics: {disabled:true}});

/*const chat = {
  id: "1",
  user: {
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
    name: "Lukas",
  },
  lastMessage: {
    text: "Oke",
    createdAt: "07:30",
  },
};*/

function App() {
  return (
    <View style={styles.container}>
      <Navigator/>

      {/* <ChatsScreen/> */ }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App);
