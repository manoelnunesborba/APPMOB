import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import FooterMenu from './../component/FooterMenu.js'
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
class Login extends React.Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:""
        }
    }
    handleSingup(e){
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.state.email, this.state.email)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email)
            })
            .catch(error=> alert(error))
    }
    render(){
        return(
            <KeyboardAvoidingView
            style={style.container}
            behavior="padding"
            >
                <View style={style.inputContainer}>
                    <TextInput
                    placeholder='Email'
                    value={this.state.email}
                    onChangeText={text => this.setState({email:text})}
                    style={style.input}
                    />
                    <TextInput
                    placeholder='Password'
                    value={this.state.password}
                    onChangeText={text => this.setState({password:text})}
                    style={style.input}
                    secureTextEntry
                    />
                </View>
                <View style={style.buttonContainer}>
                    <TouchableOpacity
                    onPress={() => {}}
                    style={style.button}
                    >
                        <Text style={style.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={evt => {this.handleSingup(evt)}}
                    style={[style.button, style.buttonOutline]}
                    >
                        <Text style={style.buttonOutlineText}>Créer un compte</Text>
                    </TouchableOpacity>
                </View>
                
            </KeyboardAvoidingView>
            
            
        );
    }
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