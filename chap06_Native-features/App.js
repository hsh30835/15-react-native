import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CameraView from './01_camera/01_camera';
import ImagePicker from './01_camera/02_iamge-pickure';
import ContactsView from './02_contacts/01_Contacts';
import AccelerometerSensors from './03_sensors/01_sensors';
import PedometerSensors from './03_sensors/02_Pedometer';
import LocationPicker from './03_sensors/03_Location';

const Tap = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tap.Navigator>
        <Tap.Screen
          name="Camera"
          component={CameraView}
          options={{
            tabBarIcon: ({ focused }) => (
              focused ? (<Ionicons name="camera" size={30} color={"red"} />) : (<Ionicons name="camera" size={30} color={"black"} />)
            )
          }}
        />
        <Tap.Screen
        name='Picker'
        component={ImagePicker}
        options={{
          tabBarIcon: ({ focused }) => focused ? (<Ionicons name="camera" size={30} color={"red"} />) : (<Ionicons name="camera" size={30} color={"black"} />)
        }}
        />
        <Tap.Screen
          name='Contacts'
          component={ContactsView}
          options={{
            tabBarIcon: ({ focused }) => focused ? (<Ionicons name="person" size={30} color={"red"} />) : (<Ionicons name="person" size={30} color={"black"} />)
          }}
        />
          <Tap.Screen
          name='Accelerometer'
          component={AccelerometerSensors}
          options={{
            tabBarIcon: ({ focused }) => focused ? (<Ionicons name="server" size={24} color="red" />) : (<Ionicons name="server" size={24} color="black" />)
          }}
        />
          <Tap.Screen
          name='Pedometer'
          component={PedometerSensors}
          options={{
            tabBarIcon: ({ focused }) => focused ? (<Ionicons name="code-working" size={24} color="red" />) : (<Ionicons name="code-working" size={24} color="black" />)
          }}
        />
        <Tap.Screen
          name='Location'
          component={LocationPicker}
          options={{
            tabBarIcon: ({ focused }) => focused ? (<Ionicons name="location" size={24} color="red" />) : (<Ionicons name="location" size={24} color="black" />)
          }}
        />
      </Tap.Navigator>
    </NavigationContainer>
  );
}