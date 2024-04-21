import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AllTasks from './screens/tasks/AllTasks';
import Finished from './screens/tasks/Finished';
import InProgress from './screens/tasks/InProgress';
import CustomDrawerContent from './CustomDrawerContent'; // Import the custom drawer content component

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="AllTasks"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerStyle={{ backgroundColor: '#E9EDC9' }} // Set drawer background color
      >
        {/* Define Screens */}
        <Drawer.Screen name="AllTasks" component={AllTasks} />
        <Drawer.Screen name="InProgress" component={InProgress} />
        <Drawer.Screen name="Finished" component={Finished} />
        {/* Add more screens to the drawer here if needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
