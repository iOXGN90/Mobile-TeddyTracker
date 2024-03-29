import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons

const TeddyTracker = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Menu pressed')}>
          <Text style={styles.menuIcon}>&#9776;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>All Task</Text>
        <TouchableOpacity onPress={() => console.log('Add Task pressed')} style={styles.plusButton}>
          <Text style={styles.plusIcon}>
            <Icon name="add-circle-outline" size={36} color="rgba(0,0,0,0.22)" /> {/* Use Ionicons with the desired name */}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tasks}>
        <View style={styles.task}>
          <View style={styles.taskDetails}>
            <View style={styles.taskRectangle}>
              <Text style={styles.taskTitle}>Task Title</Text>
              <Text style={styles.taskDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
              <TouchableOpacity onPress={() => console.log('Options pressed')}>
                <Text style={styles.taskMenu}>&#8942;</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* More tasks can be added here */}
      </View>
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
  tasks: {
    flex: 1,
    paddingHorizontal: 20,
  },
  task: {
    marginBottom: 20,
  },
  taskDetails: {
    backgroundColor: 'white', // Set background color to white
    borderRadius: 20, // Border radius to create rounded edges
    borderRightWidth: 1, // Add border
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: '#ccc', // Border color
    borderTopColor: '#ccc',
    borderBottomColor: '#ccc',
    padding: 20,
    marginTop: 15,
    borderLeftWidth: 10,
    borderLeftColor: '#00A3FF',
    
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
});

export default TeddyTracker;
