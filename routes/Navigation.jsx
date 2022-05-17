import React from 'react';
import {
    NavigationContainer,
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Components
import { StyleSheet } from 'react-native';
import BottomTabBuyers from './screens/buyers/BottomTabBuyers';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';

// import BottomTabSuppliers from './screens/suppliers/BottomTabSuppliers';

const Stack = createNativeStackNavigator();
export default function Navigation() {
    // TODO: use actual login
    const loggedInUser = false;
    return (
        <NavigationContainer>
            {loggedInUser ? (
                <BottomTabBuyers />
            ) : (
                <Stack.Navigator>
                    <Stack.Screen
                        name="LogInScreen"
                        component={LogInScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="SignUpScreen"
                        component={SignUpScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            )}

            {/* <BottomTabSuppliers /> */}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {},
});
