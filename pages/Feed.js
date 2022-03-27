import React, { useEffect, useState, forceUpdate } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, View, Button, Alert, FlatList, TouchableHighlight  } from 'react-native';
import { getAuth } from "firebase/auth";

import { collection, doc, setDoc, getFirestore, getDoc, query, where,getDocs, addDoc  } from "firebase/firestore"; 
import { Component } from "react/cjs/react.production.min";
const Feed = () =>{
    const db = getFirestore();
    const data = collection(db, "topics");
    const [formulaire, setFormulaire] = useState(false);
    const [topik, settopik] = useState([]);
    const [contenu, setContenu] = useState('');
    const [titre, setTitre] = useState('');
    const [reLoad, setRe] = useState(true);
    const [afficherTopik, setAfficherTopik] = useState(false);
    const [codeTopik, setCodeTopik] = useState("");



    useEffect(async () =>{
      console.log("test")
      getData();
    },[])


    async function handleCreateTopik(){
      const lesTopiks = collection(db, "topics");
      if(contenu=='' && titre==''){
        alert("champs vides")
      }

      const test = await addDoc(collection(db, "topics"), {
         auteur:getAuth().currentUser.email,
         contenu:contenu,
         date:new Date(),
         existe:true,
         titre:titre,
      }).then(e => {
          getData()
        })
    }

    function click(id){
      setAfficherTopik(true)
      setCodeTopik(id)
    }
    async function getData(){
      let newId = getFirestore;
      console.log(newId)
      console.log("test")
      const q = query(collection(db, "topics"), where("existe", "==", true));
      const querySnapshot = await getDocs(q);
      let topics=[]
      querySnapshot.forEach((doc) => {
      const retour = {
        key:doc.id,
        data:doc.data()
      }
      topics.push(retour)
      //J'ai tous les topic mtn faut juste afficher
      });
      setFormulaire(true)
      settopik(topics)
    }
    function retour(){
      setAfficherTopik(false)
    }

    if(!codeTopik){
      return (
        <View style={style.container}
              
        >
          <FlatList
          style={style.list}
          data={topik}
          renderItem={({item})=>(
              <TouchableOpacity 
              onPress={() => click(item["key"])}
              >
                <Text style={style.titre}>{item["data"]["titre"]}</Text>
                <Text style={style.auteur}>Auteur :{item["data"]["auteur"]}</Text>
                <Text style={style.contenu}>{item["data"]["contenu"]}</Text>
              
              
              </TouchableOpacity >
          )}
          />

          <View style={style.inputContainer}>
                  <TextInput
                  placeholder='Titrre'
                  value={titre}
                  onChangeText={text => setTitre(text)}
                  style={style.input}
                  />
                  <TextInput
                  placeholder='contenu'
                  value={contenu}
                  onChangeText={text => setContenu(text)}
                  style={style.input}
                  />
                  <View style={style.buttonContainer}>
                  <TouchableOpacity
                  onPress={handleCreateTopik}
                  style={style.button}
                  >
                      <Text style={style.buttonText}>Créer un Topik</Text>
                  </TouchableOpacity>
              </View>
              </View>
        </View>
      )
    }else{
      return(
        <View style={style.container}>
          <Text>{codeTopik}</Text>
          <TouchableOpacity
                  onPress={() => retour()}
                  style={style.button}
                  >
                      <Text style={style.buttonText}>Retour</Text>
                  </TouchableOpacity>

        </View>
      )
    }
      
   
       
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
      width:300,
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
    },contenu:{
      paddingBottom:20,
      
    },
    titre:{
      color: "#FD405E",
      fontWeight: "700",
      fontSize: 16,
    },
    list:{
      paddingBottom:20,
    }

  });