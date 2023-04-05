import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function ChatListItem() {
  return (
    <View style={styles.container}>
    <Image source ={{ uri:"https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=" }}
    style={styles.pic}/>
    <View style={styles.content}>
    <View style={styles.UserInfo}>
    <Text style={styles.Name} numberOfLines={1}>Lokam Dhanush</Text>
    <Text style={styles.subtext}>10:00</Text>
    </View>
    <Text style={styles.subtext} numberOfLines={2}  >Hai</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    marginHorizontal:10,
    marginVertical:5
  },
  pic:{
    width :60,
    height:60,
    borderRadius:50,
  },
  content:{
    flex:1,
    marginHorizontal:10,
    borderBottomColor:"lightgray",
    borderBottomWidth:StyleSheet.hairlineWidth,
  },
  subtext:{
    fontWeight:'310',
    color:'grey'
  },
  Name:{
    flex:1,
    fontWeight:'bold'
  },
  UserInfo:{
    flexDirection:'row',
    marginBottom:5
  },

});
