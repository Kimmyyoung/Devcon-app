import React from 'react';

import { Colors } from '../styles/login';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screen
import Login from './../screen/Login';
import Register from './../screen/Register';
import Home from './../screen/Home';

const Stack = createStackNavigator();

const RootStack = ()=>{
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyled : {
            backgoundColor: 'transparent',
          },
          headerTintColor: Colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20
          }
        }}
        initialRouteName='Login'
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen options={{ headerTintColor : Colors.primary }} name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack;
