import React from 'react';
import { initializeApp } from "firebase/app";
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

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
    render(){
        return(
            
<Text>login</Text>
            
        );
    }
}
export default Login;