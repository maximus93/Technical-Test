import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


export default function Feed({ navigation }) {
    const[token,setToken] = useState(null)
    const [post,setPost] = useState([])
    const [newpost, setNewpost] = useState('');

    const UploadPost = () => {
        axios.post('https://himadriapp.herokuapp.com/api/user/uploadPost', { newpost,token })
        .then(result => {
            setToken(null)
            console.warn('success')
        })
    }

    const detectisLogin= async ()=>{
        const token = await AsyncStorage.getItem('UserId')
        console.warn(token)
        setToken(token)
     }
     const logout =()=>{
        AsyncStorage.removeItem("UserId").then(()=>{
          navigation.replace("Login")
        })
     }

    useEffect(()=>{
        detectisLogin()
            axios.get('https://himadriapp.herokuapp.com/api/user/getPost', { token })
            .then(result => {
                setPost(result.data)
            })
       
     },[token,post])
    return(
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome  </Text>
            <TextInput
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            placeholder={"Upload Your Post."}
            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
            onChangeText = {(val) =>setNewpost(val)}
          />
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.btnText} onPress ={() => UploadPost()}>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.btnText} onPress={() => logout()}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View>
            <Text style={styles.welcomeanother}>Your Post  </Text>
            {
               post.length > 0
               ?
               <>
                    {
                    post.map((postData, postindex) => {
                        return(
                            <>
                                <Text style={styles.post}>{postData.postDesc}</Text>
                            </>
                        )
                    })
                    }
               </>
               :
               <>
                <Text style={styles.post}>No Post Yet!! </Text>
               </> 
            }
            
        
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1e90ff',
      alignItems: 'center',
    },
    welcome:{
      fontSize:30,
      color:"#fff"
    },
    post:{
        fontSize:20,
        color:"#fff",
        textAlign:'left',
        width:"90%"
    },
    welcomeanother:{
        fontSize:25,
        color:"#fff",
        marginTop:10
    },
    TextInputStyleClass:{
 
        textAlign: 'center',
        height: 50,
        borderWidth: 2,
        borderColor: '#9E9E9E',
        borderRadius: 20 ,
        backgroundColor : "#FFFFFF",
        height: 100,
        width:"90%"

         
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
      width:"90%",
      marginTop:10,
      textAlign:"right"
    }
  
  });