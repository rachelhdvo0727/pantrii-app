import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ProductInfoScreen from './ProductInfoScreen';
import ProductEditScreen from './ProductEditScreen';
import TopNavSuppliers from './TopNavSuppliers';
import BackIconButton from '../../../components/actions/BackIconButton';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
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
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerTitle: (props) => <TopNavSuppliers {...props} />,
                }}
            />
            <Stack.Screen
                name="ProductInfoScreen"
                component={ProductInfoScreen}
            />
            <Stack.Screen
                name="ProductEditScreen"
                component={ProductEditScreen}
                options={{
                    headerTitle: 'REDIGER PRODUKT',
                }}
            />
        </Stack.Navigator>
    );
};
export default HomeStack;
