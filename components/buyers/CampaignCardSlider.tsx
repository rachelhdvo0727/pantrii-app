import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import generalStyles from '../../styles/General';
import CampaignCard from './CampaignCard';

export const SLIDER_WIDTH = Dimensions.get('window').width;

const CampaignCardSlider: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={[generalStyles.headerH2, styles.padding]}>
                Kampagne
            </Text>
            <View style={generalStyles.flexHeading}>
                <CampaignCard
                    title="Julefrokost"
                    imageSrc={require('../../assets/products/christmas.png')}
                />
                <CampaignCard
                    title="Sommerferie"
                    imageSrc={require('../../assets/products/summer.jpg')}
                />
            </View>
        </View>
    );
};

export default CampaignCardSlider;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
    padding: {
        paddingVertical: 10,
    },
});
