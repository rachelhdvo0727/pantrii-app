import React from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HeroCard, { SLIDER_WIDTH, ITEM_WIDTH } from './HeroCard';
import { mongoDbConfig } from '../../utils/api';
import { bannerImages } from '../../dictionary/images';
import axios from 'axios';

export default function HeroCardSlider() {
    const [index, setIndex] = React.useState(0);
    const carouselRef = React.useRef(null);

    const [heroProducts, setHeroProducts] = React.useState([]);
    React.useEffect(() => {
        // Fetch all categories from MongoDB api
        axios(mongoDbConfig('post', 'advertisements'))
            .then(function (response) {
                setHeroProducts(response.data?.documents);
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
                data={heroProducts}
                inactiveSlideOpacity={1}
                renderItem={({ item }) => (
                    <HeroCard
                        title={item?.title}
                        imageSrc={bannerImages[item?.imageSrc]}
                    />
                )}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
            />
            <Pagination
                dotsLength={heroProducts.length}
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
