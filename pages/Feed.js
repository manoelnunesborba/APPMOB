import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { firestore } from '@react-native-firebase/firestore';
import { initializeApp } from "firebase/app";
import { collection, getDocs } from "firebase/firestore"; 

<>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
</>

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


class Feed extends React.Component{
    render(){
        return (
            <View>
                <Text style={style.welcomeText}>
                    Bienvenue dans le Feed de Topik ! {"\n"} {"\n"}
                </Text>
                <Text style={style.Text}>
                    Voici la liste des Topiks :
                </Text>
                getFeedToScreen();
            </View>
               
        )
    }
}



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

var db = firestore();

function getFeedToScreen() {
    const querySnapshot = await getDocs(collection(db, "topics"));
    querySnapshot.forEach((doc) => {
     console.log(`${doc.titre} => ${doc.auteur}`);
    });
}
export default Feed;





const style = StyleSheet.create({
    welcomeText:{
        color:'black',
        fontWeight:'700',
        fontSize:16,
        textAlign:'center',
    },
    Text:{
        color:'black',
        fontWeight:'700',
        fontSize:16,
        textDecorationLine:'underline'
    }
});