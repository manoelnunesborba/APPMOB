import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import firestore from '@react-native-firebase/firestore';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "",
  authDomain: "topik-3ede8.firebaseapp.com",
  projectId: "topik-3ede8",
  storageBucket: "topik-3ede8.appspot.com",
  messagingSenderId: "774648378964",
  appId: "1:774648378964:web:e92ddeb98eb174bc15dfc1",
  measurementId: "G-GNRSP1HQ59",
};
initializeApp(firebaseConfig);

const auth = getAuth();
const user = auth.currentUser;
if (user !== null) {
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;
  const uid = user.uid;
}

const Form = () =>{
return (
    <View>
        <TextInput 
        style={{height: 40}}
        placeholder="Taper le nouveau mail"
        />
    </View>
)
}

class UserDetail extends React.Component {
  render() {
    return (
      <View>
        <Text>Bienvenue dans la console utilisateurs</Text>
        <Text>Vous êtes </Text>
        <View style={style.buttonContainer}>
          <TouchableOpacity onPress={Form} style={style.button}>
            <Text 
            style={style.buttonText}>Modifier l'adresse mail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.button, style.buttonOutline]}>
            <Text style={style.buttonOutlineText}>Réinitialiser le mot de passe</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default UserDetail;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    backgroundColor: "white",
    width: "60%",

    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    borderRadius: 10,
    borderColor: "#FD405E",
    borderWidth: 2,
  },
  button: {
    padding: 15,
  },
  buttonText: {
    color: "#FD405E",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {},
  buttonOutlineText: {
    color: "#FD405E",
    fontWeight: "700",
    fontSize: 16,
  },
});
