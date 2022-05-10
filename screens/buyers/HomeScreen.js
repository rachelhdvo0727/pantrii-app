import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import generalStyles from '../../styles/General';
import FeaturedSlider from '../../components/FeaturedSlider';
import ProductsSlider from '../../components/ProductsSlider';
import ProductCard from '../../components/ProductCard';

export default function HomeScreen() {
    return (
        <View style={generalStyles.homeContainer}>
            <FeaturedSlider />
            <ProductsSlider />
        </View>
    );
}
