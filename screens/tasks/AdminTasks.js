import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView, RefreshControl, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Modal from 'react-native-modal';
import { Dimensions } from 'react-native';
import Tasks from './task.component/Task';
import DateTimePicker from '@react-native-community/datetimepicker';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const AdminTasks = () => {
    const route = useRoute();
    const navigation = useNavigation();

    // Extract sectionInfo from route params
    const fromSectionData = route.params?.sectionInfo;
    const sectionDataID = fromSectionData.section_id;

    const [modalVisible, setModalVisible] = useState(false);
    const [subject, setSubject] = useState('');
    const [type_of_task, setType_of_task] = useState('Assignment');
    const [task_instruction, setTask_instruction] = useState('');
    const [task_title, setTask_title] = useState('');
    const [task_deadline, setTask_deadline] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleToggleModal = () => {
        setModalVisible(!modalVisible);
    }

    // const handleTest = () => {
    //     console.log(taskData);
    // };

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
            const response = await axios.get(`http://192.168.1.12:3000/api/tasks/${sectionDataID}`);

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
        navigation.goBack();
    }

    const handleAddTask = async () => {
        try {
            // Make a POST request to your API endpoint
            const response = await axios.post('http://192.168.1.12:3000/api/create-task', {
                admin_id: fromSectionData.admin_id,
                section_id: fromSectionData.section_id,
                subject: subject,
                type_of_task: type_of_task,
                task_instruction: task_instruction,
                task_title: task_title,
                task_deadline: task_deadline.toISOString().substring(0, 10)

            });

            // Log the response from the server
            // console.log('Post Response:', response.data);

            // Close the modal
            setModalVisible(false);

            // Clear the input fields
            setSubject('');
            setType_of_task('Assignment');
            setTask_instruction('');
            setTask_title('');
            setTask_deadline(new Date());

            // Refresh the task data to display the new task
            getTasks();

        } catch (error) {
            // Handle errors
            console.error('Post Error:', error);
        }
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || task_deadline;
        setShowDatePicker(Platform.OS === 'ios'); // On iOS, always show date picker
        setTask_deadline(currentDate);
    };
    
    return (
        <SafeAreaView style={{ padding: 15 }}>
            <View  iew style={styles.navigation}>
                <TouchableOpacity onPress={handleSection}>
                    <Image source={require('../../assets/Images/utilities/arrow.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Tasks</Text>
                <TouchableOpacity onPress={handleToggleModal}>
                    <Image source={require('../../assets/Images/utilities/add.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
            <ScrollView
                refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onRefresh} />}
            >
                <View style={{ marginVertical: 30 }}>

                    <Tasks taskData={taskData.data}/>  

                </View>
            </ScrollView>
            <Modal
                animationIn='slideInUp'
                animationOut='slideOutDown'
                transparent={true}
                isVisible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <ScrollView style={styles.centeredView}>
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
                            numberOfLines={5}
                            value={task_instruction}
                            placeholder="Enter text here"
                            keyboardType="default"
                        />
                        <Text style={styles.Header}>Deadline:</Text>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                            <Text style={styles.dateButtonText}>Pick a Date</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={task_deadline}
                                mode="date"
                                display="default"
                                onChange={onChangeDate}
                            />
                        )}
                        <Text 
                            style={{
                                
                            }}
                        >
                            {task_deadline.toLocaleDateString()}
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <TouchableOpacity style={styles.closeButton} onPress={handleAddTask}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    navigation: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    centeredView: {
        top: Height * 0.05
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    inputTitle: {
        width: '100%',
        borderWidth: 0.5,
        borderRadius: 10,
        fontSize: 18,
        paddingVertical: 10,
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
    inputDescription: {
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
        width: '50%',
        borderRadius: 30,
        marginTop: 30,
        margin: 10,
        elevation: 5
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    Header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dateButton: {
        backgroundColor: '#88B5E9',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    dateButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default AdminTasks;
