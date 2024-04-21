import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  const handleSignOut = () => {
    // Implement your sign out logic here
    console.log('Signing out...');
    // Example: props.navigation.navigate('SignIn'); // Navigate to sign-in screen
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      {/* Custom Drawer Title */}
      <View style={styles.drawerTitle}>
        <Text style={styles.titleText}>TeddyTracker</Text>
      </View>
      {/* Actual Screens */}
      <DrawerItem
        label="AllTasks"
        labelStyle={styles.drawerItemText} // Added labelStyle to set font size
        onPress={() => props.navigation.navigate('AllTasks')}
      />
      <DrawerItem
        label="InProgress"
        labelStyle={styles.drawerItemText} // Added labelStyle to set font size
        onPress={() => props.navigation.navigate('InProgress')}
      />
      <DrawerItem
        label="Finished"
        labelStyle={styles.drawerItemText} // Added labelStyle to set font size
        onPress={() => props.navigation.navigate('Finished')}
      />
      {/* Separator line */}
      <View style={styles.separator} />
      {/* Sign Out */}
      <DrawerItem
        label="Sign Out"
        labelStyle={[styles.drawerItemText, styles.signOutText]} // Style for sign out text
        onPress={handleSignOut}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: '#FEFAE0', // Set drawer background color
  },
  drawerTitle: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerItemText: {
    fontSize: 18, // Font size for drawer items
  },
  signOutText: {
    color: 'red', // Color for sign out text
    marginTop: 0,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
    marginTop: 390,
  },
});

export default CustomDrawerContent;
