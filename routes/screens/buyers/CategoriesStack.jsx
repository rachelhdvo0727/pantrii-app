import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesMainScreen from './CategoriesMainScreen';
import CategoryScreen from './CategoryScreen';
import CategoryProductsListScreen from './CategoryProductsListScreen';

const Stack = createNativeStackNavigator();

const CategoriesStack = () => {
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
                name="CategoriesMainScreen"
                component={CategoriesMainScreen}
                options={{
                    headerTitle: 'KATEGORIER',
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                }}
            />
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                }}
            />
            <Stack.Screen
                name="CategoryProductsListScreen"
                component={CategoryProductsListScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                }}
            />
        </Stack.Navigator>
    );
};
export default CategoriesStack;
