import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feed from './pages/Feed.js'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import UserDetail from './pages/UserDetail.js'






const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Tab.Navigator>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Feed" component={Feed}/>
          <Tab.Screen name="UserDetail" component={UserDetail}/>
      </Tab.Navigator>
     
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
