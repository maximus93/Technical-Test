import React, { useState } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
export default function Login({ navigation }) {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const redirectLogin = async (response) => {
    try {
      await AsyncStorage.setItem('userId', response.data._id)
      navigation.navigate('Feed')
    }catch (e) {
     console.warn("Error")
    }
  }

  const LoginUser = () => {
   
    axios.post('https://himadriapp.herokuapp.com/api/user/login',{email,password})
    .then(response => {
      redirectLogin(response)
    })
  }


    return (
        <View style={styles.container}>
        <Text style={styles.welcome}>Login To My App</Text>
        <TextInput 
        style={styles.input}
        placeholder="Email"
        onChangeText ={(val) => setEmail(val)}
        />
           <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText = {(val) =>setPassword(val)}
        />
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.userBtn} onPress ={() => LoginUser()}>
                <Text style={styles.btnText} >Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.btnText}>Signup</Text>
            </TouchableOpacity>
        </View>
      </View>

    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1e90ff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcome:{
      fontSize:30,
      color:"#fff"
    },
    input:{
      width:"90%",
      backgroundColor: '#fff',
      padding:10,
      marginBottom:10,
      borderRadius:5,
      marginTop:10
    },
    userBtn:{
      backgroundColor:"#FFD700",
      padding:15,
      width:"45%"
    },
    btnText:{
      fontSize:16,
      textAlign:"center"
    },
    btnContainer:{
      flexDirection:"row",
      justifyContent:"space-between",
      width:"90%"
    }
  
  });