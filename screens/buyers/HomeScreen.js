import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import generalStyles from '../../styles/General';
import HeroCardSlider from '../../components/HeroCardSlider';
import ProductsSlider from '../../components/ProductsSlider';
import CampaginSlider from '../../components/CampaignSlider';

export default function HomeScreen() {
    return (
        <View style={generalStyles.homeContainer}>
            <ScrollView>
                <HeroCardSlider />
                <ProductsSlider sliderTitle="Nyheder" />
                <ProductsSlider sliderTitle="Udvalgt til dig" />
                <CampaginSlider />
            </ScrollView>
        </View>
    );
}
