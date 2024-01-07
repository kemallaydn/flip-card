import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import FlipCard from 'react-native-flip-card';
import Container from '../component/container';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../component/button';
import axiosInstance from '../utils/axiosInstance';
import context, { GlobalContext } from '../context/index';

const App = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState(null);
  const [favorities, setFavorities] = useState(false);
  const {authState}=useContext(GlobalContext)

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('words');
      if (response.status === 200) {
        const data = response.data;
        console.log('Veri:', data);
        setData(data);
        
        setCurrentSeries(data[authState.data.user.questionCount]);
        
        return data;
      } else {
        console.error('Veri çekme hatası:', response.status);
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error.message);
    }
  };
  useEffect(()=>{
    
    fetchData();
  },[])
  
  const [currentSeries, setCurrentSeries] = useState({en:"",tr:"",_id:""}); 
  const [cevap, setCevap] = useState();
  const [index, setİndex] = useState(authState.data.user.questionCount);
  console.log(index);
  const handleChange =async () => {
    if(userInput!=""){

      setIsFlipped(true);
      setDisabled(true);
      setCevap(currentSeries.tr);
        // Kullanıcının cevabını kontrol et
        const isCorrect = userInput.toLowerCase() === currentSeries.tr.toLowerCase();
        await axiosInstance.post(`cards`,{
          word:currentSeries._id,
          answer:userInput.toLowerCase(),
        }).then((res)=>{
  
        }).catch((err)=>{
          console.log(err);
        })
  
  
        setIsAnswerCorrect(isCorrect);
        
  
        if(index==data.length-1){
          setİndex(0);
          setCurrentSeries(data[0]);
          Alert.alert("Tebrikler","Tüm soruları bitirdiniz")
        }else{

          setİndex(index + 1);
        }
    }else{
      Alert.alert("Lütfen bir cevap giriniz")
    }
  };

  return (
  <Container>
      <View style={{ padding: '10%' }}>
        <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>Flip Card</Text>
      </View>
      <TouchableOpacity style={{ flex: 2, alignItems: 'center' }}>
        <FlipCard
          style={styles.flipCard}
          friction={6}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          flip={!isFlipped}
          onFlipEnd={(isFlipEnd) => {
          } }
          onFlipStart={(isFlipStart) => { console.log('isFlipStart', isFlipStart); } }
        >
          {/* Front Side */}
          <View style={[styles.card, { backgroundColor: isAnswerCorrect ? '#508D69' : "red" }]}>
            <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5 }} onPress={async () => {
              setFavorities(!favorities);}}
              >
                  <Ionicons name="heart" size={20} color={!favorities ? "white" : "pink"} />

          </TouchableOpacity>
          <View style={{ flex: 7, justifyContent: 'center' }}>
            <Text style={styles.cardText}>{cevap}</Text>
          </View>
          <View style={{ flex: 1, marginBottom: '5%' }}>
            <Button size="lg" title="Yeni Soru" style={{ width: '100%', flex: 1, backgroundColor: isAnswerCorrect ? '#508D69' : "red" }} onPress={() => {
              setIsFlipped(false);
              setCevap(currentSeries.en);
              setDisabled(false);
              setUserInput('');
              setCurrentSeries(data[index]);
            } } />
          </View>
        </View>
        {/* Back Side */}
        <View style={[styles.card, styles.cardFront]}>
          <Text style={styles.cardText}>{currentSeries.en}</Text>
        </View>
      </FlipCard>
    </TouchableOpacity><View style={{ flex: 0.2, marginHorizontal: '21%', marginTop: '10%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#7E8087' }}>
        <TextInput
          placeholderTextColor={"#7E8087"}
          placeholder="CEVAP..."
          style={styles.textinput}
          onChangeText={(text) => setUserInput(text)}
          value={userInput} />
        <TouchableOpacity style={{ paddingRight: '2%' }} onPress={handleChange} disabled={disabled}>
          <Ionicons name="send" size={15} color={"white"} />
        </TouchableOpacity>
      </View><View style={{ flex: 1 }}></View><View style={{ flex: 0.4 }}></View>
    </Container>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161A30'
  },
  flipCard: {
    width: '100%', // Ekranın genişliğinin %80'i kadar bir boyut
    aspectRatio: 0.85,
    maxWidth: 500, // Maksimum genişlik belirliyoruz
  },
  card: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFront: {
    backgroundColor: '#31304D',
  },
  cardBack: {
    backgroundColor: '#508D69',
  },
  cardText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  textinput: {
    flex: 1,
    color: 'white',
  },
});

export default App;
