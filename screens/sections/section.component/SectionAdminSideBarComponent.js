import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SectionAdminSideBarComponent = ({ onClose }) => {
  // Function to handle closing the sidebar
  const handlePress = () => {
    onClose();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text>Close Sidebar</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      width: '50%',
      height: '100%',
      backgroundColor: 'red',
    },
  });

export default SectionAdminSideBarComponent