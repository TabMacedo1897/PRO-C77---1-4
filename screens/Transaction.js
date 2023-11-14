import React, { Component } from "react";

import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,

} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

const bgImage = require("./assets/background2.png")


export default class TransactionScreen extends Component {
  //variavéis de estado: estão sendo atualizadas sempre
  constructor(props) {
    super(props);
    this.state = {
      bookId: "",
      studentId: "",
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false
    };
  }
  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" é verdadeiro quando o usuário concedeu permissão
          status === "granted" é false quando o usuário não concedeu permissão
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    const { domState } = this.state;

    if (domState === "bookId") {
      this.setState({
        bookId: data,
        domState: "normal",
        scanned: true
      });
    } 
  };
  render(){
    return(
      <View style={styles.container}>
        <ImageBackground source ={bgImage} style={styles.bgImage}>
          <View style={styles.textinputContainer}>

            <TextInput style={styles.textinput} value={bookId} 
            placeholder={"Digite o ID do Livro"}/>
            <TouchableOpacity>
              <Text>Digitalizar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textinputContainer}>
            <TextInput style={styles.textinput}value={studentId} placeholder={"Digite o seu ID"}/>
            <TouchableOpacity>
              <Text>Digitalizar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  }
}


  const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#FFFFFF"
 },
 lowerContainer: {
   flex: 0.5,
   alignItems: "center"
 },
 textinputContainer: {
   borderWidth: 2,
   borderRadius: 10,
   flexDirection: "row",
   backgroundColor: "#9DFD24",
   borderColor: "#FFFFFF"
 },
 textinput: {
   width: "57%",
   height: 50,
   padding: 10,
   borderColor: "#FFFFFF",
   borderRadius: 10,
   borderWidth: 3,
   fontSize: 18,
   backgroundColor: "#5653D4",
   color: "#FFFFFF"
 },
 scanbutton: {
   width: 100,
   height: 50,
   backgroundColor: "#9DFD24",
   borderTopRightRadius: 10,
   borderBottomRightRadius: 10,
   justifyContent: "center",
   alignItems: "center"
 },
 scanbuttonText: {
   fontSize: 20,
   color: "#0A0101",
 },

  
});
