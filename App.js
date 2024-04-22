import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AllTasks from './screens/tasks/AllTasks';
import Finished from './screens/tasks/Finished';
import InProgress from './screens/tasks/InProgress';
// import CustomDrawerContent from './CustomDrawerContent'; // Import the custom drawer content component

import Landing from './screens/landing/Landing';
import Guest from './screens/landing/Guest';
import Admin from './screens/landing/Admin';
import SectionGuest from './screens/sections/SectionGuest';
import SectionAdmin from './screens/sections/SectionAdmin';

import AdminTasks from './screens/tasks/AdminTasks';


const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        {/* Define Screens */}
        <Stack.Screen name="Landing" component={Landing}/>
        <Stack.Screen name="Guest" component={Guest}/>
        <Stack.Screen name="Admin" component={Admin}/>

        {/* Start Users Entrance */}
          <Stack.Screen name="SectionGuest" component={SectionGuest}/>
          <Stack.Screen name="SectionAdmin" component={SectionAdmin}/>
        {/* End Users Entrance */}

        <Stack.Screen name="AdminTasks" component={AdminTasks} />
        
        
        <Stack.Screen name="AllTasks" component={AllTasks} />
        <Stack.Screen name="InProgress" component={InProgress} />
        <Stack.Screen name="Finished" component={Finished} />
        {/* Add more screens to the drawer here if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
