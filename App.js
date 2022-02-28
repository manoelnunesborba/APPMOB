import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Feed from './pages/Feed.js'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import UserDetail from './pages/UserDetail.js'


const Stack = createStackNavigator();

export default function App() {
  return (
    
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Login"
        screenOptions={({route, navigation}) => ({
          headerRight: () => (
            <CustomMaterialMenu
              //Menu Text
              menutext="Menu"
              //Menu View Style
              menustyle={{marginRight: 16}}
              //Menu Text Style
              textStyle={{color: 'white'}}
              navigation={navigation}
              route={route}
              isIcon={true}
            />
          ),
        })}>
          
            <Stack.Screen
                name="login"
                component={Login}
            />

              <Stack.Screen
                name="Home"
                component={Home}
            />

            <Stack.Screen
                name="Feed"
                component={Feed}
            />

            <Stack.Screen
              name="UserDetails"
              component={UserDetail}
            />
            
          </Stack.Navigator>
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
