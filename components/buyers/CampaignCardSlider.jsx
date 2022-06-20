import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/core';
import dictionary from '../../dictionary/campaigns';
import generalStyles from '../../styles/General';
import { SLIDER_WIDTH } from '../../utils/variables';
// Components
import CampaignCard from './CampaignCard';
// API
import { mongoDbConfig } from '../../utils/api';
import { campaignImages } from '../../dictionary/images';
import axios from 'axios';
//Translations
import { useTranslation } from 'react-i18next';

const CampaignCardSlider = () => {
    const [index, setIndex] = React.useState(0);
    const carouselRef = React.useRef(null);
    const navigation = useNavigation();

    const content = dictionary?.campaigns; // DA dictionary

    const [products, setProducts] = React.useState([]);

    const { t } = useTranslation();

    React.useEffect(() => {
        axios(mongoDbConfig('campaigns'))
            .then(function (response) {
                setProducts(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.padding}>
                <Text style={generalStyles.headerH2}>
                    {t('common:home.campaign')}
                </Text>
            </View>
            <Carousel
                layout="default"
                ref={carouselRef}
                data={products}
                activeSlideAlignment="start"
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                renderItem={({ item }) => (
                    <CampaignCard
                        onPress={() =>
                            navigation.navigate('CampaignScreen', {
                                products: products,
                                product: item,
                            })
                        }
                        title={t('campaigns:campaigns.title.' + item?.title)}
                        imageSrc={campaignImages[item?.imageSrc]}
                    />
                )}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={SLIDER_WIDTH / 2 - 8} // width depends on window's screen
                useScrollView={true}
                onSnapToItem={(index) => setIndex(index)}
                enableSnap={false}
            />
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
