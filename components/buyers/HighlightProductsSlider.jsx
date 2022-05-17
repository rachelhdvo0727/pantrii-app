import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/core';
import ProductCard from './ProductCard';
import generalStyles from '../../styles/General';
import ViewButton from '../actions/ViewButton';
import { mongoDbConfig } from '../../utils/api';
import { productImages } from '../../dictionary/images';
import axios from 'axios';

export const SLIDER_WIDTH = Dimensions.get('window').width;

const HighLightProductsSlider = () => {
    const [index, setIndex] = React.useState(0);
    const carouselRef = React.useRef(null);
    const navigation = useNavigation();

    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        // Fetch all categories from MongoDB api
        axios(mongoDbConfig('post', 'products'))
            .then(function (response) {
                setProducts(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


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
                data={products.slice(0, 5)}
                activeSlideAlignment="start"
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                renderItem={({ item }) => (
                    <ProductCard
                        productTitle={item?.productTitle}
                        imageSrc={productImages[item?.imageSrc]}
                        producerTitle={item?.producerTitle}
                        productDesc={item?.productDesc}
                        productUnit={item?.productUnit}
                        bulkPrice={item?.bulkPrice + 'kr/kolli'}
                        singlePrice={item?.singlePrice + 'kr/enhed'}
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
