import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/core';
import ProductCard from './ProductCard';
import productData2 from '../../dictionary/ProductData2';
import generalStyles from '../../styles/General';
import ViewButton from '../actions/ViewButton';

export const SLIDER_WIDTH = Dimensions.get('window').width;

const HighLightProductsSlider = () => {
    const [index, setIndex] = React.useState(0);
    const carouselRef = React.useRef(null);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={generalStyles.flexHeading}>
                <Text style={generalStyles.headerH2}>Udvalgt til dig</Text>
                <ViewButton
                    onPress={() => navigation.navigate('HighlightProducts')}
                />
            </View>
            <Carousel
                layout="default"
                ref={carouselRef}
                data={productData2}
                activeSlideAlignment="start"
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                renderItem={({
                    item: {
                        productTitle,
                        imageSrc,
                        producerTitle,
                        productDesc,
                        productUnit,
                        bulkPrice,
                        singlePrice,
                    },
                    index,
                }) => (
                    <ProductCard
                        key={index}
                        productTitle={productTitle}
                        imageSrc={imageSrc}
                        producerTitle={producerTitle}
                        productDesc={productDesc}
                        productUnit={productUnit}
                        bulkPrice={bulkPrice}
                        singlePrice={singlePrice}
                    />
                )}
                sliderWidth={SLIDER_WIDTH}
                // productCard width plus 8
                itemWidth={178}
                useScrollView={true}
                onSnapToItem={(index) => setIndex(index)}
                enableSnap={false}
            />
        </View>
    );
};
export default HighLightProductsSlider;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
});
