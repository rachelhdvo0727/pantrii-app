import React from 'react';
import generalStyles from '../../../styles/General';
import { numberFormat } from '../../../utils/functions';
import { useNavigation } from '@react-navigation/native';
// API & Redux
import axios from 'axios';
import { useDispatch, useSelector, connect } from 'react-redux';
import { addToCart } from '../../../redux/reducer/CartReducer';
import { fetchLatestProducts } from '../../../utils/api';
import {
    addToFavourite,
    removeFavourite,
} from '../../../redux/reducer/FavouriteReducer';
// Components
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ProductCard from '../../../components/buyers/ProductCard';
// Dictionary
import dictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';
//Translation
import { useTranslation } from 'react-i18next';

export default function NewProductsScreen() {
    const navigation = useNavigation();
    const content = dictionary?.products; // DA dictionary
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const favourite = useSelector((state) => state.favourite);
    const favouriteId = favourite.map((i) => i?._id);

    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        axios(fetchLatestProducts('products'))
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
                        productTitle={t(
                            'products:products.productTitle.' +
                                item?.productTitle,
                        )}
                        imageSrc={productImages[item?.imageSrc]}
                        producerTitle={item?.producerTitle}
                        productDesc={t(
                            'products:products.productDesc.' +
                                item?.productDesc,
                        )}
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
