import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Container from "../component/container";
import CustomView from "../component/customView";
import Button from "../component/button";
import axiosInstance from "../utils/axiosInstance";
function SignUp({ navigation }: any) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',

    });
    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };
    const handleSignUp = () => {
        console.log(formData)
        axiosInstance.post("authentication/signup", formData).then(res => {
            navigation.navigate("login")
            console.log(res.status)
        }).catch(err => {
            console.log(err.response.data)
        })
    };
    return (
        <Container>
            <View style={{ paddingBottom:"10%",paddingTop: "5%", justifyContent:'space-between', alignItems: 'center' ,flexDirection:'row',marginHorizontal:10}}>
            <TouchableOpacity style={{}} onPress={() => { navigation.goBack()}}>
                    <Ionicons name="arrow-back-outline" color={"white"} size={15} />
                </TouchableOpacity>
                <Text style={styles.text}>KAYIT OL</Text>
                <View></View>
            </View>
            <CustomView>
               
                <TextInput  placeholderTextColor={"#7E8087"} placeholder="Kullancı Adı" style={styles.textinput} keyboardType="email-address" onChangeText={(text) => handleChange('username', text)} />
                <TextInput placeholderTextColor={"#7E8087"} placeholder="İsim" style={styles.textinput} keyboardType="email-address" onChangeText={(text) => handleChange('name', text)} />
                <TextInput placeholderTextColor={"#7E8087"} placeholder="PAROLA" style={styles.textinput} secureTextEntry keyboardType="visible-password" onChangeText={(text) => handleChange('password', text)} />
    
                <Button size="sm" title="HESAP OLUŞTUR" onPress={handleSignUp} />
            </CustomView>
        </Container>
    )
}
export default SignUp;
const styles =StyleSheet.create({
    textinput: {
        color:'white',
        borderBottomWidth:1,
        paddingBottom:'1%',
        marginBottom:'8.5%',
        borderBottomColor:'#7E8087'
    },
    text: {
        color:'white',
        marginVertical:'10%'
    },
})