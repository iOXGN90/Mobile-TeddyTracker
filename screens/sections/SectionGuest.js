import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Tasks from './section.component/SectionGuestComponent';

const SectionGuest = () => {
  const Navigation = useNavigation();
  const route = useRoute();
  const sectionData = route.params?.sectionData;
  const sectionID = sectionData.sectionID;
  const [sectionInfo, setSectionInfo] = useState([]); // State to hold section data
  const [taskInfo, setTaskInfo] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State to manage refreshing

  useEffect(() => {
    // Fetch section and task data when the component mounts
    fetchSectionData();
    fetchTaskData();
  }, [sectionID]);

  const fetchSectionData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.12:3000/api/section/${sectionID}`);
      setSectionInfo(response.data);
    } catch (error) {
      console.error('Error fetching section data:', error);
    }
  };

  const leaveSection = async () => {
    try {
      const response = await axios.post('http://192.168.1.12:3000/api/leave-section');
      console.log(response.data);
      Navigation.navigate('Guest');
    } catch (error) {
      console.error('Error leaving section:', error);
    }
  };

  const fetchTaskData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.12:3000/api/tasks/${sectionID}`);
      setTaskInfo(response.data);
      console.log(taskInfo);
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };

  const handleTest = () => {
    console.log(sectionInfo);
  };

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing state to true
    fetchTaskData(); // Fetch updated task data
    setRefreshing(false); // Set refreshing state back to false when done
  };

  return (
    <SafeAreaView style={styles.body}>
      <View>
        <TouchableOpacity onPress={handleTest}>
          <Text>Task</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={leaveSection}>
        <Text>Leave Section</Text>
      </TouchableOpacity>
      {sectionData && (
        <Text>The admin of this page is: {sectionData.adminName}</Text>
      )}
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} // Implement refresh control
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
    alignItems: 'center',
  },
});

export default SectionGuest;
