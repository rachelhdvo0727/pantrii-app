import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';

import { StyleSheet, Text, View, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CategoriesStack from './CategoriesStack';
import FavouritesScreen from './FavouritesScreen';
import UserProfileStack from '../UserProfileStack';
import CartStack from './CartStack';
import CartScreen from './CartScreen';
import HomeStack from './HomeStack';
import CartIcon from '../../../components/actions/CartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { cartTotalSelector } from '../../../redux/reducer/selector';

const Tab = createBottomTabNavigator();

export default function BottomTabBuyers(props) {
    React.useEffect(() => {}, []);
    const total = useSelector(cartTotalSelector);

    const [cartItems, setCartItems] = useState([]);

    return (
        <Tab.Navigator
            screenOptions={{
                headerTitleStyle: {
                    color: '#EFF2EE',
                    fontFamily: 'TT-Commons-Bold',
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    fontSize: 20,
                },
                tabBarActiveTintColor: '#9DB76E',
                tabBarInactiveTintColor: '#1B463C',
                tabBarLabelStyle: {
                    fontFamily: 'TT-Commons-Regular',
                    letterSpacing: 0.5,
                },
                tabBarShowIcon: true,
                tabBarStyle: {
                    height: 80,
                    zIndex: 999,
                },
                headerStyle: {
                    backgroundColor: '#1B463C',
                },
                tabBarStyle: {
                    shadowOffset: {
                        width: 0,
                        height: 18,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.0,
                    elevation: 10,
                },
            }}
            initialRouteName="HomeStack"
        >
            <Tab.Screen
                name="Hjem"
                children={() => <HomeStack cartItems={cartItems} />}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name={focused ? 'home' : 'home-outline'}
                                size={24}
                                color={color}
                            />
                        </View>
                    ),
                    headerTitle: (props) => <TopNavBuyers {...props} />,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Kategorier"
                component={CategoriesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name={focused ? 'grid' : 'grid-outline'}
                                size={24}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Favoritter"
                component={FavouritesScreen}
                options={{
                    headerTitle: 'Favoritter',
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name={focused ? 'heart' : 'heart-outline'}
                                size={28}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Kurv"
                component={CartStack}
                options={{
                    headerShown: false,
                    tabBarBadge: <Text>{total}</Text>,
                    tabBarBadgeStyle: {
                        backgroundColor: '#EA6F2D',
                        color: 'white',
                        fontSize: 12,
                    },
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name={focused ? 'basket' : 'basket-outline'}
                                size={28}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profil"
                component={UserProfileStack}
                initialParams={props?.route?.params}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name={
                                    focused
                                        ? 'person-circle'
                                        : 'person-circle-outline'
                                }
                                size={28}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
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
