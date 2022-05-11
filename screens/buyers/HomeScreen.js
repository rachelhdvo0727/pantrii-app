import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import generalStyles from '../../styles/General';
import HeroCardSlider from '../../components/HeroCardSlider';
import ProductsSlider from '../../components/ProductsSlider';

export default function HomeScreen() {
    return (
        <View style={generalStyles.homeContainer}>
            <HeroCardSlider />
            <ProductsSlider sliderTitle="Nyheder" />
            <ProductsSlider sliderTitle="Udvalgt til dig" />
            <ProductsSlider sliderTitle="Udvalgt til dig" />
        </View>
    );
}
