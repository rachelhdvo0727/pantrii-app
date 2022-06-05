import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
// Components
import CartScreen from './CartScreen';
import CheckOutScreen from './CheckOutScreen';
import PaymentScreen from './PaymentScreen';
// Redux
import { cartTotalSelector } from '../../../redux/reducer/selector';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const CartStack = (props) => {
    const total = useSelector(cartTotalSelector);

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
            {total > 0 ? (
                <Stack.Screen
                    name="CheckOutScreen"
                    component={CheckOutScreen}
                    options={{
                        headerTitle: 'KASSEN',
                        headerBackTitleVisible: false,
                        headerBackVisible: false,
                    }}
                />
            ) : null}
            {total > 0 ? (
                <Stack.Screen
                    name="PaymentScreen"
                    component={PaymentScreen}
                    options={{
                        headerTitle: 'BETALING',
                        headerBackTitleVisible: false,
                        headerBackVisible: false,
                    }}
                />
            ) : null}
        </Stack.Navigator>
    );
};
export default CartStack;
