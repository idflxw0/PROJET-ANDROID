import React from 'react';
import {StyleSheet} from 'react-native';
import { enableScreens } from 'react-native-screens';
import {createDrawerNavigator} from "@react-navigation/drawer";

//Screens
import HomePage from "./Screens/HomePage";
import Notification from "./Screens/Notification";
import LDH from "./Screens/LDH";
import MesPref from "./Screens/MesPref";
import APropos from "./Screens/APropos";

const Drawer = createDrawerNavigator();
enableScreens();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator initialRouteName='HomePage'>
            <Drawer.Screen name='Acceuil' component={HomePage} options={{headerTitle:'',headerTransparent: true}}/>
            <Drawer.Screen name='List des habitants' component={LDH}/>
            <Drawer.Screen name='Notification' component={Notification}/>
            <Drawer.Screen name='Mes préférences' component={MesPref}/>
            <Drawer.Screen name='A propos' component={APropos}/>
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DrawerNavigation;