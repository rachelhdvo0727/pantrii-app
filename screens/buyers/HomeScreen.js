import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import generalStyles from '../../styles/General';
import FeaturedCard from '../../components/FeaturedCard';
import Carousel from 'react-native-snap-carousel';
import CustomSlider from './CustomSlider';
import data from './Data';

export default function HomeScreen() {
    return (
        <View style={generalStyles.container}>
            {/* <CustomSlider /> */}
            <FeaturedCard
                title="Tilbud på Nordic Quinoa"
                imageSrc={require('../../assets/banners/quinoa.png')}
            />
        </View>
    );
}
