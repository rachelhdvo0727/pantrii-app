import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import generalStyles from '../../styles/General';
import FeaturedCard from '../../components/FeaturedCard';

export default function HomeScreen() {
    return (
        <View style={generalStyles.container}>
            <FeaturedCard title="Tilbud på Nordic Quinoa" />
        </View>
    );
}
