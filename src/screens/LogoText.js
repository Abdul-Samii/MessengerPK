import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';

const LogoText=(props)=>{

    return(
       
            <View style={styles.view1}>
                <Text style={styles.v1Text}>Welcome to E-Messenger</Text>
                <Image style={styles.logo} source={require('../assets/logo.png')}/>
                <Text>{props.heading}</Text>
            </View>  
       
    )
}
const styles=StyleSheet.create({
    view1:{
        alignItems:'center',   
    },
    logo:{
        height:150,
        width:150
    },
    v1Text:{
        fontSize:22,
        padding:10
    },
    
})
export default LogoText;