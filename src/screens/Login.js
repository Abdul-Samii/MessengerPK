import React,{useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,KeyboardAvoidingView, Alert,ActivityIndicator} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import LogoText from './LogoText';
import Spinner from './Spinner';
import auth from '@react-native-firebase/auth';



const Login=({navigation})=>{


const [email,setEmail] = useState('');
const [key,setKey] = useState('');
const [loading,setLoading]=useState(false);

if(loading)
{
    return(
        <Spinner loading={loading}/>
    )
}


const LoginProcess=async()=>{
    setLoading(true);
    if(!email || !key )
    {
        alert("Fill all Field");
    }
    try{
    const result = await auth().signInWithEmailAndPassword(email,key)
    }
    catch(error)
    {
        alert("Something went wrong");
    }
    setLoading(false);
}

    return(
        <KeyboardAvoidingView behavior='position'>
            <LogoText heading='Login to Continue'/>
            <View style={styles.view2}>
               <TextInput 
               label='Email' 
               mode='outlined'
               value={email}
               onChangeText={(text)=>setEmail(text)}/>

               <TextInput 
               label='Password' 
               mode='outlined'
               value={key}
               onChangeText={(text)=>setKey(text)}
               secureTextEntry/> 

               <Button mode='contained' onPress={()=>LoginProcess()}>Login</Button>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Signup')}><Text style={styles.lastLine}>Don't have an Account?</Text></TouchableOpacity>
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
        
    }
})
export default Login;