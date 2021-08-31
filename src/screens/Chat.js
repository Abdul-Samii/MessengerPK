import React,{useEffect,useState} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const Chat=({user,route})=>{
    const [messages, setMessages] = useState([]);
    const {uid} = route.params;


    const GetMessages=async()=>{
         const docid = uid>user.uid? user.uid+ "-" +uid : uid+"-"+user.uid
        const querySnap = await firestore().collection('Chats')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt','desc')
        .get()
        const AllMsg = querySnap.docs.map(docSnap=>{
            return{
                ...docSnap.data(),
                createdAt:docSnap.data().createdAt.toDate()
            }
        })
        setMessages(AllMsg)
        
    }



  useEffect(() => {
             const docid = uid>user.uid? user.uid+ "-" +uid : uid+"-"+user.uid
             const msgRef =  firestore().collection('Chats')
             .doc(docid)
             .collection('messages')
             .orderBy('createdAt','desc')

            const unsubscribe=msgRef.onSnapshot((querySnap)=>{
                const AllMsg = querySnap.docs.map(docSnap=>{
                    const data=docSnap.data()
                    if(data.createdAt){
                    return{
                        ...docSnap.data(),
                        createdAt:docSnap.data().createdAt.toDate()
                    }
                }
                else{
                    return{
                        ...docSnap.data(),
                        createdAt:new Date()
                    }
                }
                })
                setMessages(AllMsg)
            })
            return()=>{
                unsubscribe()
              }
    
  },[])

















  const onSend = (messages)=> {
      const msg=messages[0]
      const myMsg={
          ...msg,
          sentBy:user.uid,
          sentTo:uid
      }
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const docid = uid>user.uid? user.uid+ "-" +uid : uid+"-"+user.uid
    firestore().collection('Chats')
    .doc(docid)
    .collection('messages')
    .add({...myMsg,createdAt:firestore.FieldValue.serverTimestamp()})
  }

  return (
      <View style={styles.container}>
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.uid,
      }}
    />
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})
export default Chat;