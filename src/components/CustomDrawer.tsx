import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LDH from "../LDH";

const Drawer = createDrawerNavigator();
const CustomDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="LDH" component={LDH} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
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

export default CustomDrawer;