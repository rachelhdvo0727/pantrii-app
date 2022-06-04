import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
// Components
import CartScreen from './CartScreen';
import CheckOutScreen from './CheckOutScreen';
import PaymentScreen from './PaymentScreen';

const Stack = createNativeStackNavigator();

const CartStack = (props) => {
    const navigation = useNavigation();
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
                initialParams={props?.route?.params}
            />
            <Stack.Screen
                name="CheckOutScreen"
                component={CheckOutScreen}
                options={{
                    headerTitle: 'KASSEN',
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                }}
            />
            <Stack.Screen
                name="PaymentScreen"
                component={PaymentScreen}
                options={{
                    headerTitle: 'BETALING',
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                }}
            />
        </Stack.Navigator>
    );
};
export default CartStack;
