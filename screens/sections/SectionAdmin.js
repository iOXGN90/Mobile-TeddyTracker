import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, TextInput, RefreshControl, ActivityIndicator, Touchable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SectionAdminComponent from './section.component/SectionAdminComponent';

import Modal from 'react-native-modal';



const SectionAdmin = () => {
  const Navigation = useNavigation();
  const route = useRoute();
  const adminData = route.params?.adminData;
  const [sectionInfo, setSectionInfo] = useState([]); // State to hold section data
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const [createSection, setCreateSection] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false); // State to track refreshing state
  const [isFetching, setIsFetching] = useState(false); // State to track fetching state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const token = adminData.adminToken;
  const adminID = adminData.adminID;

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddSection = async () => {
    try {
      setIsFetching(true); // Set fetching state to true
      // Make POST request to add a new section
      const response = await axios.post('http://192.168.1.6:3000/api/create-section', {
        admin_id: adminID,
        section_name: createSection
      });

      // Handle successful response (if needed)
      console.log('Response:', response.data);

      fetchSectionData(); // Fetch section data

      // Close the modal
      toggleModal();
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    } finally {
      setIsFetching(false); // Set fetching state back to false
    }
  };

  const fetchSectionData = useCallback(async () => {
    try {
      // Make a GET request using Axios
      const response = await axios.get(`http://192.168.1.6:3000/api/section/${adminID}`);
      // Assuming the response data is an object with section data
      setSectionInfo(response.data);
    } catch (error) {
      console.error('Error fetching section data:', error);
    } finally {
      // After fetching data, stop refreshing
      setIsRefreshing(false);
    }
  }, [adminID]);

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
                Navigation.navigate('Admin');
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

  // Fetch section data when component mounts or when adminID changes
  useEffect(() => {
    fetchSectionData();
  }, [fetchSectionData]);

  // Function to handle pull-to-refresh action
  const onRefresh = () => {
    setIsRefreshing(true); // Set refreshing state to true
    fetchSectionData(); // Fetch section data
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Image source={require('../../assets/Images/utilities/hamburger.png')} 
            style={{
              width: 35,
              height: 35,
            }}
          />
        </TouchableOpacity>

        {/* Start Sidebar Modal */}
        <Modal
          isVisible={isSidebarOpen}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          backdropTransitionInTiming={300}
          backdropTransitionOutTiming={100}
          backdropOpacity={0.2}
          transparent={true}
          onRequestClose={() => setIsSidebarOpen(false)}
        >
          <View style={styles.sidebarContainer}>
            <View style={{
              width: '100%'
            }}>
              <TouchableOpacity onPress={toggleSidebar} style={{
              alignItems:'flex-end'
            }}>
                <Image source={require('../../assets/Images/utilities/close.png')} style={styles.closeButtonIcon} />
            </TouchableOpacity>
            </View>
            <View style={{
              width: '100%',
              height: '90%',
              display: 'flex',
              justifyContent:'center',
              alignItems:'center',
            }}>
              <Text style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                }}>
                  Hello, {adminData.adminName}
              </Text>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.buttonText}>
                  Logout
                </Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* End Sidebar Modal */}
        
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold'
        }}>
          Sections
        </Text>

        <View style={styles.buttonsContainer}>
          
          <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
            <Image source={require('../../assets/Images/utilities/add.png')} style={styles.addButtonIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.sectionContainer}>
          {sectionInfo.map((item, index) => (
            <View style={styles.item} key={index}>
              <SectionAdminComponent sectionInfo={item} />
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        animationOut='slideOutDown'
        animationIn='slideInUp'
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={300}
        backdropOpacity={0.2}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.addSectionButtonModal}>
          <View style={styles.addSectionButtonModalContent}>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={toggleModal}>
                <Image source={require('../../assets/Images/utilities/close.png')} style={styles.closeButtonIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Section Name Here"
                onChangeText={setCreateSection}
                value={createSection}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={handleAddSection} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Loading indicator */}
      {isFetching && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#55bCF6" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sidebarContainer: {
    width: '90%',
    // position: 'absolute',
    top: 0,
    left: -20,
    right: 0,
    bottom: 0,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    // justifyContent: 'center'
  },
  sidebarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  closeText: {
    fontSize: 18,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  logoutButton: {
    width: '50%',
    marginRight: 30,
    backgroundColor: '#55bCF6',
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center',

  },
  addButton: {
    // backgroundColor: '#55bCF6',
    padding: 5,
    borderRadius: 15,
  },
  addButtonIcon: {
    width: 30,
    height: 30,
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    marginVertical: 30,
  },
  item: {
    marginBottom: 20,
  },
  addSectionButtonModal: {
    flex: 1,
    bottom: -25,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addSectionButtonModalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 10,
    width: '100%',
    height: '40%',
  },
  closeButtonContainer: {
    flexDirection: 'row-reverse',
  },
  closeButtonIcon: {
    width: 30,
    height: 30,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    fontSize: 20,
    borderWidth: 0.5,
    borderRadius: 20,
    height: '50%',
    width: '100%',
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#55bCF6',
    padding: 15,
    borderRadius: 40,
    width: '100%',
    elevation: 10,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});

export default SectionAdmin;
