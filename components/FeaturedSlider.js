import React from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FeaturedCard, { SLIDER_WIDTH, ITEM_WIDTH } from './FeaturedCard';
import data from '../dummy-data/Data';

export default function FeaturedSlider() {
    const [index, setIndex] = React.useState(0);
    const isCarousel = React.useRef(null);

    return (
        <View>
            <Carousel
                layout="default"
                ref={isCarousel}
                data={data}
                renderItem={FeaturedCard}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
            />
            <Pagination
                dotsLength={data.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
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
                tappableDots={true}
            />
        </View>
    );
}
