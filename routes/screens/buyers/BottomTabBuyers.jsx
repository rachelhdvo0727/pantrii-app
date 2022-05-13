import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CategoriesScreen from './CategoriesScreen';
import FavouritesScreen from './FavouritesScreen';
import ProfileScreen from './ProfileScreen';
import CartScreen from './CartScreen';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

export default function BottomTabBuyers() {
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
                },
                headerStyle: {
                    backgroundColor: '#1B463C',
                },
            }}
        >
            <Tab.Screen
                name="Hjem"
                component={HomeStack}
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
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Kategorier"
                component={CategoriesScreen}
                options={{
                    headerTitle: 'Kategorier',
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
                component={CartScreen}
                options={{
                    headerTitle: 'Kurv',
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
                component={ProfileScreen}
                options={{
                    headerTitle: 'Profil',
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
