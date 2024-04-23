import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios'; // Import Axios
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import SectionGuestComponent from './section.component/SectionAdminComponent';

const SectionGuest = () => {
  const route = useRoute();
  const [sectionInfo, setSectionInfo] = useState([]); // State to hold section data
  const sectionData = route.params?.sectionData;
  const Navigation = useNavigation();
  const sectionId = sectionData.adminID;
  useEffect(() => {
    // Fetch section data when the component mounts
    fetchSectionData();
    // handleTest();
  }, [sectionId]);

  const fetchSectionData = async () => {
    try {
      // Make a GET request using Axios
      const response = await axios.get(`http://192.168.1.6:3000/api/section/${sectionId}`);
      // Assuming the response data is an object with section data
      setSectionInfo(response.data);
      // console.log(sectionInfo);
    } catch (error) {
      console.error('Error fetching section data:', error);
    }
  };

  const leaveSection = async () => {
    try {
        const response = await axios.post('http://192.168.1.6:3000/api/leave-section');
        console.log(response.data); // Assuming you want to log the response
        // Handle success, if needed
        Navigation.navigate('Guest');
    } catch (error) {
        console.error('Error leaving section:', error);
        // Handle error, if needed
    }
};

  const handleTest = () => {
    console.log(sectionData.adminName);
  };

  return (
    <SafeAreaView style={styles.body}>
      <View>
        <TouchableOpacity onPress={handleTest}>
          <Text>Sample</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={leaveSection}>
        <Text>
          Leave Section
        </Text>
      </TouchableOpacity>
      {sectionData && (
        <Text>The admin of this page is: {sectionData.adminName}</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
})

export default SectionGuest;
