import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged   } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()

    useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth,user => {
        if (user) {
            console.log("connecté", user.email)
          navigation.replace("Home")
        }
      })
  
      return unsubscribe
    }, [])



const firebaseConfig = {
    apiKey: "AIzaSyD2XKLHd0H2O0l2Ae_qXjca7KNkn3U_IuI",
    authDomain: "topik-3ede8.firebaseapp.com",
    projectId: "topik-3ede8",
    storageBucket: "topik-3ede8.appspot.com",
    messagingSenderId: "774648378964",
    appId: "1:774648378964:web:e92ddeb98eb174bc15dfc1",
    measurementId: "G-GNRSP1HQ59"
  };
  const app = initializeApp(firebaseConfig);

        
    const handleSignUp = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email)
            })
            .catch(error=> alert(error));
    }



    const handleLogin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            const user = userCredential.user;
            alert('réussit')
            console.log("connecté autant que", user.email)
    // ...
        })
        .catch(error=> alert(error))
    }
        return(
            <KeyboardAvoidingView
            style={style.container}
            behavior="padding"
            >
                <Text style={style.buttonText}>
                    Authentification
                </Text>

                <View style={style.inputContainer}>
                    <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={style.input}
                    />
                    <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={style.input}
                    secureTextEntry
                    />
                </View>
                <View style={style.buttonContainer}>
                    <TouchableOpacity
                    onPress={handleLogin}
                    style={style.button}
                    >
                        <Text style={style.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.buttonContainer}>
                    <TouchableOpacity
                    onPress={handleSignUp}
                    style={[style.button, style.buttonOutline]}
                    >
                        <Text style={style.buttonOutlineText}>Créer un compte</Text>
                    </TouchableOpacity>
                </View>
                
            </KeyboardAvoidingView>
            
            
        );
    }
export default Login;

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    inputContainer:{
        width:'80%',
    }, 
    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
    }, 
    buttonContainer:{
        backgroundColor:'white',
        width:'60%',

        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
        borderRadius:10,
        borderColor:'#FD405E',
        borderWidth:2,

    },
    button:{
        padding:15
    },
    buttonText:{
        color:'#FD405E',
        fontWeight:'700',
        fontSize:16,
    },
    buttonOutline:{
    },
    buttonOutlineText:{
        color:'#FD405E',
        fontWeight:'700',
        fontSize:16,
    }
});