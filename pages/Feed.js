import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { initializeApp } from "firebase/app";

<>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
</>


class Feed extends React.Component{
    render(){
        return (
            <>
                <Text style={style.welcomeText}>
                    Bienvenue dans le Feed de Topik ! {"\n"} {"\n"}
                </Text>
                <Text style={style.Text}>
                    Voici la liste des Topiks :
                </Text>
            </>
               
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

const topikCollection = firestore().collection('topics').get().then(querySnapshot => {
    console.log('Topik total : ', querySnapshot.size);
    querySnapshot.forEach(documentSnapshot => {
        consoele.log('Titre du topik : ', documentSnapshot.titre);
    });
});

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