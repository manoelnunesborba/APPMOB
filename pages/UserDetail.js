import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert, Form } from "react-native";
import { KeyboardAvoidingView } from "react-native";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";

import { useNavigation } from '@react-navigation/core'
import { firebase } from "../firebase/config";
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword,
  AuthCredential,
  EmailAuthCredential,
} from "firebase/auth";


const UserDetail = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [nouveauEmail, setNEmail] = useState('');
const [nouveauMdp, setNPassword] = useState('');
const [relog, setRelog] = useState(false);
const [formulaire, setFormulaire] = useState(false);
const navigation = useNavigation();

const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid;
    }

    
function changeEmail(){
    const auth = getAuth();
    updateEmail(auth.currentUser, nouveauEmail).then(() => {
        // Email updated!
        alert("Vous avez bien changé votre email !")
        // ...
      }).catch((error) => {
          alert(error)
        // An error occurred
        // ...
      });
}

function changeMDP(){
    const auth = getAuth();

    const user = auth.currentUser;

    updatePassword(user, nouveauMdp).then(() => {
        alert("Vous avez changé votre mdp")
    }).catch((error) => {
        alert(error);
    });
}


  
  const Form = () => {
    return (
      <View>
        <TextInput
          placeholder="Tapez le nouvel email"
          onChangeText={(text) => setNEmail(text)}
          style={style.input}
        />

    <View style={style.buttonContainer}>
          <TouchableOpacity onPress={() => changeEmail()} style={style.button}>
            <Text style={style.buttonText}>Changer le mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  function logout(){
    console.log("out")
    const auth = getAuth();
    auth.signOut().then(() => {
        navigation.replace("login")
    })

  }
  /*function login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, nvEmail, nvPassword)
      .then((userCredential) => {
        updatePassword(userCredential.user, nvMotDePasse).then(() => {
          // Email updated!
          // ...
          console.log("MDP modifié");
        });

        console.log("connecté autant que", user.email);
        // ...
      })
      .catch((error) => alert(error));
  }*/

  const relogF = () => {
    return (
      <View>
        <View style={style.inputContainer}>
          <TextInput
            placeholder="Nouveau mot de passe"
            onChangeText={(text) => setNPassword(text)}
            style={style.input}
            secureTextEntry
          />
        </View>
            <View 
            style={style.buttonContainer}>
            <TouchableOpacity
            onPress={() => changeMDP()}
            style={style.button}>
                <Text
                style={style.buttonText}>Changer mot de passe </Text>
            </TouchableOpacity>
            </View>
      </View>
    );
  };

    return (
      <View>
        <KeyboardAvoidingView style={style.container} behavior="padding">
          <Text>Bienvenue dans la console utilisateurs</Text>
          <View style={style.buttonContainer}>
            <TouchableOpacity
              onPress={() => setFormulaire(true)}
              style={style.button}
            >
              <Text style={style.buttonText}>Modifier l'adresse mail</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRelog(true)}
              style={[style.button, style.buttonOutline]}
            >
              <Text style={style.buttonOutlineText}>
                Réinitialiser le mot de passe
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => logout()}
              style={[style.button, style.buttonOutline]}
              >
                <Text style={style.buttonOutlineText}>
                  Se déconnecter
                </Text>
              </TouchableOpacity>
            {formulaire ? Form() : null}
            {relog ? relogF() : null}
          </View>
        </KeyboardAvoidingView>
      </View>
    );
    //TODO: ajouter l'action de déconnexion
  
}
export default UserDetail;

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
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
  },buttonText: {
    color: "#FD405E",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#FD405E",
    fontWeight: "700",
    fontSize: 16,
  },
});
