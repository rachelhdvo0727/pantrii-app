import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import ProductsStack from './ProductsStack';
import UploadProductsScreen from './UploadProductsScreen';
import TopNavSuppliers from './TopNavSuppliers';
import UserProfileStack from '../UserProfileStack';

const Tab = createBottomTabNavigator();

export default function BottomTabSuppliers(props) {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitleStyle: {
                    color: '#EFF2EE',
                    fontFamily: 'TT-Commons-Bold',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
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
                    shadowOffset: {
                        width: 0,
                        height: 18,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.0,
                    elevation: 10,
                },
                headerStyle: {
                    backgroundColor: '#1B463C',
                },
            }}
            initialRouteName="Hjem"
        >
            <Tab.Screen
                name="Hjem"
                component={HomeStack}
                initialParams={props?.route?.params}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name={focused ? 'home' : 'home-outline'}
                                size={24}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Produkter"
                component={ProductsStack}
                initialParams={props?.route?.params}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <Ionicons
                                name={
                                    focused ? 'fast-food' : 'fast-food-outline'
                                }
                                size={24}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Opret"
                component={UploadProductsScreen}
                initialParams={props?.route?.params}
                options={{
                    headerTitle: 'opret et produkt',
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused && styles.focusedBottomtab}>
                            <AntDesign
                                name={focused ? 'pluscircle' : 'pluscircleo'}
                                size={24}
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
                    headerTitle: (props) => <TopNavSuppliers {...props} />,
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
