import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, TextInput, 
 Dimensions, Alert, Image, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const Guest = () => {
    const [pin_password, setPin_password] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading
    const Navigation = useNavigation();
    const host = '192.168.1.7:3000'

    const handleGoBack = () => {
        Navigation.navigate('Admin');
    }

    const handleLogin = async () => {
        try {
            setLoading(true); // Start loading
            const response = await axios.post(`http://${host}/api/login-section`, {
                pin_password: pin_password,
            });
            console.log(response.data);
            const sectionData = {
                adminName: response.data.adminName,
                sectionID: response.data.sectionID,
                adminID: response.data.adminID,
                sectionName: response.data.sectionName
            }
            Navigation.navigate('SectionGuest', { sectionData: sectionData });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized:', error.response.data);
                Alert.alert('Unauthorized', 'Please check your pin password.');
            } else {
                console.error('Login error:', error);
                Alert.alert('Login Failed', 'An error occurred while logging in.');
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const [fontsLoaded, fontError] = useFonts({
        'Poppins-Bold': require('../../assets/Fonts/Poppins-Bold.ttf'),
        'Poppins-Medium': require('../../assets/Fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../../assets/Fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../../assets/Fonts/Poppins-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                width: '100%',
            }}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Image source={require('../../assets/Images/utilities/arrow.png')}
                        style={{
                            marginTop: 10,
                            width: 25,
                            height: 25
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Image source={require('../../assets/Images/list.png')} style={styles.logo} />
                <View style={styles.textCon}>
                    <Text style={styles.text}>
                        Teddy
                    </Text>
                    <Text style={styles.text1}>
                        Tracker
                    </Text>
                </View>
                <View>
                    <Text style={styles.text2}>
                        Guest Mode
                    </Text>
                </View>
                <View style={{
                    width: '100%',
                }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Section Password"
                        onChangeText={setPin_password}
                        value={pin_password}
                    />
                    <TouchableOpacity style={styles.inputButton} onPress={handleLogin} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.Btn}>Enter as Guest</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#EEF5FF',
    },
    input: {
        textAlign: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        marginBottom: 10,
        fontSize: 18
    },
    Btn: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    inputButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#55bCF6',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        elevation: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.20
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
    text2: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 20,
        color: '#55bCF6',
    },
    logo: {
        width: 80,
        height: 80,
        position: 'relative',
    },
});

export default Guest;
