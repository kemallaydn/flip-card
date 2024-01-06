import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import CustomView from "../component/customView";
import Container from "../component/container";
import Button from "../component/button";
import FlatListComponent from "../component/flatlist";
import { useRoute } from "@react-navigation/native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import axiosInstance from "../utils/axiosInstance";
import { GlobalContext } from "../context";

function Userİnfo({ navigation }: any, props: any) {
    const [selectedButton, setSelectedButton] = useState("Hesap Bilgileri");
    const route = useRoute();
    const { dataa } = route.params;
    console.log(dataa)
    const [data,setData]=useState([]);
    const [userData,setuserData]=useState([]);
    const getUserr = async () => {
        await axiosInstance.get(`users/${dataa}`).then((res) => {
            console.log(res.data);
            setData(res.data);
        }).catch((err) => {
            console.log(err);
        })
    
    }
    useEffect(()=>{
      getUserr();
    },[])
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      name: '',
  
    });
    const handleButtonPress = (buttonName: string) => {
      setSelectedButton(buttonName);
    };
    
  
    const showAlert = () => {
      Alert.alert(
        "Hesabı Sil",
        "Hesabınızı silmek istediğinize emin misiniz?",
        [
          { text: "EVET", onPress: () => handlePressOk() }
        ],
        { cancelable: false }
      );
    };
    const handlePressOk = () => {
      // Tamam'a basıldığında yapılacak işlemler
      axiosInstance.delete(`users/${authState.data.user._id}`).then((res) => {
        if (res.status === 200) {
          authDispatch({
            type: "LOGOUT_USER",
          })
        }
      }).catch((err) => { console.log(err) })
    };
    const handleChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
    };
    
    
    

    return (
        <Container>
            <CustomView>
                <View style={{ paddingTop: '10%' }}>
                    <Ionicons name="arrow-back" size={20} color="white" onPress={() => navigation.goBack()} />
                </View>
                <View style={styles.content}>
                    <Button
                        size="sm"
                        title="Hesap Bilgileri"
                        style={styles.button}
                        textStyle={selectedButton === "Hesap Bilgileri" ? { fontWeight: '400' } : { color: '#7E8087' }}
                        onPress={() => handleButtonPress("Hesap Bilgileri")}
                    />
                    <Button
                        size="sm"
                        title="Favoriler"
                        style={styles.button}
                        textStyle={selectedButton === "Favoriler" ? { fontWeight: '400' } : { color: '#7E8087' }}
                        onPress={() =>{
                          handleButtonPress("Favoriler")
                          setuserData(data.favorities)
                        }}
                    />
                    <Button
                        size="sm"
                        title="Bilinmeyen"
                        style={styles.button}
                        textStyle={selectedButton === "Bilinmeyen" ? { fontWeight: '400' } : { color: '#7E8087' }}
                        onPress={() => {
                          handleButtonPress("Bilinmeyen")
                          setuserData(data.unknowns)
                        }
                      
                      }
                    />
                    <Button
                        size="sm"
                        title="Öğrenilen"
                        style={styles.button}
                        textStyle={selectedButton === "Öğrenilen" ? { fontWeight: '400' } : { color: '#7E8087' }}
                        onPress={() => {
                          handleButtonPress("Öğrenilen")
                          setuserData(data.knowns)
                        }}
                    />
                    
                    <Button
                        size="sm"
                        title="Rapor"
                        style={styles.button}
                        textStyle={selectedButton === "Rapor" ? { fontWeight: '400' } : { color: '#7E8087' }}
                        onPress={() => handleButtonPress("Rapor")}
                    />
                </View>
                {selectedButton == "Hesap Bilgileri" &&
                    <View style={{ paddingTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: '400', color: "white" }}>Hesap Bilgileri</Text>
                        <Text style={{ color: "white", paddingTop: 10 }}>Kullanıcı Adı: {data.username}</Text>
                        <Text style={{ color: "white", paddingTop: 10 }}>İsim: {data.name}</Text>
                    </View>
                }
                {selectedButton != "Rapor" && selectedButton != "Hesap Bilgileri" &&
                    <View style={{ paddingRight: 13, paddingTop: '5%' }}>
                        <FlatListComponent data={userData} />
                    </View>
                }
                {selectedButton == "Rapor" &&
                <View style={{ paddingTop: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '400', color: "white" }}>Rapor</Text>
                    <Text style={{ color: "white", paddingTop: 10 }}>Doğru Cevap Sayısı: {data.knowns.length}</Text>
                    <Text style={{ color: "white", paddingTop: 10 }}>Yanlış Cevap Sayısı: {data.unknowns.length}</Text>
                </View>
}
            </CustomView>
        </Container>
    );
}
export default Userİnfo;
const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: '1%',
    },
    text: {
        color: 'white',
        marginVertical: '5%',
        fontSize: 10
    },
    button: {
        marginRight: '2%',
        marginTop: '2.5%',

    },
    itemContainer: {
        flex: 1,
        margin: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        backgroundColor: '#31304D',
    },
    title: {
        color: 'white',
        paddingTop: 2,
        fontSize: 15,
    },
})