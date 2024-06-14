import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Tasks from './section.component/SectionGuestComponent';
import Modal from 'react-native-modal';

const SectionGuest = () => {
  const Navigation = useNavigation();
  const route = useRoute();
  const [sectionInfo, setSectionInfo] = useState([]); // State to hold section data
  const sectionData = route.params?.sectionData;
  const adminID = sectionData.adminID
  const section_id = sectionData.sectionID;
  const sectionName = sectionData.sectionName;
  const [taskInfo, setTaskInfo] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State to manage refreshing
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const host = '192.168.1.7:3000'

  useEffect(() => {
    // Fetch section and task data when the component mounts
    fetchSectionData();
    fetchTaskData();
  }, [section_id]);

  const fetchSectionData = async () => {
    try {
      const response = await axios.get(`http://${host}/api/section/${section_id}`);
      setSectionInfo(response.data);
    } catch (error) {
      console.error('Error fetching section data:', error);
    }
  };

  const leaveSection = async () => {
    try {
      const response = await axios.post(`http://${host}/api/leave-section`);
      console.log(response.data);
      Navigation.navigate('Guest');
    } catch (error) {
      console.error('Error leaving section:', error);
    }
  };

  const fetchTaskData = async () => {
    try {
      const response = await axios.get(`http://${host}/api/tasks/${section_id}`);
      setTaskInfo(response.data);
      console.log(taskInfo);
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };

  const handleTest = () => {
    console.log(sectionData.sectionName);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing state to true
    fetchTaskData(); // Fetch updated task data
    setRefreshing(false); // Set refreshing state back to false when done
  };

  return (
    <SafeAreaView style={styles.body}>
      {/* Modal Component */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
      >
        <View style={styles.modalContent}>
          <Text style={{
            fontSize: 20,
            color: 'white',
            fontWeight:'bold'
          }}>
            Welcome, Student!
          </Text>
          {sectionData && (
            <Text style={{
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold',
            marginTop: 10,
          }}>Admin: {sectionData.adminName}</Text>
          )}
          <TouchableOpacity onPress={leaveSection} style={{
            backgroundColor: 'white',
            // width: '40%',
            alignContent: 'center',
            padding: 10,
            borderRadius: 10,
            elevation: 10,
            marginTop: 700,
          }}>
            <Text style={{
            fontSize: 20,
            bottom: 0,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
              Leave
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Button to toggle modal visibility */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.openModalButton} onPress={toggleModal}>
          <Image source={require('../../assets/Images/utilities/hamburger.png')} style={styles.image}/>
        </TouchableOpacity>
          <Text style={styles.headerText}>
            {sectionData.sectionName} Tasks
          </Text>
      </View>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={{ marginVertical: 30 }}>
          <Tasks taskInfo={taskInfo.data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  header:{
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
  headerText:{
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  image:{
    width: 30,
    height: 30,
  },
  modal: {
    // justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#55bCF6',
    padding: 22,
    // borderTopLeftRadius: 12,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    height: '100%',
    width: '60%'
  },
  openModalButton: {

    padding: 10,
    borderRadius: 8,
    width: '32.5%',
  },
});

export default SectionGuest;
