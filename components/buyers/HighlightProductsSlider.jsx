import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/core';
import ProductCard from './ProductCard';
import dictionary from '../../dictionary/products';
import generalStyles from '../../styles/General';
import ViewButton from '../actions/ViewButton';
import { fetchFeaturedProducts } from '../../utils/api';
import { productImages } from '../../dictionary/images';
import axios from 'axios';

export const SLIDER_WIDTH = Dimensions.get('window').width;

const HighLightProductsSlider = () => {
    const [index, setIndex] = React.useState(0);
    const carouselRef = React.useRef(null);
    const navigation = useNavigation();

    const content = dictionary?.products; // DA dictionary

    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        axios(fetchFeaturedProducts('products'))
            .then(function (response) {
                setProducts(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const slicedProducts = products?.slice(0, 6);

    return (
        <View style={styles.container}>
            <View style={generalStyles.flexHeading}>
                <Text style={generalStyles.headerH2}>Populært lige nu</Text>
                <ViewButton
                    onPress={() => navigation.navigate('HighlightProducts')}
                />
            </View>
            <Carousel
                layout="default"
                ref={carouselRef}
                data={slicedProducts}
                activeSlideAlignment="start"
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                renderItem={({ item }) => (
                    <ProductCard
                        productTitle={content.productTitle[item?.productTitle]}
                        imageSrc={productImages[item?.imageSrc]}
                        producerTitle={item?.producerTitle}
                        productDesc={content.productDesc[item?.productDesc]}
                        productUnit={item?.productUnit}
                        bulkPrice={
                            item?.bulkPrice + content.currency.DKK + '/kolli'
                        }
                        singlePrice={
                            item?.singlePrice + content.currency.DKK + '/enhed'
                        }
                        isCold={item.tags?.find((tag) => tag == 'cold')}
                        isOrganic={item.tags?.find((tag) => tag == 'organic')}
                        isFrozen={item.tags?.find((tag) => tag == 'frozen')}
                        onPress={() =>
                            navigation.navigate('ProductScreen', {
                                products: products,
                                product: item,
                            })
                        }
                    />
                )}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={SLIDER_WIDTH / 2 - 10.8} // width depends on window's screen
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
