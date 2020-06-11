import React,{ useState,useEffect } from 'react';
import { Button, View,AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import Feed from './Feed';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function MyloggedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export default function App(navigation) {
  const [isloggedin,setLogged] = useState(null)
  const detectLogin= async ()=>{
    const token = await AsyncStorage.getItem('UserId')
    if(token){
        setLogged(true)
       
    }else{
        setLogged(false)
        
    }
 }
useEffect(()=>{
    detectLogin()
 },[])
  return (
    <NavigationContainer>
      {
        isloggedin 
        ?
        <MyloggedStack />
        :
        <MyStack />
      }
      
    </NavigationContainer>
  );
}
