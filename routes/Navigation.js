import React from 'react';
import {
    NavigationContainer,
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabBuyers from './screens/buyers/BottomTabBuyers';
// import BottomTabSuppliers from './screens/suppliers/BottomTabSuppliers';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();
export default function Navigation() {
    return (
        <NavigationContainer>
            <BottomTabBuyers />
            {/* <BottomTabSuppliers /> */}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {},
});
