import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from './../pages/Feed'
import Home from './../pages/Home'
import UserDetail from './../pages/UserDetail.js'






const Tab = createBottomTabNavigator();

export default function FooterMenu() {
  return (
      <Tab.Navigator>
          <Tab.Screen name="Feed" component={Feed}/>
          <Tab.Screen name="UserDetail" component={UserDetail}/>
      </Tab.Navigator>
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