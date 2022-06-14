import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import { getUser, logOut } from '../redux/slice/user';

const Stack = createNativeStackNavigator();

export default function Navigation(props) {
    const dispatch = useDispatch();
    const { roles } = useSelector((state) => state.roles);
    const { user } = useSelector((state) => state?.user);
    const [loggedInUser, setLoggedInUser] = React.useState(null);
    const [currentRole, setCurrentRole] = React.useState('');

    React.useEffect(() => {
        dispatch(getRoles());
    }, []);

    React.useEffect(() => {
        const persistLogIn = async () => {
            try {
                let savedUser = JSON.parse(
                    await SecureStore.getItemAsync('user'),
                );
                if (savedUser) {
                    setCurrentRole(
                        roles?.filter(
                            (role) => role?._id === savedUser?.roleId,
                        )[0]?.role,
                    );
                }
            } catch {
                console.error;
                setCurrentRole('');
            }
        };
        persistLogIn();

        if (user) {
            setCurrentRole(
                roles?.filter((role) => role?._id === user?.roleId)[0]?.role,
            );
        }
    }, [user]);

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
            {currentRole === 'producer' && (
                <Stack.Navigator screenOptions={screenOptions}>
                    <Stack.Screen
                        name="BottomTabSuppliers"
                        component={BottomTabSuppliers}
                        options={{
                            headerShown: false,
                            headerBackTitleVisible: false,
                            headerBackVisible: false,
                        }}
                        initialParams={{ currentRole }}
                    ></Stack.Screen>
                </Stack.Navigator>
            )}
            {currentRole === 'buyer' && (
                <Stack.Navigator screenOptions={screenOptions}>
                    <Stack.Screen
                        name="BottomTabBuyers"
                        component={BottomTabBuyers}
                        options={{
                            headerShown: false,
                            headerBackTitleVisible: false,
                            headerBackVisible: false,
                        }}
                        initialParams={{ currentRole }}
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
