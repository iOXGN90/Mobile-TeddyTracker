import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tasks = ({ trackerData, handleInProgress, handleFinished }) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const handlePressSample = () => {
    console.log(trackerData.description);
  };

  return (
    <TouchableOpacity style={[styles.taskDetails, { width: windowWidth * 0.9, marginBottom: 30 }]} onPress={handlePressSample}>
      <View style={styles.taskRectangle}>
        <Text style={styles.taskTitle}>Section:</Text>
        <Text style={styles.taskDescription}>{trackerData.subject}</Text>
        <Text style={styles.taskTitle}>Type of Activity:</Text>
        <Text style={styles.taskDescription}>{trackerData.typeOfActivity}</Text>
        {/* New section for Status */}
        <Text style={styles.taskTitle}>Status:</Text>
        <View style={styles.statusContainer}>
          <TouchableOpacity style={styles.statusButtonInProgress} onPress={handleInProgress}>
            <Text style={styles.statusButtonText}>In Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.statusButton, styles.finishedButton]} onPress={handleFinished}>
            <Text style={[styles.statusButtonText, styles.finishedText]}>Finished</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskDetails: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: '#ccc',
    borderTopColor: '#ccc',
    borderBottomColor: '#ccc',
    padding: 20,
    marginTop: -10,
    borderLeftWidth: 10,
    borderLeftColor: '#00A3FF',
    elevation: 10,
    alignSelf: 'center',
    marginHorizontal: 'auto',
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 18,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusButton: {
    backgroundColor: '#00A3FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  statusButtonInProgress: {
    backgroundColor: '#FF4848',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 120,
  },
  statusButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  finishedButton: {
    backgroundColor: '#FF9900',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 120,
  },
  finishedText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Tasks;
