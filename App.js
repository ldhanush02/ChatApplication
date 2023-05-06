import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/navigation';
import { Amplify , Auth, API, graphqlOperation} from 'aws-amplify';
import { withAuthenticator } from "aws-amplify-react-native" 
import awsconfig from "./src/aws-exports"
import { useEffect } from 'react';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';

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

  useEffect(() => {

 const syncUser = async () => {

  //get Auth user
  const authUser = await Auth.currentAuthenticatedUser({
    bypassCache: true,
  }); 
  console.log('1',authUser);

  //query the database using Auth user id(sub)
  console.log('6');
  const userData = await API.graphql(
    graphqlOperation(getUser, { id: authUser.attributes.sub})
  );
 
  console.log('5');
  console.log('2',userData); 

  if(userData.data.getUser){
    console.log('3',"User already exists in DB");
    return;
  }

  //IF THERE IS NO USER IN DB CREATE ONE

  const newUser = {
    id: authUser.attributes.sub,
    name: authUser.attributes.phone_number,
    status: "Hey , I am using Whatsapp",
  };

  console.log('4',newUser);

    const newUserResponse = await API.graphql(

    graphqlOperation(createUser, {input: newUser})

  );
 };
 
 syncUser();

  }, []);



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
