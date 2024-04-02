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
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white', // Set background color to white
        borderRadius: 15, // Border radius to create rounded edges
        borderRightWidth: 1, // Add border
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightColor: '#ccc', // Border color
        borderTopColor: '#ccc',
        borderBottomColor: '#ccc',
        padding: 20,
        marginTop: 25,
        borderLeftWidth: 10,
        borderLeftColor: '#00A3FF',
        elevation: 10,
        width: 400
        
      },
      taskRectangle: {
        flexDirection: 'column',
      },
      taskTitle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      taskDescription: {
        fontSize: 18,
      },
      taskMenu: {
        fontSize: 24,
        alignSelf: 'flex-end',
        marginTop: 'auto',
      },
})

export default Tasks;