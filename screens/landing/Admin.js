import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';


const Admin = () => {
  const Navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const guestPressed = () =>{
    Navigation.navigate('Guest');
  };

  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading state to true when login process starts
      const response = await axios.post('http://192.168.1.7:3000/api/login', {
        username: username,
        password: password,
      });

      const accessToken = response.data.data.token
      // Handle successful login, e.g., save token to AsyncStorage
      console.log(response.data);
      // Navigation.navigate('SectionAdmin')
      const adminData = {
        adminID : response.data.data.adminID,
        adminName : response.data.data.name,
        adminToken : response.data.data.token
      }
      // console.log(adminData);

      Navigation.navigate('SectionAdmin', {adminData : adminData})
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Please check your username and password.');
    } finally {
      setLoading(false); // Set loading state to false when login process completes (whether success or failure)
    }
  };

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Bold': require('../../assets/Fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../../assets/Fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../../assets/Fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../../assets/Fonts/Poppins-SemiBold.ttf'),
    'Poppins-ExtraBold': require('../../assets/Fonts/Poppins-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
          return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../assets/Images/list.png')} style={styles.logo} />
            <Text style={styles.welcomeTxt}>Welcome to</Text>
            <View style={styles.textCon}>
                <Text style={styles.text}>Teddy</Text>
                <Text style={styles.text1}>Tracker</Text>
            </View>
      </View>
      <View style={{
        marginTop: 15,
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login as Admin</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={guestPressed}>
            <Text style={styles.buttonText}>Login as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#EEF5FF',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: 125,
  },
  content:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textCon: {
      flexDirection: 'row',
  },
  welcomeTxt:{
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  text: {
      fontFamily: 'Poppins-ExtraBold',
      fontSize: 40,
      color: '#403F3F',

  },
  text1: {
      fontFamily: 'Poppins-ExtraBold',
      fontSize: 40,
      color: '#55bCF6',
  },
  logo: {
      width: 80,
      height: 80,
      position: 'relative',
  },
  input: {
      textAlign:'center',
      padding: 15,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 15,
      marginBottom: 10,
      fontSize: 18
  },
  btnContainer:{
      justifyContent: 'flex-end',
      position: 'relative',
      
  },
  button: {
      backgroundColor: '#55bCF6',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      elevation: 10,
      padding: 15,
      borderRadius: 15,
      marginVertical: 5,
  },

  buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
  }
});

export default Admin;