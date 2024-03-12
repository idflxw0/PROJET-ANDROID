import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from "@react-navigation/drawer";

//Screens
import LandingPage from "./src/LandingPages/LandingPage";
import SignInScreen from "./src/LandingPages/ConnectingPage/SignInScreen";
import SignUp from "./src/LandingPages/ConnectingPage/SignUp";
import DrawerNavigation from "./src/DrawerNavigation";
import Reservation from "./src/Screens/Reservation";

import Notification from "./src/Screens/Notification";

import ConfirmationPage from "./src/Screens/ConfirmationPage";

//Navigators
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }}/>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={DrawerNavigation} options={{ headerShown: false }}/>
        <Stack.Screen name="Reservation" component={Reservation} options={{ headerShown: false }}/>
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
        <Stack.Screen name={"ConfirmationPage"} component={ConfirmationPage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
