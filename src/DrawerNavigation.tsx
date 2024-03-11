import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity,StyleSheet} from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem,DrawerContentComponentProps  } from '@react-navigation/drawer';
//Screens
import HomePage from "./Screens/HomePage";
import Notification from "./Screens/Notification";
import LDH from "./Screens/LDH";
import MesPref from "./Screens/MesPref";
import APropos from "./Screens/APropos";

//ICONS
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Foundation } from '@expo/vector-icons';
import {doc, getDoc} from "firebase/firestore";
import {auth,db} from "./config/firebase";

const Drawer = createDrawerNavigator();
enableScreens();

type IconMap = {
    [key: string]: {
        library: typeof Ionicons | typeof Foundation;
        name: string;
    };
};

const ICONS_MAP: IconMap = {
    'Acceuil': { library: Ionicons, name: 'home-outline' },
    'List des habitants': { library: Foundation, name: 'clipboard-notes' },
    'Notification': { library: Ionicons, name: "notifications-outline" },
    'Mes préférences': { library: Ionicons, name: 'settings' },
    'A propos': { library: Ionicons, name: 'information-circle-outline' },
};
const DrawerNavigation = () => {
    return (
        <Drawer.Navigator initialRouteName='Acceuil'
                          drawerContent={(props) => <CustomDrawerContent {...props}/>}
                          screenOptions={{
                              drawerStyle: {
                                  width: '60%',
                              },
                              swipeEnabled:false,
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
                drawerInactiveBackgroundColor: 'transparent'}}/>
            <Drawer.Screen name='List des habitants' component={LDH} options={{ headerTitle: '',headerTransparent: true,}}/>
            <Drawer.Screen name='Notification' component={Notification} options={{headerTitle: '',headerTransparent: true, }}/>
            <Drawer.Screen name='Mes préférences' component={MesPref} options={{ headerTitle: '',headerTransparent: true, }}/>
            <Drawer.Screen name='A propos' component={APropos} options={{ headerTitle: '',headerTransparent: true, }}/>
        </Drawer.Navigator>
    );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const { state, navigation } = props;
    const focusedRouteName = state.routes[state.index].name;
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const fetchUserName = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUserName(userDoc.data().name);
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserName();
    }, []);

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <Image source={require('../assets/PP.jpg')} style={styles.profileImage} />
                <Text style={styles.profileName}>{userName}</Text>
            </View>
            {state.routes.map((route, index) => {
                const isFocused = focusedRouteName === route.name;
                const { library: IconComponent, name: iconName } = ICONS_MAP[route.name as keyof typeof ICONS_MAP] || {};

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={() => {
                            navigation.navigate(route.name);
                        }}
                        style={styles.drawerItemContainer}
                    >
                        <View style={[
                            styles.drawerItem,
                            isFocused ? styles.drawerItemFocused : null
                        ]}>
                            {IconComponent && (
                                <IconComponent
                                    //@ts-ignore
                                    name={iconName}
                                    size={30}
                                    color={isFocused ? '#000' : '#ccc'}
                                />
                            )}
                            <Text
                                style={[
                                    styles.drawerLabel,
                                    isFocused ? styles.drawerLabelFocused : null,
                                ]}
                                numberOfLines={1}
                            >
                                {route.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
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
    drawerItemContainer: {
        marginHorizontal: 10,
        marginVertical: 3,
        borderRadius: 18,
        overflow: 'hidden',
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 10,
        flex: 1,
    },
    drawerItemFocused: {
        backgroundColor: '#4287F5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    drawerIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    drawerLabel: {
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
    },
    drawerLabelFocused: {
        color: '#fff',
    },
});

export default DrawerNavigation;