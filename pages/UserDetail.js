import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert, Form } from "react-native";
import { KeyboardAvoidingView } from "react-native";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";

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

const auth = getAuth();
const user = auth.currentUser;
if (user !== null) {
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;
  const uid = user.uid;
}

let nvEmail = "";
let nvMail="";
let nvPassword = "";
let nvMotDePasse = "";

function changeEmail(text) {
  nvMail=text;
}

function setEmail(text) {
  nvEmail = text;
}
function setPassword(text) {
  nvPassword = text;
}
function newPassword(text) {
  nvMotDePasse = text;
}
class UserDetail extends React.Component {
  state = { relog: false };

  Form = () => {
    return (
      <View>
        <TextInput
          placeholder="Tapez votre email"
          onChangeText={(text) => setEmail(text)}
          style={style.input}
        />
        <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            style={style.input}
            secureTextEntry
          />
        <TextInput
          placeholder="Tapez le nouvel email"
          onChangeText={(text) => changeEmail(text)}
          style={style.input}
        />

    <View style={style.buttonContainer}>
          <TouchableOpacity onPress={this.nouveauMail} style={style.button}>
            <Text style={style.buttonText}>Changer le mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  login() {
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
  }

  relog = () => {
    return (
      <View>
        <View style={style.inputContainer}>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            style={style.input}
          />
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            style={style.input}
            secureTextEntry
          />
          <TextInput
            placeholder="Nouveau mot de passe"
            onChangeText={(text) => newPassword(text)}
            style={style.input}
            secureTextEntry
          />
        </View>
        <View style={style.buttonContainer}>
          <TouchableOpacity onPress={this.login} style={style.button}>
            <Text style={style.buttonText}>Changer mdp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        <KeyboardAvoidingView style={style.container} behavior="padding">
          <Text>Bienvenue dans la console utilisateurs</Text>
          <View style={style.buttonContainer}>
            <TouchableOpacity
              onPress={() => Alert.alert("Hello")}
              style={style.button}
            >
              <Text style={style.buttonText}>Modifier l'adresse mail</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ relog: true })}
              style={[style.button, style.buttonOutline]}
            >
              <Text style={style.buttonOutlineText}>
                Réinitialiser le mot de passe
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.setState({ disconnect: true})}
              style={[style.button, style.buttonOutline]}
              >
                <Text style={style.buttonOutlineText}>
                  Se déconnecter
                </Text>
              </TouchableOpacity>
            {this.state.Form ? this.Form() : null}
            {this.state.relog ? this.relog() : null}
          </View>
        </KeyboardAvoidingView>
      </View>
    );
    //TODO: ajouter l'action de déconnexion
  }
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
  },
  /*,
  ,buttonText: {
    color: "#FD405E",
    fontWeight: "700",
    fontSize: 16,
  },
  
  
  ,
  
  buttonOutlineText: {
    color: "#FD405E",
    fontWeight: "700",
    fontSize: 16,
  },*/
});
