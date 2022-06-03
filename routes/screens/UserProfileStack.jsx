import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import ProfileEditScreen from './ProfileEditScreen';

const Stack = createNativeStackNavigator();

const UserProfileStack = (props) => {
    React.useEffect(() => {
        // console.log('profilestack', props.route);
    });
    return (
        <Stack.Navigator
            screenOptions={{
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
            }}
            initialRouteName="ProfileScreen"
        >
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerTitle: 'PROFIL',
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                }}
                initialParams={props?.route?.params}
            />
            <Stack.Screen
                name="ProfileEditScreen"
                component={ProfileEditScreen}
            />
        </Stack.Navigator>
    );
};
export default UserProfileStack;
