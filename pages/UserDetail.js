import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert, Form } from "react-native";
import { KeyboardAvoidingView } from 'react-native';

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";

import { firebase } from "../firebase/config";
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
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

function changeEmail() {
  updateEmail(auth.currentUser, nvEmail)
    .then(() => {
      // Email updated!
      // ...
      console.log("Email modifié");
    })
    .catch((error) => {
      // An error occurred
      // ...
      console.log(error);
    });
}

function setEmail(text) {
  nvEmail = text;
}

class UserDetail extends React.Component {
  state = { relog: false };

  Form = () => {
    return (
      <View>
        <TextInput
          placeholder="Tapez le nouvel email"
          onChangeText={(text) => setEmail(text)}
          style={style.input}
        />
        <TouchableOpacity onPress={() => changeEmail()} style={style.button}>
          <Text style={style.buttonOutlineText}>Valider</Text>
        </TouchableOpacity>
      </View>
    );
  };

  relog = () => {
    const handleLogin = () => {
      const credentials = new AuthCredential()
      reauthenticateWithCredential()
        .then((userCredential) => {
          user = userCredential.user;
          alert("réussit");
          console.log("connecté autant que", user.email);
          // ...
        })
        .catch((error) => alert(error));
    };
    
    return (
      <View>
        <KeyboardAvoidingView style={style.container} behavior="padding">
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
          </View>
          <View style={style.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={style.button}>
              <Text style={style.buttonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  };

  render() {
    return (
      <View>
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
          {this.state.Form ? this.Form() : null}
          {this.state.relog ? this.relog() : null}
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
