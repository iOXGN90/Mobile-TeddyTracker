import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, 
        StatusBar, Modal, TextInput, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons
import {Picker} from '@react-native-picker/picker';

import Tasks from '../../component/Tasks';

const TeddyTracker = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [typeOfActivity, setTypeOfActivity] = useState('Assignment');
  const [description, setDescription] = useState('');

  const [trackerData, setTrackerData] = useState([]);

  const cancelButton = () =>{
    setModalVisible(!modalVisible);
    setSubject('');
    setDescription('');
  }

  const displaySample = () => {
    const itemsToAdd = {
      subject: subject,
      description: description,
      typeOfActivity: typeOfActivity
    };
    setTrackerData(prevTrackerData => [...prevTrackerData, itemsToAdd]);
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
            <Icon name="add-circle-outline" size={36} color="rgba(0,0,0,0.22)" />
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
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

              <Text style={styles.Header}>Type of Activity:</Text>
              <Picker
                selectedValue={typeOfActivity}
                onValueChange={(itemValue, itemIndex) => setTypeOfActivity(itemValue)}
                style={styles.pickerStyle}
              >
                <Picker.Item label="Assignment" value="Assignment" />
                <Picker.Item label="Activity" value="Activity" />
              </Picker>

              <Text style={styles.Header}>Description:</Text>
              <TextInput
                style={styles.inputDescription}
                onChangeText={setDescription}
                textAlignVertical='top'
                multiline={true}
                numberOfLines={10}
                value={description}
                placeholder="Enter text here"
                keyboardType="default"
              />

              <TouchableOpacity style={styles.closeButton} onPress={displaySample}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <ScrollView>
        <View style={{ marginVertical: 30 }}>
          {trackerData.map((item, index) => (
            <View style={styles.item} key={index}>
              <Tasks trackerData={item} />
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E9EDC9',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIcon: {
    fontSize: 32,
    fontWeight: 'bold',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
  headerCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    marginTop: 15,
  },
  plusButton: {
    marginLeft: 10,
  },
  plusIcon: {
    marginTop: 15,
  },
  solidLine: {
    borderTopWidth: 1,
    borderColor: 'black',
    marginTop: 'auto',
    marginBottom: 20,
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
    marginRight: 15,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 20,
  },
  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
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
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  Header:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default TeddyTracker;
