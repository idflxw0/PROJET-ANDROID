import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DrawerLayout from "./components/DrawerLayout";
import { NavigationContainer } from '@react-navigation/native';
import Notification from "./Screens/Notification";

import {createDrawerNavigator} from "@react-navigation/drawer";
import HomePage from "./Screens/HomePage";
import LDH from "./Screens/LDH";
import MesPref from "./Screens/MesPref";
import APropos from "./Screens/APropos";
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
    return (
        <Drawer.Navigator initialRouteName='HomePage'>
            <Drawer.Screen name='Acceuil' component={HomePage}/>
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