import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AllTasks from './screens/tasks/AllTasks';
import Finished from './screens/tasks/Finished';
import InProgress from './screens/tasks/InProgress';
import CustomDrawerContent from './CustomDrawerContent'; // Import the custom drawer content component

import Landing from './screens/landing/Landing';
import Guest from './screens/landing/Guest';
import Admin from './screens/landing/Landing';
import SectionGuest from './screens/sections/SectionGuest';
import SectionAdmin from './screens/sections/SectionAdmin';


const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Landing"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerStyle={{ backgroundColor: '#E9EDC9' }} // Set drawer background color
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        {/* Define Screens */}
        <Drawer.Screen name="Landing" component={Landing}/>
        <Drawer.Screen name="Guest" component={Guest}/>

        {/* Start Users Entrance */}
          <Drawer.Screen name="SectionGuest" component={SectionGuest}/>
          <Drawer.Screen name="SectionAdmin" component={SectionAdmin}/>
        {/* End Users Entrance */}
        
        <Drawer.Screen name="AllTasks" component={AllTasks} />
        <Drawer.Screen name="InProgress" component={InProgress} />
        <Drawer.Screen name="Finished" component={Finished} />
        {/* Add more screens to the drawer here if needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
