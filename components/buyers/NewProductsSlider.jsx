import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/core';
import dictionary from '../../dictionary/products';
import generalStyles from '../../styles/General';
// Components
import ViewButton from '../actions/ViewButton';
import ProductCard from './ProductCard';
// API
import { fetchLatestProducts } from '../../utils/api';
import { productImages } from '../../dictionary/images';
import axios from 'axios';
// Redux
import { useDispatch, useSelector, connect } from 'react-redux';
import { addToCart } from '../../redux/reducer/CartReducer';
import { addToFavourite } from '../../redux/reducer/FavouriteReducer';

export const SLIDER_WIDTH = Dimensions.get('window').width;

const NewProductsSlider = () => {
    const [index, setIndex] = React.useState(0);
    const carouselRef = React.useRef(null);
    const navigation = useNavigation();

    const content = dictionary?.products; // DA dictionary

    const numberFormat = (total) =>
        new Intl.NumberFormat('en-DK', {
            style: 'currency',
            currency: 'DKK',
        }).format(total);

    const [products, setProducts] = React.useState([]);
    const [isFavourited, setIsFavourited] = React.useState(false);

    const dispatch = useDispatch();

    React.useEffect(() => {
        // Fetch all categories from MongoDB api
        axios(fetchLatestProducts('products'))
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
                <Text style={generalStyles.headerH2}>Nyheder</Text>
                <ViewButton
                    onPress={() => navigation.navigate('NewProducts')}
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
                        bulkPrice={numberFormat(item?.bulkPrice)}
                        singlePrice={numberFormat(item?.singlePrice)}
                        isCold={item.tags?.find((tag) => tag == 'cold')}
                        isOrganic={item.tags?.find((tag) => tag == 'organic')}
                        isFrozen={item.tags?.find((tag) => tag == 'frozen')}
                        onPress={() =>
                            navigation.navigate('ProductScreen', {
                                products: products,
                                product: item,
                            })
                        }
                        onPressAdd={() => {
                            dispatch(addToCart(item));
                        }}
                        // Favourite

                        onPressFavourite={() => {
                            dispatch(addToFavourite(item));
                            setIsFavourited(true);
                        }}
                    />
                )}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={SLIDER_WIDTH / 2 - 15} // width depends on window's screen
                useScrollView={true}
                onSnapToItem={(index) => setIndex(index)}
                enableSnap={false}
            />
        </View>
    );
};

export default NewProductsSlider;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
});
