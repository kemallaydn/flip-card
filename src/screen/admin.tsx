import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Container from '../component/container';
import Button from '../component/button';
import CustomView from '../component/customView';
import axiosInstance from '../utils/axiosInstance';

const AdminScreen = (props) => {
    const [users,setUsers]=useState([]);
    const {navigation}=props;
    const fetchData = async () => {
        try {
          const response = await axiosInstance.get('users');
          if (response.status === 200) {
            const data = response.data;
            console.log('Veri:', data);
            setUsers(data);
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
    

    const renderItem = ({ item }: { item: { id: number; name: string } }) => (
        <View>
            {item.role !="Admin" &&

            <Button
                size="sm"
                title={item.name}
                style={{ backgroundColor: '#31304D', marginVertical: '1%' }}
                onPress={() => {navigation.navigate("Userİnfo",{dataa:item._id})}}
            />
            }
        </View>
    );

    return (
        <Container>
            <CustomView>
                <View style={{ paddingTop: '15%'}}>
                    <Text style={{color:'white', fontWeight:'600',textAlign:'center'}}>Kullanıcı Hesapları</Text>
                </View>
                <View style={{ paddingTop: '5%' }}>
                    <FlatList
                        data={users}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id.toString()}
                    />
                </View>
            </CustomView>
        </Container>
    );
};

export default AdminScreen;
