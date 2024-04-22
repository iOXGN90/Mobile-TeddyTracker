import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const Landing = () => {
    const navigation = useNavigation(); 
    const [fontsLoaded, fontError] = useFonts({
        'Poppins-Bold': require('../../assets/Fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('../../assets/Fonts/Poppins-ExtraBold.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
        setTimeout(() => {
            navigation.navigate('Admin');
        }, 1500);
        }
    }, [fontsLoaded, navigation]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/Images/list.png')} style={styles.logo} />
            <View style={styles.textCon}>
                <Text style={styles.text}>Teddy</Text>
                <Text style={styles.text1}>Tracker</Text>
            </View>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEF5FF',
    },
    textCon: {
        flexDirection: 'row',
    },
    text: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 50,
        color: '#403F3F',
    },
    text1: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 50,
        color: '#55bCF6',
    },
    logo: {
        width: 104,
        height: 104,
        position: 'relative',
        top: -30,
    },
});

export default Landing;