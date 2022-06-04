import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Components
import CartScreen from './CartScreen';
import CheckOutScreen from './CheckOutScreen';
import BackIconButton from '../../../components/actions/BackIconButton';

const Stack = createNativeStackNavigator();

const CartStack = () => {
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
        >
            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{
                    headerTitle: 'KURV',
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                }}
            />
            <Stack.Screen
                name="CheckOutScreen"
                component={CheckOutScreen}
                options={{
                    headerTitle: 'KASSEN',
                    headerBackTitle: '',
                    headerLeft: () => (
                        <BackIconButton onPress={() => navigation.goBack()} />
                    ),
                }}
            />
        </Stack.Navigator>
    );
};
export default CartStack;
