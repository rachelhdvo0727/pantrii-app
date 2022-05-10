import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

export default function ProductsSlider() {
    return (
        <View style={styles.sliderWrapper}>
            <ProductCard />
        </View>
    );
}

const styles = StyleSheet.create({
    sliderWrapper: {
        marginLeft: 15,
        flex: 1,
    },
});
