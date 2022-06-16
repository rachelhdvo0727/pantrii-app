import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsScreen from './ProductsScreen';
import ProductInfoScreen from './ProductInfoScreen';
import BackIconButton from '../../../components/actions/BackIconButton';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const ProductsStack = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator
            initialRouteName="ProductsScreen"
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

                headerTintColor: '#EFF2EE',
            }}
        >
            <Stack.Screen
                name="ProductsScreen"
                component={ProductsScreen}
                options={{
                    headerTitle: 'ALLE PRODUKTER',
                }}
            />
            <Stack.Screen
                name="ProductInfoScreen"
                component={ProductInfoScreen}
            />
        </Stack.Navigator>
    );
};
export default ProductsStack;
