import React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import generalStyles from '../../../styles/General';
import HeroCardSlider from '../../../components/buyers/HeroCardSlider';
import NewProductsSlider from '../../../components/buyers/NewProductsSlider';
import HighLightProductsSlider from '../../../components/buyers/HighlightProductsSlider';
import CampaignCardSlider from '../../../components/buyers/CampaignCardSlider';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingVertical: 20 }}>
                <HeroCardSlider />
                <NewProductsSlider />
                <HighLightProductsSlider />
                <CampaignCardSlider />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        ...generalStyles.homeContainer,
    },
});
