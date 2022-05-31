import React from 'react';
import { View, ScrollView } from 'react-native';
import generalStyles from '../../../styles/General';
import HeroCardSlider from '../../../components/buyers/HeroCardSlider';
import NewProductsSlider from '../../../components/buyers/NewProductsSlider';
import HighLightProductsSlider from '../../../components/buyers/HighlightProductsSlider';
import CampaignCardSlider from '../../../components/buyers/CampaignCardSlider';

export default function HomeScreen(props) {
    console.log('homescreen', props);
    return (
        <View style={generalStyles.homeContainer}>
            <ScrollView>
                <HeroCardSlider />
                <NewProductsSlider />
                <HighLightProductsSlider />
                <CampaignCardSlider />
            </ScrollView>
        </View>
    );
}
