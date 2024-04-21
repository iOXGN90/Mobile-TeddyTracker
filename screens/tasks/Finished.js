import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Finished = ({ route }) => {
  const { taskData } = route.params;
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const handleBackToTasks = () => {
    // Implement logic to navigate back to Tasks screen
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { width: windowWidth }]}>
      <View style={[styles.taskDetails, { width: '89%', marginBottom: 335 }]}>
        <Text style={styles.taskTitle}>Subject:</Text>
        <Text style={styles.taskDescription}>{taskData.subject}</Text>
        <Text style={styles.taskTitle}>Type of Activity:</Text>
        <Text style={styles.taskDescription}>{taskData.typeOfActivity}</Text>
        {/* Add more task details as needed */}

        <TouchableOpacity style={styles.backButton} onPress={handleBackToTasks}>
          <Text style={styles.backButtonText}>Back to Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 100,
  },
  taskDetails: {
    width: '80%',
    backgroundColor: '#FF9900',
    borderRadius: 15,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: '#ccc',
    borderTopColor: '#ccc',
    borderBottomColor: '#ccc',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    elevation: 5,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 18,
  },
  backButton: {
    backgroundColor: '#00A3FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Finished;
