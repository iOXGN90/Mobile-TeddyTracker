import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SectionAdminComponent from './section.component/SectionAdminComponent';


const SectionAdmin = () => {
    const Navigation = useNavigation();
    const route = useRoute();
    const adminData = route.params?.adminData;
    const [sectionInfo, setSectionInfo] = useState([]); // State to hold section data

    const handleTest = () => {
        console.log(adminData);
    };

    const token = adminData.adminToken;
    const adminID = adminData.adminID

    useEffect(() => {
        // Fetch section data when the component mounts
        fetchSectionData();
        // handleTest();
      }, []);

    const fetchSectionData = async () => {
        try {
          // Make a GET request using Axios
          const response = await axios.get(`http://192.168.1.6:3000/api/section/${adminID}`);
          // Assuming the response data is an object with section data
          setSectionInfo(response.data);
        //   console.log(sectionInfo);
        } catch (error) {
          console.error('Error fetching section data:', error);
        }
      };

    const handleLogout = async () => {
        try {
          // Use the userToken state directly
          if (!token) {
            Alert.alert('Error', 'Access token not found');
            return;
          }
          // Show a confirmation prompt before logging out
          Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: async () => {
                  const API_ENDPOINT = 'http://192.168.1.6:3000/api/logout';
                  console.log('Token Deleted: ' + token);
                  const response = await axios.post(
                    API_ENDPOINT,
                    {},
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (response.status === 200) {
                    Alert.alert('Logout', 'Logout successful');
                    Navigation.navigate('Landing');
                  } else {
                    Alert.alert('Logout', 'Logout failed');
                  }
                },
              },
            ],
            { cancelable: false }
          );
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };

  return (
    <SafeAreaView>
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        
    }}>
        <View>
            <Text>
                Welcome {adminData.adminName}
            </Text>
        </View>
        <View style={{
            display:'flex',
            flexDirection:'row',
        }}>
            <TouchableOpacity onPress={handleLogout}>
                <Text>
                    Logout
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={{
                    fontSize: 30,
                }}>
                    +
                </Text>
            </TouchableOpacity>
        </View>
    </View>

        <ScrollView>
        <View style={{ marginVertical: 30 }}>
            {sectionInfo.map((item, index) => (
              <View style={styles.item} key={index}>
                <SectionAdminComponent sectionInfo={item} />
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
)
}


const styles = StyleSheet.create({
    
})
export default SectionAdmin