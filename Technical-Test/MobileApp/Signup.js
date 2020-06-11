import React,{ useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Signup({ navigation }) {
    const [name,SetName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirectSignup = async (result) => {
      try {
        await AsyncStorage.setItem('userId', result.data)
        navigation.navigate('Feed')
      }catch (e) {
       console.warn("Error")
      }
    }

    const SignupUser = () => {
      axios.post('https://himadriapp.herokuapp.com/api/user/signup',{name,email,password})
      .then(result => {
        redirectSignup(result)
      })
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Signup To My App </Text>
        <TextInput 
        style={styles.input}
        placeholder="Name"
        onChangeText = {(val) => SetName(val)}
        />

      <TextInput 
      style={styles.input}
      placeholder="Email"
      onChangeText = {(val) => setEmail(val)}
      />
      <TextInput 
      style={styles.input}
      placeholder="Password"
      secureTextEntry
      onChangeText = {(val) => setPassword(val)}
      />
      <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} >
              <Text style={styles.btnText} onPress ={() => SignupUser()}>Signup</Text>
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