import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import ProductsScreen from './ProductsScreen';
import CategoriesScreen from './CategoriesScreen';
import FavouritesScreen from './FavouritesScreen';
import ProfileScreen from './ProfileScreen';
import TopNavBuyers from './TopNavBuyers';

const Tab = createBottomTabNavigator();

export default function BottomTabBuyers() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitleStyle: {
                    color: '#000000',
                    fontFamily: 'TT-Commons-Bold',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    fontSize: 20,
                },
                tabBarActiveTintColor: '#9DB76E',
                tabBarInactiveTintColor: '#1B463C',
                tabBarLabelStyle: {
                    fontFamily: 'TT-Commons-Regular',
                    letterSpacing: 0.5,
                    fontSize: '10',
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
                component={HomeScreen}
                options={{
                    headerTitle: (props) => <TopNavBuyers {...props} />,
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name={focused ? 'home' : 'home-outline'}
                                size={size}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Produkter"
                component={ProductsScreen}
                options={{
                    headerTitle: (props) => <TopNavBuyers {...props} />,
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name={
                                    focused ? 'fast-food' : 'fast-food-outline'
                                }
                                size={size}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Kategorier"
                component={CategoriesScreen}
                options={{
                    headerTitle: (props) => <TopNavBuyers {...props} />,
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name={focused ? 'grid' : 'grid-outline'}
                                size={size}
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
                    headerTitle: (props) => <TopNavBuyers {...props} />,
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name={focused ? 'heart' : 'heart-outline'}
                                size={size}
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
                    headerTitle: (props) => <TopNavBuyers {...props} />,
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name={
                                    focused
                                        ? 'person-circle'
                                        : 'person-circle-outline'
                                }
                                size={size}
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
    headerH1: {
        fontFamily: 'TT-Commons-Bold',
    },
});
