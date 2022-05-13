import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import generalStyles from '../../styles/General';
import HeroCardSlider from '../../components/buyers/HeroCardSlider';
import NewProductsSlider from '../../components/buyers/NewProductsSlider';
import HighLightProductsSlider from '../../components/buyers/HighlightProductsSlider';
import CampaginSlider from '../../components/buyers/CampaginCardSlider';

export default function HomeScreen() {
    return (
        <View style={generalStyles.homeContainer}>
            <ScrollView>
                <HeroCardSlider />
                <NewProductsSlider />
                <HighLightProductsSlider />
                <CampaginSlider />
            </ScrollView>
        </View>
    );
}
