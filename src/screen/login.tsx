import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Container from "../component/container";
import CustomView from "../component/customView";
import Button from "../component/button";
import { context } from "../context";
import axiosInstance from "../utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Account({navigation}:any){
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('token', value);
        } catch (e) {
          // saving error
        }
      };
    const [formData, setFormData] = useState({
        username: 'a',
        password: 'a',
   
    });
    const handleChange = (name, value) => {

        setFormData({ ...formData, [name]: value });
    };
    const {authDispatch}=context();
    const  login=async()=>{
       await axiosInstance.post("authentication/login",formData).then(async(res)=>{
        console.log(res.data.token.value);
       await storeData(res.data.token.value);

        authDispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
          })

       }).catch((err)=>{
        Alert.alert("Hata","Kullanıcı adı veya şifre yanlış")
       })
    }
    return(
        <Container>

            <CustomView>
                <View style={{paddingTop:"5%",justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.text}>HOŞGELDİNİZ</Text>
                </View>
                <Text style={styles.text}>HESABINIZA GİRİŞ YAPIN</Text>
                <TextInput placeholderTextColor={"#7E8087"}  placeholder="USERNAME" style={styles.textinput} onChangeText={(text) => handleChange('username', text)}/>
                <TextInput placeholderTextColor={"#7E8087"} placeholder="PAROLA" secureTextEntry keyboardType="visible-password" style={styles.textinput}onChangeText={(text) => handleChange('password', text)}/>
                <Button size="sm" title="OTURUM AÇ" onPress={()=>login()}/>
                <Text style={styles.text}>HESABINIZ YOK MU?</Text>
                <Button size="sm" title="KAYDOLUN" onPress={()=>{navigation.navigate("signup")}}/>
            </CustomView>
        </Container>
    )
}
export default Account;
const styles=StyleSheet.create({
    textinput: {
        borderBottomWidth:1,
        paddingBottom:'1%',
        marginBottom:'8.5%',
        borderBottomColor:'#7E8087',
        color:'white'
    },
    text: {
        color:'white',
        marginVertical:'10%'
    },
})