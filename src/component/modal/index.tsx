// MyModal.js

import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../button';

const MyModal = ({ visible, closeModal, onSave, input1Value, setInput1Value, input2Value, setInput2Value }) => {
  const handleSave = () => {
    onSave(input1Value, input2Value); // Dışarıdan alınan handleSave fonksiyonunu çağır
    closeModal(); // Modal'ı kapat
  };

  const handleCancel = () => {
    closeModal(); // Modal'ı kapat
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Flip Card</Text>
          <TextInput
          placeholderTextColor={'#7E8087'}
            style={styles.input}
            placeholder="İngilizce"
            value={input1Value}
            onChangeText={(text) => setInput1Value(text)}
          />
          <TextInput
          placeholderTextColor={'#7E8087'}

            style={styles.input}
            placeholder="Türkçe"
            value={input2Value}
            onChangeText={(text) => setInput2Value(text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Kaydet" onPress={handleSave} />
            <Button title="İptal Et" onPress={handleCancel} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Diğer stillendirmeler...

export default MyModal;


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#161A30',
    borderRadius: 10,
    paddingHorizontal:'10%',

  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white'
  },
  input: {
    borderBottomWidth:1,
    paddingBottom:'1%',
    marginBottom:'8.5%',
    borderBottomColor:'#7E8087',
    color:'white'
},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});


