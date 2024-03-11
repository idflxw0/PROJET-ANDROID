import React from 'react';
import {View, Text, Image, TouchableOpacity,StyleSheet} from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem,DrawerContentComponentProps  } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Foundation } from '@expo/vector-icons';
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
        <Drawer.Navigator initialRouteName='Acceuil'
                          drawerContent={(props) => <CustomDrawerContent {...props}/>}
                          screenOptions={{
                              drawerStyle: {
                                  width: '55%'
                              },
                          }}
        >
            <Drawer.Screen name='Acceuil' component={HomePage} options={{ headerTitle:'', headerTransparent: true,
                drawerIcon:({focused,size}) => (
                    <Foundation
                        name='clipboard-notes'
                        size={30}
                        color={focused ? '#000' : '#ccc'}
                    />
                ),
                drawerActiveBackgroundColor: '#4287F5',
                drawerActiveTintColor: '#fff',
                drawerInactiveBackgroundColor: 'transparent'}}
            />
            <Drawer.Screen name='List des habitants' component={LDH} options={{ headerTitle: '',headerTransparent: true,}}/>
            <Drawer.Screen name='Notification' component={Notification} options={{ headerTitle: '',headerTransparent: true, }}/>
            <Drawer.Screen name='Mes préférences' component={MesPref} options={{ headerTitle: '',headerTransparent: true, }}/>
            <Drawer.Screen name='A propos' component={APropos} options={{ headerTitle: '',headerTransparent: true, }}/>
        </Drawer.Navigator>
    );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <Image source={require('../assets/PP.jpg')} style={styles.profileImage} />
                <Text style={styles.profileName}>Jean Prunot</Text>
            </View>
            <DrawerItemList {...props} />
            {/* If you have other items to add to the drawer that aren't screens, you can add them here */}
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: 'white',
    },
    profileName: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
});

export default DrawerNavigation;