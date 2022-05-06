import React from 'react';
import {
    NavigationContainer,
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabBuyers from '../screens/buyers/BottomTabBuyers';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
export default function Navigation() {
    return (
        <NavigationContainer>
            <BottomTabBuyers />
        </NavigationContainer>
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
