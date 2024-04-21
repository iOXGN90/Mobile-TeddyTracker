// InProgress.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InProgress = ({ route }) => {
  const { taskData } = route.params;
  const navigation = useNavigation();

  const handleFinish = () => {
    // Implement finish logic here
    // For now, let's navigate to the Finished screen with task data
    navigation.navigate('Finished', { taskData: taskData });
  };

  return (
    <View style={styles.taskDetails}>
      <Text style={styles.taskTitle}>Subject:</Text>
      <Text style={styles.taskDescription}>{taskData.subject}</Text>
      <Text style={styles.taskTitle}>Type of Activity:</Text>
      <Text style={styles.taskDescription}>{taskData.typeOfActivity}</Text>
      {/* Add more task details as needed */}

      <TouchableOpacity style={[styles.statusButton, styles.finishedButton]} onPress={handleFinish}>
        <Text style={[styles.statusButtonText, styles.finishedText]}>Finish Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskDetails: {
    backgroundColor: '#FF4848',
    borderRadius: 15,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: '#ccc',
    borderTopColor: '#ccc',
    borderBottomColor: '#ccc',
    padding: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    elevation: 5,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 18,
  },
  statusButton: {
    backgroundColor: '#FF9900', // Finished color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  statusButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  finishedText: {
    textAlign: 'center',
  },
});

export default InProgress;
