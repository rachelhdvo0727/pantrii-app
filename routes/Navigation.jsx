import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Components
import { StyleSheet } from 'react-native';
import BottomTabBuyers from './screens/buyers/BottomTabBuyers';
// import BottomTabSuppliers from './screens/suppliers/BottomTabSuppliers';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    // TODO: use actual login
    const [loggedInUser, setLoggedInUser] = React.useState({
        email: '',
        password: '',
    });

    // React.useEffect(() => {
    //     SecureStore.getItemAsync('user');
    // });

    const screenOptions = {
        headerTitleStyle: {
            color: '#EFF2EE',
            fontFamily: 'TT-Commons-Bold',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            fontSize: 20,
        },
        headerStyle: {
            backgroundColor: '#1B463C',
        },
        headerBackTitleStyle: {
            color: '#EFF2EE',
        },
        headerTintColor: '#EFF2EE',
    };
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen
                    name="LogInScreen"
                    component={LogInScreen}
                    options={{
                        headerShown: false,
                    }}
                    initialParams={{ user: loggedInUser }}
                />
                <Stack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="BottomTabBuyers"
                    component={BottomTabBuyers}
                    options={({ route }) => ({
                        headerShown: false,
                        headerBackTitleVisible: false,
                        headerBackVisible: false,
                    })}
                    initialParams={{ user: loggedInUser }}
                ></Stack.Screen>
            </Stack.Navigator>

            {/* <BottomTabSuppliers /> */}
        </NavigationContainer>
    );
}
