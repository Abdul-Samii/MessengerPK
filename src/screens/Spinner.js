import React,{useState} from 'react';
import { View,Text,ActivityIndicator,StyleSheet } from 'react-native';


const Spinner=(props)=>{

    

    if(props.loading)
{
    return(
        <View style={styles.load}> 
        <ActivityIndicator size='large' color='green' />
        </View>
    )
}
}
const styles=StyleSheet.create({
    load:{
        justifyContent:'center',
        flex:1
    }
})
export default Spinner;