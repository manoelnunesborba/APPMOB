import { useNavigation } from '@react-navigation/native';

import Home from '../pages/Home.js'
import { StyleSheet, Text, View, Button, Alert, styles } from 'react-native'



export default function WelcomePage() {

    const navigation = useNavigation();

    return (

        <View style={styles.Button}>
            <Text>Accueil</Text>
            <TouchableOpacity activeOpacity={0.7}
                style={styles.buttonStyle}
                onPress={() => navigation.navigate('Home')}>
                <Text>Profil</Text>
            </TouchableOpacity >
        </View>
        
    );
}
