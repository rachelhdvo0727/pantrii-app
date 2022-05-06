import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function HomeScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text style={styles.headerH1}>Home!</Text>
        </View>
    );
}

function ProductsScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Products</Text>
        </View>
    );
}

function CategoriesScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Caregories</Text>
        </View>
    );
}
function FavourtiesScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Favourites</Text>
        </View>
    );
}
function ProfileScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Profile</Text>
        </View>
    );
}

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
                tabBarLabelStyle: {
                    fontFamily: 'TT-Commons-Regular',
                    letterSpacing: 0.5,
                    fontSize: 10,
                    color: '#1B463C',
                },
                tabBarShowIcon: true,
                tabBarStyle: {
                    height: 90,
                },
            }}
        >
            <Tab.Screen
                name="Hjem"
                component={HomeScreen}
                options={{
                    headerTitle: 'Feed',
                    title: 'Home',
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name="home-outline"
                                size={size}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen name="Produkter" component={ProductsScreen} />
            <Tab.Screen name="Kategorier" component={CategoriesScreen} />
            <Tab.Screen name="Favoritter" component={FavourtiesScreen} />
            <Tab.Screen name="Profil" component={ProfileScreen} />
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
