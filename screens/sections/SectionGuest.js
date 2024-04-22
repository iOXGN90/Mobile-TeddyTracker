import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios'; // Import Axios
import { ScrollView } from 'react-native-gesture-handler';

import SectionGuestComponent from './section.component/SectionAdminComponent';

const SectionGuest = () => {
  const route = useRoute();
  const [sectionInfo, setSectionInfo] = useState([]); // State to hold section data
  const sectionData = route.params?.sectionData;

  const sectionId = sectionData.adminID;
  useEffect(() => {
    // Fetch section data when the component mounts
    fetchSectionData();
    // handleTest();
  }, []);

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


  const handleTest = () => {
    console.log(sectionInfo.section_name);
  };

  return (
    <SafeAreaView style={styles.body}>
      <View>
        <TouchableOpacity onPress={handleTest}>
          <Text>Sample</Text>
        </TouchableOpacity>
      </View>
      {sectionData && (
        <Text>The admin of this page is: {sectionData.adminName}</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
})

export default SectionGuest;
