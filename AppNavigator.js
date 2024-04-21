import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainComponent from './MainComponent'; // Adjust the path to MainComponent.js
import InProgress from './InProgress'; // Adjust the path to InProgress.js
import Finished from './Finished'; // Adjust the path to Finished.js

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tasks" component={MainComponent} />
        <Stack.Screen name="InProgress" component={InProgress} />
        <Stack.Screen name="Finished" component={Finished} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
