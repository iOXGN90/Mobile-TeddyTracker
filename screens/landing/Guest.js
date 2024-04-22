import React, {useState} from 'react'
import { TouchableOpacity, View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'

const Guest = () => {
    const [pin_password, setPin_password] = useState('');
    const Navigation = useNavigation();

    

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.1.6:3000/api/login-section', {
                pin_password: pin_password,
            });
            // Handle successful login, e.g., save token to AsyncStorage
            console.log(response.data);
            const sectionData={
                adminName : response.data.adminName,
                sectionID : response.data.sectionID,
                adminID : response.data.adminID
            }
            Navigation.navigate('SectionGuest', {sectionData : sectionData});
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error
                console.error('Unauthorized:', error.response.data);
                Alert.alert('Unauthorized', 'Please check your pin password.');
            } else {
            // Handle other errors
                console.error('Login error:', error);
                Alert.alert('Login Failed', 'An error occurred while logging in.');
            }
        }
        
    };


  return (
    <SafeAreaView style={styles.container}>
        <View style={{
            width: '80%',
        }}>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPin_password}
                value={pin_password}
                secureTextEntry
            />
            <TouchableOpacity style={styles.inputButton} onPress={handleLogin}>
                <Text>
                    Enter
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    input: {
      width: '100%',
      height: 40,
      marginVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      textAlign: 'center'
    },
    inputButton:{
        backgroundColor: 'yellow',
        height: 40,
        marginVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        elevation: 10,
    }
    });

export default Guest