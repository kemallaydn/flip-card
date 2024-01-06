import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Alert, TextInput } from "react-native";
import CustomView from "../component/customView";
import Container from "../component/container";
import Button from "../component/button";
import FlatListComponent from "../component/flatlist";
import axiosInstance from "../utils/axiosInstance";
import { context } from "../context";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyModal from "../component/modal";


function SignInAccount({ navigation }: any) {
  const [selectedButton, setSelectedButton] = useState("Hesap Bilgileri");
  const [data, setData] = useState([]);
  const { authState, authDispatch } = context();
  const [rapor,setRapor]=useState({dogru:0,yanlis:0});
  const getcard = async() => {
    await axiosInstance.get("cards").then(async (res) => {
      console.log(res.data.knowns);
        setRapor({dogru:res.data.knowns.length,yanlis:res.data.unknowns.length});
      }).catch((err) => {
        console.log(err);
      })
  };

      useEffect(()=>{
        getcard();
      },[selectedButton=="Rapor"])
  const [formData, setFormData] = useState({
    username: authState.data.user.username,
    password: '',
    name: authState.data.user.name,

  });
  const handleButtonPress = (buttonName: string) => {
    setSelectedButton(buttonName);
  };
  const [userData, setUserData] = useState({
    username: authState.data.user.username,
    name: authState.data.user.name
  });
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.englishTitle}</Text>
      <Text style={styles.title}>{item.turkishTitle}</Text>
    </View>
  );
  const renderItem2 = ({ item }) => {
    return(
      <View style={[]}>


        <Text style={styles.title}>{item.en}</Text>
        <Text style={styles.title}>{item.tr}</Text>

      </View>
    )
  }
  const showAlert = () => {
    Alert.alert(
      "Hesabı Sil",
      "Hesabınızı silmek istediğinize emin misiniz?",
      [
        { text: "İPTAL", onPress: () => handlePressCancel(), style: "cancel" },

        { text: "EVET", onPress: () => handlePressOk() }
      ],
      { cancelable: false }
    );
  };
  const handlePressCancel = () => {
    // İptal butonuna basıldığında yapılacak işlemler
    console.log("İptal butonuna basıldı!");
    handleButtonPress("Hesap Bilgileri")
    
    // Alert penceresini kapatmak için boş bir alert çağırın

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
  const [modalVisible, setModalVisible] = useState(false);
  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');
  const [id, setId] = useState('');

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = (input1, input2) => {
    // Dışarıdan alınan handleSave fonksiyonunun içeriği
    axiosInstance.post('words', { en: input1, tr: input2 }).then((res) => {
      setData([...data, res.data]);
    });
  };
  const [veri, setVeri] = useState(); // Veriyi burada saklayacağız

  const handleDeleteData = (deletedData) => {
    // Silme işlemi sonrasında gelen veriyi alıp App.js içindeki state'i güncelle
    setVeri(deletedData);
  };
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`words`);
          if (response.status === 200) {
            const data = response.data;
            console.log('Veri:', data);
            setData(data);
            return data;
          } else {
            console.error('Veri çekme hatası:', response.status);
          }
        } catch (error) {
          console.error('Bir hata oluştu:', error.message);
        }
      };
      fetchData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [veri])
  );
  return (
    <Container>
      <MyModal
        visible={modalVisible}
        closeModal={closeModal}
        onSave={handleSave}
        input1Value={input1Value}
        setInput1Value={setInput1Value}
        input2Value={input2Value}
        setInput2Value={setInput2Value}
      />
      <CustomView>
        <View style={styles.content}>
          <Button
            size="sm"
            title="Hesap Bilgileri"
            style={styles.button}
            textStyle={selectedButton === "Hesap Bilgileri" ? { fontWeight: '400' } : { color: '#7E8087' }}
            onPress={() => handleButtonPress("Hesap Bilgileri")}
          />
           {authState.data.user.role == "Admin" &&
              <>
               <Button
               size="sm"
               title="Kelimeler"
               style={styles.button}
               textStyle={selectedButton === "Kelimeler" ? { fontWeight: '400' } : { color: '#7E8087' }}
               onPress={async () => {
                handleButtonPress("Kelimeler")
                await axiosInstance.get("words").then(async (res) => {
  console.log(res.data);
                  setData(res.data);
                }).catch((err) => {
                  console.log(err);
                })
              }}
             />
              <Button
               size="sm"
               title="Kelime Ekle"
               style={styles.button}
               textStyle={selectedButton === "Kelime Ekle" ? { fontWeight: '400' } : { color: '#7E8087' }}
  
               onPress={openModal}
             />
              </>
           }
        {authState.data.user.role != "Admin" &&
        <>

          <Button
            size="sm"
            title="Favoriler"
            style={styles.button}
            textStyle={selectedButton === "Favoriler" ? { fontWeight: '400' } : { color: '#7E8087' }}
            onPress={async () => {
              handleButtonPress("Favoriler")
              await axiosInstance.get("cards").then(async (res) => {

                setData(res.data.favorities);
              }).catch((err) => {
                console.log(err);
              })
            }}
          />
          <Button
            size="sm"
            title="Bilinmeyen"
            style={styles.button}
            textStyle={selectedButton === "Bilinmeyen" ? { fontWeight: '400' } : { color: '#7E8087' }}
            onPress={async () => {
              handleButtonPress("Bilinmeyen")
              await axiosInstance.get("cards").then(async (res) => {
                console.log(res.data.unknows);
                setData(res.data.unknowns);
              }).catch((err) => {
                console.log(err);
              })
            }}
          />
          <Button
            size="sm"
            title="Öğrenilen"
            style={styles.button}
            textStyle={selectedButton === "Öğrenilen" ? { fontWeight: '400' } : { color: '#7E8087' }}
            onPress={async () => {
              handleButtonPress("Öğrenilen")
              await axiosInstance.get("cards").then(async (res) => {
              console.log(res.data.knowns);
                setData(res.data.knowns);
              }).catch((err) => {
                console.log(err);
              })
            }}
          />
          
          <Button
            size="sm"
            title="Rapor"
            style={styles.button}
            textStyle={selectedButton === "Rapor" ? { fontWeight: '400' } : { color: '#7E8087' }}
            onPress={() => handleButtonPress("Rapor")}
          />
        </>
        }
        </View>
        {selectedButton == "Hesap Bilgileri" &&
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: '400', color: "white" }}>Hesap Bilgileri</Text>
            <Text style={{ color: "white", paddingTop: 10 }}>Kullanıcı Adı: {userData.username}</Text>
            <Text style={{ color: "white", paddingTop: 10 }}>İsim: {userData.name}</Text>
          </View>
        }
        {selectedButton != "Rapor" && selectedButton != "Hesap Bilgileri" && selectedButton != "Düzenle" &&
          <View style={{ paddingRight: 13, paddingTop: '5%' }}>
            <FlatListComponent data={data} onDeleteData={handleDeleteData}/>
            
          </View>
        }
       
        {selectedButton == "Rapor" &&
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: '400', color: "white" }}>Rapor</Text>
            <Text style={{ color: "white", paddingTop: 10 }}>Doğru Cevap Sayısı: {rapor.dogru}</Text>
            <Text style={{ color: "white", paddingTop: 10 }}>Yanlış Cevap Sayısı: {rapor.yanlis}</Text>
          </View>
        }
        {selectedButton == "Düzenle" && 
        <View style={{ paddingTop: 20 }}>
        <TextInput placeholderTextColor={"#7E8087"} value={formData.username} placeholder="Kullancı Adı" style={styles.textinput} keyboardType="email-address" onChangeText={(text) => handleChange('username', text)} />
        <TextInput placeholderTextColor={"#7E8087"} value={formData.name} placeholder="İsim" style={styles.textinput} keyboardType="email-address" onChangeText={(text) => handleChange('name', text)} />
        <TextInput placeholderTextColor={"#7E8087"} placeholder="PAROLA" style={styles.textinput} secureTextEntry keyboardType="visible-password" onChangeText={(text) => handleChange('password', text)} />
        <Button
            size="sm"
            title="Kaydet"
            style={styles.button}
            textStyle={ { fontWeight: '400' } }
            onPress={async() => {
            
              if(formData.password=="" || formData.name=="" || formData.username==""){
                Alert.alert("Hata","Boş alan bırakmayınız")
              }else{
                  await axiosInstance.put(`users/${authState.data.user._id}`, formData).then(async(res) => {
                    console.log(res.data)
                    authDispatch({
                      type: "LOGIN_SUCCESS",
                      payload: {user:res.data,token:authState.data.token}
                    
                    })
                  }).catch((err) => { console.log(err) })
                handleButtonPress("Hesap Bilgileri")

              }
            
            }}
          />
      </View>}
        
      </CustomView>
      {selectedButton == "Hesap Bilgileri" && 
      
      
      
      
      <View style={{ flexDirection: 'row', paddingBottom: 20, marginHorizontal: '5%' }}>
        <Button
          size="sm"
          title="Düzenle"
          style={[styles.button, { flex: 1 }]}
          textStyle={selectedButton === "Düzenle" ? { fontWeight: '400' } : { color: '#7E8087' }}
          onPress={() => {
            handleButtonPress("Düzenle")
           
          }}
        />
        <Button
          size="sm"
          title="Hesabı Sil"
          style={[styles.button, { flex: 1 }]}
          textStyle={selectedButton === "Hesabı Sil" ? { fontWeight: '400' } : { color: '#7E8087' }}
          onPress={() => {
            showAlert();

          }}
        />
        <Button
          size="sm"
          title="Çıkış Yap"
          style={[styles.button, { flex: 1 }]}
          textStyle={selectedButton === "Çıkış Yap" ? { fontWeight: '400' } : { color: '#7E8087' }}
          onPress={() => authDispatch({
            type: "LOGOUT_USER",
          })}
        />
      </View>
      }
    </Container>
  );
}
export default SignInAccount;
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: '10%',
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
  textinput: {
    color: 'white',
    borderBottomWidth: 1,
    paddingBottom: '1%',
    marginBottom: '8.5%',
    borderBottomColor: '#7E8087'
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