import React, { useEffect, useState, forceUpdate } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { getAuth } from "firebase/auth";

import {
  collection,
  doc,
  setDoc,
  getFirestore,
  getDoc,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  FieldValue,
  increment,
} from "firebase/firestore";
import { Component } from "react/cjs/react.production.min";

const Feed = () => {
  const db = getFirestore();
  const data = collection(db, "topics");
  const [formulaire, setFormulaire] = useState(false);
  const [topik, settopik] = useState([]);
  const [comments, setComments] = useState([]);
  const [contenu, setContenu] = useState("");
  const [titre, setTitre] = useState("");
  const [reLoad, setRe] = useState(true);
  const [afficherTopik, setAfficherTopik] = useState(false);
  const [codeTopik, setCodeTopik] = useState("");
  const [topikData, setTopikData] = useState("");
  const [ajouter, setAjouter] = useState(false);

  let code = "";

  useEffect(async () => {
    getData();
  }, []);

  async function handleCreateTopik() {
    const lesTopiks = collection(db, "topics");
    if (contenu == "" && titre == "") {
      alert("champs vides");
    }

    const test = await addDoc(collection(db, "topics"), {
      auteur: getAuth().currentUser.email,
      contenu: contenu,
      date: new Date(),
      existe: true,
      nb: 0,
      titre: titre,
    }).then((e) => {
      getData();
    });
  }

  async function handleCreateComment() {
    const test = await addDoc(collection(db, "commentaires"), {
      auteur: getAuth().currentUser.email,
      contenu: contenu,
      date: new Date(),
      topic: "topics/" + codeTopik,
    }).then((e) => {
      majNb(codeTopik);
      retourF();
    });
  }

  async function majNb(id){
    const queryMAJ = await updateDoc(doc(db, "/topics/" + id), {
      nb: increment(1)
    });
  }

  function click(id) {
    setAfficherTopik(true);
    setCodeTopik(id);
    code = id;
    getTopikData();
    getComments();
  }

  function convertTime(time) {
    return new Date(time.toDate()).toLocaleString();
  }

  async function getData() {
    let newId = getFirestore;
    const q = query(collection(db, "topics"), where("existe", "==", true));
    const querySnapshot = await getDocs(q);
    let topics = [];
    querySnapshot.forEach((doc) => {
      let retour = {
        key: doc.id,
        data: doc.data(),
      };
      topics.push(retour);
    });
    setFormulaire(true);
    settopik(topics);
  }

  function retourF() {
    setAfficherTopik(false);
    setCodeTopik();
    setComments();
    getData()
    setAjouter(false);
    setContenu("")
    setTitre("")
  }

  function ajout() {
    setAjouter(true);
  }

  async function getComments() {
    const q = query(
      collection(db, "commentaires"),
      where("topic", "==", "topics/" + code)
    );
    const querySnapshot = await getDocs(q);
    let com = [];
    querySnapshot.forEach((doc) => {
      let retour = {
        key: doc.id,
        data: doc.data(),
      };
      com.push(retour);
      setComments(com);
    });
  }

  async function getTopikData() {
    const docRef = query(collection(db, "topics"), where("existe", "==", true));
    const querySnapshot = await getDocs(docRef);

    querySnapshot.forEach((doc) => {
      let retour = {
        key: doc.id,
        data: doc.data(),
      };
      if (retour.key == code) {
        setTitre(retour.data.titre);
        setTopikData(retour.data.auteur);
      }
    });
  }

  if (!codeTopik) {
    return (
      <View style={style.container}>
        <View style={style.inputContainer}>
          <TextInput
            placeholder="Titre"
            value={titre}
            onChangeText={(text) => setTitre(text)}
            style={style.input}
          />
          <TextInput
            placeholder="Sous-titre"
            value={contenu}
            onChangeText={(text) => setContenu(text)}
            style={style.input}
          />
          <View style={style.buttonContainer}>
            <TouchableOpacity onPress={handleCreateTopik} style={style.button}>
              <Text style={style.buttonText}>Créer un Topik</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          style={style.list}
          data={topik}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => click(item["key"])}>
              <Text style={style.titre}>{item["data"]["titre"]}</Text>
              <Text style={style.auteur}>Auteur :{item["data"]["auteur"]}</Text>
              <Text style={style.date}>{convertTime(item["data"]["date"])}</Text>
              <Text style={style.nb}>{item["data"]["nb"]} commentaire(s)</Text>
              <Text style={[style.contenuFeed, style.contenu]}>{item["data"]["contenu"]}</Text>
            </TouchableOpacity>
          )}
        />

      </View>
    );
  } else {
    if (!ajouter) {
      return (
        <View style={style.container}>
          <Text style={style.titreTopic}>{titre}</Text>
          <Text style={style.auteurTopic}>Auteur :{topikData}</Text>
          <FlatList
            style={style.list}
            data={comments}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Text style={style.titre}>{item["data"]["auteur"]}</Text>
                <Text style={style.date}>
                  Date :{convertTime(item["data"]["date"])}
                </Text>
                <Text style={style.contenuTopic}>
                  {item["data"]["contenu"]}
                </Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity onPress={() => ajout()} style={style.button}>
            <Text style={style.buttonText}>Ajouter un commentaire</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => retourF()} style={style.button}>
            <Text style={style.buttonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={style.container}>
          <Text style={style.titreTopic}>{titre}</Text>
          <Text style={style.contenu}>Auteur : {topikData}</Text>
          <Text style={style.contenuTopic}>Ajout d'un commentaire</Text>

          <TextInput
            placeholder="Message"
            onChangeText={(text) => setContenu(text)}
            style={style.input}
          />
          <View style={style.buttonContainer}>
            <TouchableOpacity
              onPress={handleCreateComment}
              style={style.button}
            >
              <Text style={style.buttonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>

          <View style={style.buttonContainer}>
            <TouchableOpacity
              onPress={retourF}
              style={style.button}
            >
              <Text style={style.buttonText}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
};
export default Feed;
const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10
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
    width: 300,
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
    marginTop: 15,
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
  buttonOutlineText: {
    color: "#FD405E",
    fontWeight: "700",
    fontSize: 16,
  },
  contenu: {
    paddingBottom: 20,
  },
  titre: {
    color: "#FD405E",
    fontWeight: "700",
    fontSize: 18,
    fontFamily: "Arial",
  },
  list: {
    width: "100%",
    padding: 2,
  },
  contenuTopic: {
    fontSize: 24,
  },
  date: {
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },
  titreTopic: {
    fontSize: 64,
    color: "#FD405E",
  },
  auteurTopic: {
    fontSize: 14,
    paddingBottom: 5,
  },
  inputContainer:{
    padding: 10,
    alignItems: "center",
    // display: "none", ajouter un bouton pour afficher ce bloc plutôt que l'afficher tout le temps
  },
  contenuFeed:{
    fontStyle: "italic",
  }
});
