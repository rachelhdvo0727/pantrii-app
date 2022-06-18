import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchAdvertProducts } from '../../../utils/api';
import { numberFormat } from '../../../utils/functions';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import generalStyles from '../../../styles/General';
// Dictionary
import productDictionary from '../../../dictionary/products';
import { productImages, adImages } from '../../../dictionary/images';
// Api
import axios from 'axios';
// Components
import BackIconButton from '../../../components/actions/BackIconButton';
import ProductCard from '../../../components/buyers/ProductCard';
import HeroCard from '../../../components/buyers/HeroCard';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/reducer/CartReducer';
import {
    addToFavourite,
    removeFavourite,
} from '../../../redux/reducer/FavouriteReducer';

export default function AdvertisementScreen(props) {
    const navigation = useNavigation();
    const productContent = productDictionary?.products;

    const advert = props?.route?.params?.product;
    const [products, setProducts] = React.useState([]);

    const dispatch = useDispatch();
    const favourite = useSelector((state) => state.favourite);
    const favouriteId = favourite.map((i) => i?._id);

    React.useEffect(() => {
        // Update Screen's headerTitle
        props.navigation?.setOptions({
            headerTitle: advert?.title?.toUpperCase(),
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });

        // Fetch this category's products
        axios(fetchAdvertProducts('products', advert?.title))
            .then(function (response) {
                setProducts(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <SafeAreaView style={[generalStyles.container]}>
            <HeroCard
                title={advert?.title}
                imageSrc={adImages[advert?.imageSrc]}
                banner
            />
            <FlatList
                data={products}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                    <ProductCard
                        secondary
                        productID={favouriteId?.filter((i) => i == item?._id)}
                        productTitle={
                            productContent.productTitle[item?.productTitle] ||
                            item?.productTitle
                        }
                        imageSrc={productImages[item?.imageSrc]}
                        producerTitle={item?.producerTitle}
                        productDesc={
                            productContent.productDesc[item?.productDesc] ||
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
    display: {
        display: 'none',
    },
});
