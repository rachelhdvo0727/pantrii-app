import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Components
import BottomTabBuyers from './screens/buyers/BottomTabBuyers';
import BottomTabSuppliers from './screens/suppliers/BottomTabSuppliers';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
// API
import * as SecureStore from 'expo-secure-store';
import { getRoles } from '../redux/slice/roles';
import { useSelector, useDispatch } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function Navigation(props) {
    const dispatch = useDispatch();
    const { roles } = useSelector((state) => state.roles);
    const { user } = useSelector((state) => state.user);
    const [loggedInUser, setLoggedInUser] = React.useState({});
    const [currentRole, setCurrentRole] = React.useState('');

    React.useEffect(() => {
        dispatch(getRoles());
    }, []);

    React.useEffect(() => {
        async function persistLogin() {
            let savedUser;
            try {
                savedUser = await SecureStore.getItemAsync('user');
                setLoggedInUser(JSON.parse(savedUser));

                setCurrentRole(
                    roles?.filter(
                        (role) => role?._id === loggedInUser?.roleId,
                    )[0]?.role,
                );
            } catch (error) {
                console.log('no saved user');
                setCurrentRole('');
            }
        }
        persistLogin();

        if (user) {
            setCurrentRole(
                roles?.filter((role) => role?._id === user?.roleId)[0]?.role,
            );
        }
    }, [loggedInUser, user]);

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
            {(loggedInUser || user) && currentRole === 'producer' && (
                <Stack.Navigator screenOptions={screenOptions}>
                    <Stack.Screen
                        name="BottomTabSuppliers"
                        component={BottomTabSuppliers}
                        options={{
                            headerShown: false,
                            headerBackTitleVisible: false,
                            headerBackVisible: false,
                        }}
                        initialParams={{ currentRole, loggedInUser }}
                    ></Stack.Screen>
                </Stack.Navigator>
            )}
            {(loggedInUser || user) && currentRole === 'buyer' && (
                <Stack.Navigator screenOptions={screenOptions}>
                    <Stack.Screen
                        name="BottomTabBuyers"
                        component={BottomTabBuyers}
                        options={{
                            headerShown: false,
                            headerBackTitleVisible: false,
                            headerBackVisible: false,
                        }}
                        initialParams={{ currentRole, loggedInUser }}
                    ></Stack.Screen>
                </Stack.Navigator>
            )}
            {(!currentRole || currentRole === '') && (
                <Stack.Navigator>
                    <Stack.Group screenOptions={screenOptions}>
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
                    </Stack.Group>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
