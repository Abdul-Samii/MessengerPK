import React,{useState,useEffect} from 'react';
import {View,Text} from 'react-native';
import {DefaultTheme,Provider as PaperProvider} from 'react-native-paper';
import { NavigationContainer,DefaultTheme as DefaultThemeNav } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';


//screens
import Signup from './screens/Signup';
import Login from './screens/Login';
import Home from './screens/Home';
import Chat from './screens/Chat';


const theme={
  ...DefaultTheme,
  roundness:2,
  colors:{
    ...DefaultTheme.colors,
    primary:'green'
  },
};


const Stack = createNativeStackNavigator();
const StackNav=({user})=>{
  return(
    <Stack.Navigator screenOptions={{
      headerTintColor:'green'
    }}>
      {user?
      <>
      <Stack.Screen name='Home' 
      options={{
        headerRight:()=><MaterialIcons
        name="account-circle"
        size={34}
        color="green"
        style={{marginRight:10}}
        onPress={()=>{
          firestore().collection('users')
        .doc(user.uid)
        .update({
          status:firestore.FieldValue.serverTimestamp()
        }).then(auth().signOut())
        }}
        />,
        title:"E-Messenger"
        
        
      }}
      >
        {props=><Home {...props} user={auth().currentUser}/>}
      </Stack.Screen>
      <Stack.Screen name="Chat" options={({ route }) => ({ title:route.params.status })}>
          {props => <Chat {...props} user={auth().currentUser} /> }
        </Stack.Screen>
      </>
      :
      <>
      <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
      <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
      </>
    }
      
    </Stack.Navigator>
  )
}

const AuthNavigator=()=>{
  const [user,setUser] = useState(false);
  useEffect(()=>{
    const unregister = auth().onAuthStateChanged(userExist=>{
      if(userExist)
      {
        setUser(userExist);
        firestore().collection('users')
        .doc(userExist.uid)
        .update({
          status:"online"
        })
      }
      else{
        setUser('');
      }     
    })
    return()=>{
      unregister()
    }
  },[])
    return(
      <NavigationContainer >
        <StackNav user={user}/>     
      </NavigationContainer>
    )
  }



  
  //App component
const App = () => {

  return(
    <PaperProvider theme={theme}>
      <AuthNavigator/>
    </PaperProvider>
  )
}
export default App;


