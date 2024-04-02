import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, 
        StatusBar, Modal, TextInput, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons
import {Picker} from '@react-native-picker/picker';

import Tasks from '../../component/Tasks';

const TeddyTracker = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [subject, setSubject] = useState();
  const [typeOfActivity, setTypeOfActivity] = useState('Assignment');
  const [description, setDescription] = useState('');
  // const [description, setDescription] = useState('');

  const [trackerData, setTrackerData] = useState([]);

  const cancelButton = () =>{
    setModalVisible(!modalVisible);
    setSubject('');
    setDescription('');
  }

  const displaySample = () => {
    // console.log(subject)
        console.log(typeOfActivity);
        const itemsToAdd = {
          subject: subject,
          description: description,
          typeOfActivity: typeOfActivity
        };
        setTrackerData(prevTrackerData => [...prevTrackerData, itemsToAdd]);
        console.log(JSON.stringify(trackerData));
        setModalVisible(!modalVisible);
        setDescription('');
        setSubject('');
    };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Menu pressed')}>
          <Text style={styles.menuIcon}>&#9776;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>All Task</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.plusButton}>
          <Text style={styles.plusIcon}>
            <Icon name="add-circle-outline" size={36} color="rgba(0,0,0,0.22)" /> {/* Use Ionicons with the desired name */}
          </Text>
        </TouchableOpacity>
        <Modal
          style={styles.modalView}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.Header}>
                Subject
              </Text>
              <TextInput
                style={styles.inputTitle}
                onChangeText={setSubject}
                value={subject}
                placeholder="Enter text here"
                keyboardType="default" // You can change this to specify the keyboard type (e.g., 'numeric', 'email-address')
              />

              <Text style={styles.Header}>
                Type of Activity:
              </Text>
                <Picker
                  selectedValue={typeOfActivity}
                  onValueChange={(itemValue, itemIndex) =>
                    setTypeOfActivity(itemValue)
                  }
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    backgroundColor: 'skyblue',
                  }}
                >
                  <Picker.Item label="Assignment" value="Assignment" />
                  <Picker.Item label="Activity" value="Activity" />
                </Picker>

              <Text style={styles.Header}>
                Description:
              </Text>
              <TextInput
                style={styles.inputDescription}
                onChangeText={setDescription}
                textAlignVertical='top'
                multiline={true}
                numberOfLines={10}
                value={description}
                placeholder="Enter text here"
                keyboardType="default" // You can change this to specify the keyboard type (e.g., 'numeric', 'email-address')
              />

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={displaySample}
                >
                  <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}>
                    Submit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={cancelButton}
                >
                  <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
            </View>
          </View>
      </Modal>
      </View>
      <ScrollView>
        <View style={{
          marginVertical:30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
          {trackerData.map((item, index)=>(
            <View style={styles.item} key={index}>
              <Tasks
                trackerData={item}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.solidLine} />
      <View style={styles.legend}>
        <View style={styles.legendSquare}></View>
        <Text style={styles.legendText}>All Task</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // To adjust for Android's status bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E9EDC9',
    paddingVertical: 15, // Increase header height
    paddingHorizontal: 20, // Increase header padding
  },
  menuIcon: {
    fontSize: 32, // Increase font size
    fontWeight: 'bold', // Emulate thicker appearance
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Shadow color
    shadowOffset: {
      width: 0,
      height: 1, // Adjust shadow height for thickness
    },
    shadowOpacity: 1, // Shadow opacity
    shadowRadius: 2, // Shadow radius
    elevation: 3, // Elevation for Android
  },
  headerCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24, // Increase font size
    marginTop: 15,
  },
  plusButton: {
    marginLeft: 10, // Add space between "All Tasks" text and plus icon
  },
  plusIcon: {
    marginTop: 15, // Add margin top to the plus icon
  },
  
  solidLine: {
    borderTopWidth: 1,
    borderColor: 'black',
    marginHorizontal: 0, // Align the solid line with the content
    marginTop: 'auto', // Position the solid line at the bottom
    marginBottom: 20, // Add space from the bottom
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  legendSquare: {
    width: 20,
    height: 20,
    backgroundColor: '#00A3FF',
    marginRight: 15, // Adjusted margin for closer positioning
    borderRadius: 5,
  },
  legendText: {
    fontSize: 20,
  },

  centeredView:{
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
  },

  modalView: {
    borderRadius: 10,
    padding: 15,
  },

  inputTitle:{
    // borderWidth: 0.5,
    borderRadius: 20,
    fontSize: 18
  },

  inputDescription:{
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 20,
    fontSize: 18
  },

  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    alignItems: 'center',
    padding: 20,
    
  }, 
  Header:{
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20
  },

});

export default TeddyTracker;
