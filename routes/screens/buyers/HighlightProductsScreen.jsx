import React from 'react';
import generalStyles from '../../../styles/General';
import { useNavigation } from '@react-navigation/native';
import { numberFormat } from '../../../utils/functions';
// API
import axios from 'axios';
import { fetchFeaturedProducts } from '../../../utils/api';
// Components
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ProductCard from '../../../components/buyers/ProductCard';
// Dictionary
import dictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';
// Redux
import { useDispatch, useSelector, connect } from 'react-redux';
import { addToCart } from '../../../redux/reducer/CartReducer';
import {
    addToFavourite,
    removeFavourite,
} from '../../../redux/reducer/FavouriteReducer';

export default function HighlightProductsScreen() {
    const navigation = useNavigation();
    const content = dictionary?.products; // DA dictionary

    const [products, setProducts] = React.useState([]);

    const dispatch = useDispatch();
    const favourite = useSelector((state) => state.favourite);
    const favouriteId = favourite.map((i) => i?._id);

    React.useEffect(() => {
        axios(fetchFeaturedProducts('products'))
            .then(function (response) {
                setProducts(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <SafeAreaView style={[generalStyles.container]}>
            <FlatList
                data={products}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                    <ProductCard
                        secondary
                        productID={favouriteId?.filter((i) => i == item?._id)}
                        productTitle={
                            content.productTitle[item?.productTitle] ||
                            item?.productTitle
                        }
                        imageSrc={productImages[item?.imageSrc]}
                        producerTitle={item?.producerTitle}
                        productDesc={
                            content.productDesc[item?.productDesc] ||
                            item?.productDesc
                        }
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
                        onPressFavourite={() => {
                            dispatch(addToFavourite(item));
                        }}
                        onPressUnFavourite={() => {
                            dispatch(removeFavourite(item._id));
                        }}
                    />
                )}
                numColumns={2}
                scrollEnabled={true}
                contentContainerStyle={[styles.contentContainerStyle]}
                columnWrapperStyle={styles.columnWrapperStyle}
            ></FlatList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        width: '100%',
        padding: 15,
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
});
