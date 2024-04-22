import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView, RefreshControl, TextInput  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Modal from 'react-native-modal';
import { DateTimePicker } from 'expo-datetime-picker';

import Tasks from './task.component/Task';

const AdminTasks = () => {
    const route = useRoute();
    const Navigation = useNavigation();

    const [date, setDate] = useState(null);
    const [mode, setMode] = useState('date');
    // Extract sectionInfo from route params
    const fromSectionData = route.params?.sectionInfo;
    const sectionDataID = fromSectionData.section_id;

    const [modalVisible, setModalVisible] = useState(false);
    const [subject, setSubject] = useState('');
    const [type_of_task, setType_of_task] = useState('Assignment');
    const [task_instruction, setTask_instruction] = useState('');
    const [task_title, setTask_title] = useState('');
    const [task_deadline, setTask_deadline] = useState('');

    const handleToggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const handleTest = () => {
        console.log(taskData);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setMode(null); // Close the picker after selection
      };
    const cancelButton = () =>{
        setModalVisible(!modalVisible);
        setSubject('');
    }

    // State to hold fetched user data
    const [taskData, setTaskData] = useState([]);

    // State to manage loading indicator
    const [isFetching, setIsFetching] = useState(false);

    // Function to fetch tasks from the API
    const getTasks = async () => {
        try {
            // Set isFetching to true to show loading indicator
            setIsFetching(true);

            // Make GET request
            const response = await axios.get(`http://192.168.1.6:3000/api/tasks/${sectionDataID}`);

            // Handle successful response
            console.log('Response:', response.data);

            // Update state with response data
            setTaskData(response.data);

        } catch (error) {
            // Handle errors
            console.error('Error:', error);

        } finally {
            // Set isFetching back to false regardless of success or failure
            setIsFetching(false);
        }
    };

    useEffect(() => {
        // Call the getTasks function when component is mounted
        getTasks();
    }, [sectionDataID]); // Include sectionDataID in the dependency array to re-fetch tasks when it changes

    // Function to handle pull-to-refresh action
    const onRefresh = () => {
        getTasks(); // Fetch tasks when refreshing
    };

    const handleSection = () => {
        Navigation.goBack();
    }

    return (
        <SafeAreaView style={{
            padding: 15,
        }}>
            <ScrollView
                refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onRefresh} />}
            >
                <View style={styles.navigation}>
                    <TouchableOpacity onPress={handleSection}>
                        <Image source={require('../../assets/Images/utilities/arrow.png')}
                            style={{
                                width: 30,
                                height: 30,
                            }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 30,
                        fontWeight:'bold'
                    }}>
                        Tasks
                    </Text>
                    <TouchableOpacity onPress={handleToggleModal}>
                        <Image source={require('../../assets/Images/utilities/add.png')} 
                        style={{
                            width: 30,
                            height: 30,
                        }} />
                    </TouchableOpacity>
                    
                </View>
                <View style={{ marginVertical: 30 }}>
                    {taskData.map((item, index) => (
                        <View style={styles.item} key={index}>
                            <Tasks taskData={item} />
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Modal
                animationIn='slideInDown'
                transparent={true}
                isVisible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.Header}>Subject</Text>
                        <TextInput
                            style={styles.inputTitle}
                            onChangeText={setSubject}
                            value={subject}
                            placeholder="Enter text here"
                            keyboardType="default"
                        />
                        <Text style={styles.Header}>Type of Task:</Text>
                        <Picker
                            selectedValue={type_of_task}
                            onValueChange={setType_of_task}
                            style={styles.pickerStyle}
                        >
                            <Picker.Item label="Assignment" value="Assignment" />
                            <Picker.Item label="Activity" value="Activity" />
                            <Picker.Item label="Exam/Test" value="Exam/Test" />
                        </Picker>
                        <Text style={styles.Header}>Task Title</Text>
                        <TextInput
                            style={styles.inputTitle}
                            onChangeText={setTask_title}
                            value={task_title}
                            textAlignVertical='top'
                            placeholder="ex: Pre-Final and Final ....."
                            keyboardType="default"
                        />
                        <Text style={styles.Header}>Instruction:</Text>
                        <TextInput
                            style={styles.inputDescription}
                            onChangeText={setTask_instruction}
                            textAlignVertical='top'
                            multiline={true}
                            numberOfLines={10}
                            value={task_instruction}
                            placeholder="Enter text here"
                            keyboardType="default"
                        />
                        <Text style={styles.DeadlineText}>Deadline:</Text>
                            <Button title="Pick Date" onPress={() => setMode('date')} />
                            {mode && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                display="default" // Can be "clock", "spinner", or "default"
                                onChange={onChange}
                            />
                            )}
                        <View style={{
                            display:'flex',
                            flexDirection:'row-reverse',
                            alignItems:'center'
                        }}>
                            <TouchableOpacity style={styles.closeButton} onPress={handleTest}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={cancelButton}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigation:{
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    centeredView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.3)',
      },
      modalView: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
      },
      inputTitle:{
        width: '100%',
        borderWidth: 0.5,
        borderRadius: 10,
        fontSize: 18,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
      pickerStyle: {
        width: '100%',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
      inputDescription:{
        width: '100%',
        borderWidth: 0.5,
        borderRadius: 10,
        fontSize: 18,
        padding: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
      },
      closeButton: {
        backgroundColor: '#55bCF6',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        margin: 10,
      },
      buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
      },
      Header:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
});

export default AdminTasks;
