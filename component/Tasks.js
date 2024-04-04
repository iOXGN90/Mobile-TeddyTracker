import React from 'react'
import { Text, StyleSheet, 
    View, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native';

const Tasks = ({trackerData}) => {


    const handlePressSample = () =>
    {
        console.log(trackerData.description)
    }

  return (
    <TouchableOpacity style={styles.taskDetails} onPress={handlePressSample}>
        <View style={styles.taskRectangle}>
            <Text style={styles.taskTitle}>
                Subject:
            </Text>
            <Text style={styles.taskDescription}>
                {trackerData.subject}
            </Text>
            <Text style={styles.taskTitle}>
                Type of Activity: 
            </Text>
            <Text style={styles.taskDescription}>
                {trackerData.typeOfActivity}
            </Text>
        </View>
    </TouchableOpacity>
  )
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
    marginTop: 25,
    borderLeftWidth: 10,
    borderLeftColor: '#00A3FF',
    elevation: 10,
    width: '90%', // Adjust width to 90% of parent container
    alignSelf: 'center', // Center horizontally
    marginHorizontal: 'auto', // Add margin on the sides
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold', // Apply bold font weight
  },
  taskDescription: {
    fontSize: 18,
      },
})

export default Tasks;