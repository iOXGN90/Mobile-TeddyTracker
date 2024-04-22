import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal } from 'react-native';
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
    const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility

    const handleTest = () => {
        console.log(adminData);
    };

    const token = adminData.adminToken;
    const adminID = adminData.adminID

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    useEffect(() => {
        const fetchSectionData = async () => {
            try {
                // Make a GET request using Axios
                const response = await axios.get(`http://192.168.1.6:3000/api/section/${adminID}`);
                // Assuming the response data is an object with section data
                setSectionInfo(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching section data:', error);
            }
        };
    
        fetchSectionData(); // Call the fetchSectionData function
    
    }, [adminID]); // Empty dependency array to ensure useEffect runs only once

    const handleAddSection = () =>{

    }

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
                    setSectionInfo([]);
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
            <View style={styles.header}>
                <Text>Welcome {adminData.adminName}</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleModal}>
                        <Text style={{ fontSize: 30 }}>+</Text>
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
            {/* Modal */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
                style={{
                    height: '100%',
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Add your modal content here */}
                        <Text>This is the modal content</Text>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
    },
});
export default SectionAdmin