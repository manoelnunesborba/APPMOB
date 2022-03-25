import React from 'react';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { collection, doc, setDoc, getFirestore, getDoc, query, where,getDocs  } from "firebase/firestore"; 
const Feed = () =>{
    const db = getFirestore();
    const data = collection(db, "topics");

    async function test(){
        console.log("start")
        const q = query(collection(db, "topics"), where("existe", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        //J'ai tous les topic mtn faut juste afficher
        });
    }


        return (
            <View style={style.buttonContainer}>
                <TouchableOpacity onPress={() => test()} style={style.button}>
                <Text style={style.buttonText}>Load Data</Text>
                </TouchableOpacity>
            </View>
            
        )
}
export default Feed;
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