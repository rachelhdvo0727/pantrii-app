import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import TopNavBuyers from './TopNavBuyers';
import NewProductsScreen from './NewProductsScreen';
import HighLightProductsScreen from './HighlightProductsScreen';
import CategoryScreen from './CategoryScreen';
import ProductScreen from './ProductScreen';
import CampaignScreen from './CampaignScreen';
import AdvertisementScreen from './AdvertisementScreen';
import BackIconButton from '../../../components/actions/BackIconButton';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
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
                    headerTitle: t('navigate:newProducts'),
                    headerBackTitle: '',
                    headerLeft: () => (
                        <BackIconButton onPress={() => navigation.goBack()} />
                    ),
                }}
            />
            <Stack.Screen
                name="HighlightProducts"
                component={HighLightProductsScreen}
                options={{
                    headerTitle: t('navigate:featuredProducts'),
                    headerBackTitle: '',
                    headerLeft: () => (
                        <BackIconButton onPress={() => navigation.goBack()} />
                    ),
                }}
            />
            <Stack.Screen
                name="ProductScreen"
                component={ProductScreen}
                options={{
                    headerTitle: '',
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                }}
            />
            <Stack.Screen
                name="CampaignScreen"
                component={CampaignScreen}
                options={{
                    headerTitle: '',
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                }}
            />
            <Stack.Screen
                name="AdvertisementScreen"
                component={AdvertisementScreen}
                options={{
                    headerTitle: '',
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                }}
            />
        </Stack.Navigator>
    );
};
export default HomeStack;
