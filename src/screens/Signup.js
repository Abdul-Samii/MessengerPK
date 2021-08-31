import React,{useState} from 'react';
import {View,Text,StyleSheet,Image,Alert,KeyboardAvoidingView,TouchableOpacity,ActivityIndicator} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


import LogoText  from './LogoText';
import { alternatives } from 'joi';
import { loadConfig } from 'browserslist';
import Spinner from './Spinner';


const Signup=({navigation})=>{


const [email,setEmail] = useState('');
const [name,setName] = useState('');
const [key,setKey] = useState('');
const [pic,setPic] = useState(null);
const [flag,setFlag] = useState(false);
const [loading,setLoading] = useState(false);




if(loading)
{
    return(
        <Spinner loading={loading}/>
    )
}




const ImgSelect=()=>{
    launchImageLibrary({quality:0.5},(fileobj)=>{
        const uploadTask = storage().ref().child(`/DP/${Date.now()}`).putFile(fileobj.assets[0].uri);
        uploadTask.on('state_changed',
        (snapshot)=>{
            var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
            if(progress==100) 
            {
            alert("Image Uploaded");
            }
        },
        (error)=>{
            alert("Error Uploading Image");
        },
        ()=>{
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                setPic(downloadURL);
            })
        }
        )
    })
}



const signupProcess=async()=>{
    setLoading(true);
    if(!email || !key || !name || !pic)
    {
        alert("Fill all Fields");
    }

    try{
    const result=await auth().createUserWithEmailAndPassword(email,key);
    firestore().collection('users').doc(result.user.uid).set({
        name,
        email,
        password:key,
        pic,
        uid:auth().currentUser.uid

    })
    }
    catch(error)
    {
        alert("Something went wrong");
    }
    setLoading(false);

}


    return(
        <KeyboardAvoidingView behavior='position'>
            <LogoText heading="Signup to Continue"/>

            {!flag?
            <View style={styles.view2}>
                <TextInput 
                label='Email' 
                mode='outlined'
                value={email}
                onChangeText={(text)=>setEmail(text)}
                
                />

                <TextInput 
                label='Password' 
                mode='outlined' 
                secureTextEntry
                value={key}
                onChangeText={(text)=>setKey(text)}
                />

                <Button mode='contained' onPress={()=>
                    {
                        email&&key? setFlag(true):Alert.alert('Email & Password must be fill')
                    }}>Next</Button>
            </View>
        : 
        <View style={styles.view2}>
            <TextInput
            label='Name'
            value={name}
            onChangeText={(text)=>setName(text)}
            mode='outlined' 
            
            />

            <Button mode='contained' onPress={()=>ImgSelect()}>Upload Image</Button>
            <Button mode='contained' onPress={()=>setFlag(false)}>Back</Button>
            <Button mode='contained' disabled={pic?false:true} onPress={()=>signupProcess() }>Signup</Button>

        </View>
        } 
        <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={styles.lastLine}>Already have an Account?</Text></TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles=StyleSheet.create({
    
    view2:{
        paddingHorizontal:30,
        justifyContent:'space-evenly',
        height:'50%',
        
    },
    lastLine:{
        textAlign:'center',
        
    },
    load:{
        justifyContent:'center',
        flex:1
    }
})
export default Signup;