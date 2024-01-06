import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigations';
import Provider from './src/context';
import { API_URL } from './src/Constants/general';
import * as Notifications from 'expo-notifications';
import io from 'socket.io-client';

export default function App() {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          const { status: newStatus } = await Notifications.requestPermissionsAsync();
          if (newStatus !== 'granted') {
            console.log('Bildirim izni reddedildi.');
          }
        }
      } catch (error) {
        console.error('Bildirim izni hatası:', error);
      }
    };
  
    requestNotificationPermission();
  }, []);
  const sendNotification = async (notification) => {
    try {
      // Kullanıcıdan bildirim izni iste
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          console.log('Bildirim izni reddedildi.');
          return;
        }
      }

      // Bildirimi kullanıcıya gönder
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Yeni bir bildirim var!",
          body: notification,
        },
        trigger: null, // Hemen gönder
      });

      console.log('Bildirim başarıyla gönderildi.');
    } catch (error) {
      console.error('Bildirim gönderme hatası:', error);
      console.log('Bildirim gönderme hatası.');
    }
  };

  useEffect(() => {
    const newSocket = io(API_URL, {
      transports: ['websocket'],
    });

    newSocket.on('notfication', (nf) => {
      console.log(nf);
      sendNotification(nf);
    });
  }, []);

  return (
    <Provider>
      <StatusBar style="light" />
      <AppNavigator />
    </Provider>
  );
}
