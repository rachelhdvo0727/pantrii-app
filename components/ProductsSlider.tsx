import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ProductCard from './ProductCard';
import productData from '../dummy-data/ProductData';
import generalStyles from '../styles/General';
import ViewButton from './actions/ViewButton';

export const SLIDER_WIDTH = Dimensions.get('window').width;

interface Props {
    sliderTitle: string;
}


const ProductsSlider = ({
    sliderTitle,
}: Props) => {
    const [index, setIndex] = React.useState(0);
    const isCarousel = React.useRef(null);

    return (
        <View style={styles.container}>
            <View style={generalStyles.flexHeading}>
                <Text style={generalStyles.headerH2}>{sliderTitle}</Text>
                <ViewButton/>
            </View>
            <Carousel
                layout="default"
                ref={isCarousel}
                data={productData}
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
                // productCard width plus 15
                itemWidth={185}
                useScrollView={true}
                onSnapToItem={(index) => setIndex(index)}
            />
        </View>
    );
}
export default ProductsSlider;
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
});
