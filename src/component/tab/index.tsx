import { Text, TouchableOpacity, View } from "react-native";
import Container from "../container";
import styles from "./style"
import React, { useContext, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../context";
const Tab= ({ label, onPress, isSelected}:any) => {
  const tabItems=["home-sharp","heart-circle-outline", "add-sharp","pencil-sharp","person-circle"]
  const tabItems2=["ANA SAYFA","HESAP"]
  const  {navigate}=useNavigation(); 
  const {authState}=useContext(GlobalContext)

  const press=(index:any)=>{
    switch (index) {
      case 0:
        authState.data.user.role!="Admin"  ? 
         navigate("home") : navigate("AdminScreen")
        break;
      case 1:

         navigate("SignInAccount")
        break;
      default:
        break;
    }
  }
  return (
    <View style={styles.container}>
      {tabItems2.map((item,index)=>(
          <TouchableOpacity key={index} onPress={()=>press(index)}>
           
            {
              item =="+" ? <Ionicons name="add-sharp" size={25} color={"white"}/>: <Text style={styles.text}>{item}</Text>
            }
          </TouchableOpacity>
      ))}
    </View>
  );
};
export default Tab;