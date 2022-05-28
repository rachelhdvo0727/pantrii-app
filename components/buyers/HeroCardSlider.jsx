import React from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HeroCard, { ITEM_WIDTH } from './HeroCard';
import { SLIDER_WIDTH } from '../../utils/variables';
import data from '../../dictionary/Data';

export default function HeroCardSlider() {
    const [index, setIndex] = React.useState(0);
    const carouselRef = React.useRef(null);

    return (
        <View>
            <Carousel
                layout="default"
                ref={carouselRef}
                data={data}
                inactiveSlideOpacity={1}
                renderItem={({ item: { title, imgUrl }, index }) => (
                    <HeroCard key={index} title={title} imageSrc={imgUrl} />
                )}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
            />
            <Pagination
                dotsLength={data.length}
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
}
