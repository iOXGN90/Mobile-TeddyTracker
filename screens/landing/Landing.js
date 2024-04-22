import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

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
      const response = await axios.post('http://192.168.1.6:3000/api/login', {
        username: username,
        password: password,
      });

      const accessToken = response.data.data.token
      // Handle successful login, e.g., save token to AsyncStorage
      console.log('Login successfully!');
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

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Welcome!
      </Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login as Admin</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={guestPressed}>
        <Text style={styles.buttonText}>
          Login as Guest
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    // height: 40,
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
  },
  button: {
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    elevation: 10,
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Admin;
