import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import TopNavBuyers from './TopNavBuyers';
import NewProductsScreen from './NewProductsScreen';
import HighLightProductsScreen from './HighlightProductsScreen';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
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
                    headerTitle: (props) => <TopNavBuyers {...props} />,
                }}
            />
            <Stack.Screen
                name="NewProducts"
                component={NewProductsScreen}
                options={{
                    headerTitle: 'NYHEDER',
                    headerBackTitle: '',
                }}
            />
            <Stack.Screen
                name="HighlightProducts"
                component={HighLightProductsScreen}
                options={{
                    headerTitle: 'POPULÆRT LIGE NU',
                    headerBackTitle: '',
                }}
            />
        </Stack.Navigator>
    );
};
export default HomeStack;
