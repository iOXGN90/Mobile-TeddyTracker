import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tasks = ({ taskData }) => {
  const Navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}-${year}`;
  };

  const handlePressSample = () => {
    // console.log(taskData);
  };
 
  return (
    <>
      {taskData && taskData.map((task, index) => (
        <TouchableOpacity key={index} style={[styles.taskDetails, { width: windowWidth * 0.9, marginBottom: 30 }]} onPress={handlePressSample}>
          <View style={styles.taskRectangle}>
            <Text style={styles.taskTitle}>Subject:</Text>
            <Text style={styles.taskDescription}>{task.subject}</Text>
            <Text style={styles.taskTitle}>Type of Activity:</Text>
            <Text style={styles.taskDescription}>{task.type_of_task}</Text>
            <Text style={styles.taskTitle}>Status:</Text>
            <Text style={styles.taskDescription}>{task.status}</Text>
            <Text style={styles.taskTitle}>Deadline:</Text>
            <Text style={styles.taskDescription}>{formatDate(task.task_deadline)}</Text>
            <Text style={styles.taskTitle}>Instruction:</Text>
            <Text style={styles.taskDescription}> {task.task_instruction} </Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
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
});

export default Tasks;
