import React, { useContext, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MyModal from '../modal';
import axiosInstance from '../../utils/axiosInstance';
import { GlobalContext } from '../../context';

const FlatListComponent = ({ data,veri ,onDeleteData }: any) => {
  const {authState}=useContext(GlobalContext)
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
   axiosInstance.put(`words/${id}`,{en:input1,tr:input2}).then((res)=>{
     console.log(res.data);
     onDeleteData(res.data);
   }) 
  };

  const renderItem = ({ item, index }) => (

    <View style={styles.itemContainer} key={item._id}>
      {authState.data.user.role == "Admin" &&
      
      
      
      
      <View style={{ flexDirection: 'row', position: 'absolute', top: 5, right: 5, alignItems: 'center' }}>
        <TouchableOpacity style={{ paddingHorizontal: 10 }}>
          <Ionicons name="pencil" size={15} color="white" onPress={()=>{
            setId(item._id)
            openModal();
          }}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          axiosInstance.delete(`words/${item._id}`).then((res)=>{
            onDeleteData(res.data);
            Alert.alert("Başarılı","Kelime silindi")
          })
        }}>
          <Ionicons name="close" size={15} color="white" />
        </TouchableOpacity>
      </View>
      }



      <Text style={styles.title}>{item.en}</Text>
      <Text style={styles.title}>{item.tr}</Text>
      {item.answer && <Text style={styles.title}>Cevabınız :{item.answer}</Text>}
    </View>
  );
 
  return (
    <>
       <MyModal
        visible={modalVisible}
        closeModal={closeModal}
        onSave={handleSave}
        input1Value={input1Value}
        setInput1Value={setInput1Value}
        input2Value={input2Value}
        setInput2Value={setInput2Value}
      />
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
    />
    
    </>

  );
};

export default FlatListComponent;
const styles = StyleSheet.create({

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