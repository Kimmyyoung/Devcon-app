import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

//React navigation stack
import RootStack from '../navigator/RootStack';

export default function App(){
  return (
      <RootStack />
  )
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
