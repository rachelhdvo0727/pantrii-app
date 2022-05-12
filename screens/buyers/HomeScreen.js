import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import generalStyles from '../../styles/General';
import HeroCardSlider from '../../components/HeroCardSlider';

export default function HomeScreen() {
    return (
        <View style={generalStyles.homeContainer}>
            <HeroCardSlider />
        </View>
    );
}
