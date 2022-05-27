import React from 'react';
import generalStyles from '../styles/General';
import { SLIDER_WIDTH } from '../utils/variables';
// Components
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const Slider = ({
    title,
    titleStyle,
    data,
    renderItem,
    sliderWidth,
    itemWidth,
    layout,
    inactiveSlideOpacity,
    inactiveSlideScale,
    activeSlideAlignment,
    snapToInterval,
    useScrollView,
    hasPagination,
    dotStyle,
    containerStyle,
    inactiveDotScale,
    inactiveDotStyle,
}) => {
    const [index, setIndex] = React.useState(0);
    const carouselRef = React.useRef(null);

    return (
        <SafeAreaView style={[styles.container]}>
            {title ? <Text style={titleStyle}>{title}</Text> : null}
            <Carousel
                layout={layout}
                data={data}
                inactiveSlideOpacity={inactiveSlideOpacity}
                inactiveSlideScale={inactiveSlideScale}
                activeSlideAlignment={activeSlideAlignment}
                renderItem={renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={useScrollView}
                snapToInterval={snapToInterval}
                style={styles.carousel}
            ></Carousel>
            {hasPagination ? (
                <Pagination
                    dotsLength={data?.length}
                    activeDotIndex={index}
                    tappableDots={true}
                    carouselRef={carouselRef}
                    dotStyle={[styles.dotStyle, dotStyle]}
                    containerStyle={containerStyle}
                    inactiveDotScale={inactiveDotScale}
                    inactiveDotStyle={[
                        styles.inactiveDotStyle,
                        inactiveDotStyle,
                    ]}
                />
            ) : null}
        </SafeAreaView>
    );
};

export default Slider;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    carousel: {
        position: 'relative',
    },
    dotStyle: {
        width: 6,
        height: 6,
        borderRadius: 5,
        marginHorizontal: -5,
        backgroundColor: '#AEC0AB',
    },
    inactiveDotStyle: {
        backgroundColor: '#BCBCBC',
    },
});
