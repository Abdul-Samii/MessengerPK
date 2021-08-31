import React,{useState,useEffect} from 'react';
import {View,Text,FlatList,StyleSheet,Image,TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';


    
    

const Home=({user,navigation})=>{
    const [DATA,setData] = useState([]);
    
    const getData=async ()=>{
        const querySnap = await firestore().collection('users').where('uid','!=',user.uid).get()
        const  result = querySnap.docs.map(docSnap=>docSnap.data())
        setData(result);
    }
    useEffect(()=>{
        getData();
    })
    const ShowL=(item)=>{
        return(
            <TouchableOpacity onPress={()=>navigation.navigate('Chat',{name:item.name,uid:item.uid,status:typeof(item.status)=="string"?item.status: item.status.toDate().toString()})}>
                <View style={styles.chatCard}>
                <Image style={styles.dp} source={{uri:item.pic}}/>
                <View >
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{item.email}</Text>
                </View>
            </View>
            </TouchableOpacity>
            

        )
    }
return(
    <View>
        <FlatList data={DATA}
        keyExtractor={(item)=>item.uid}
        renderItem={({item})=>ShowL(item)}
        />
    </View>
)
}
const styles=StyleSheet.create({
    dp:{
        height:60,
        width:60,
        backgroundColor:'green',
        borderRadius:30
    },
    chatCard:{
        flexDirection:'row',
        margin:3,
        padding:4,
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor:'gray'
    },
    text:{
        fontSize:16,
        marginLeft:10,
    }
})
export default Home;