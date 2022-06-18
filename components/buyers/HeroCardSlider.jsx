import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/core';
import dictionary from '../../dictionary/campaigns';
import generalStyles from '../../styles/General';
import { SLIDER_WIDTH } from '../../utils/variables';
// Components
import HeroCard, { ITEM_WIDTH } from './HeroCard';
// API
import { mongoDbConfig } from '../../utils/api';
import { adImages } from '../../dictionary/images';
import axios from 'axios';

const HeroCardSlider = () => {
    const [index, setIndex] = React.useState(0);
    const carouselRef = React.useRef(null);

    const navigation = useNavigation();

    const [adverts, setAdverts] = React.useState([]);

    React.useEffect(() => {
        axios(mongoDbConfig('advertisements'))
            .then(function (response) {
                setAdverts(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <View>
            <Carousel
                layout="default"
                ref={carouselRef}
                data={adverts}
                inactiveSlideOpacity={1}
                renderItem={({ item }) => (
                    <HeroCard
                        // onPress={() =>
                        //     navigation.navigate('CampaignScreen', {
                        //         products: products,
                        //         product: item,
                        //     })
                        // }
                        title={item?.title}
                        imageSrc={adImages[item?.imageSrc]}
                    />
                )}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
            />
            <Pagination
                dotsLength={adverts.length}
                activeDotIndex={index}
                tappableDots={true}
                carouselRef={carouselRef}
                dotStyle={{
                    width: 6,
                    height: 6,
                    borderRadius: 5,
                    marginHorizontal: -5,
                    backgroundColor: '#AEC0AB',
                }}
                containerStyle={{ paddingVertical: 10 }}
                inactiveDotScale={1}
                inactiveDotStyle={{
                    backgroundColor: '#BCBCBC',
                }}
            />
        </View>
    );
};

export default HeroCardSlider;
