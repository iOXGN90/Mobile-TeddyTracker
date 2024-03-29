import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import AllTasks from './screens/tasks/AllTasks';
import Finished from './screens/tasks/Finished';
import InProgress from './screens/tasks/InProgress';


const Stack = createNativeStackNavigator();

export default function App() {
return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="AllTasks"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right', // Set the animation option
            }}
        >
            <Stack.Screen name="AllTasks" component={AllTasks}/>
            <Stack.Screen name="InProgress" component={InProgress}/>
            <Stack.Screen name="Finished" component={Finished}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
};