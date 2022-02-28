



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/Home.js'
import { StyleSheet, Text, View, Button, Alert, styles } from 'react-native'



export default function BottomTab() {
    
    const Tab = createBottomTabNavigator();

    return (

        
        <Tab.Navigator>
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="UserDetail" component={UserDetail}/>
        </Tab.Navigator>
        
    );
}
