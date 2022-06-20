import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchFilteredProducts } from '../../../utils/api';
import { numberFormat } from '../../../utils/functions';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import generalStyles from '../../../styles/General';
// Dictionary
import dictionary from '../../../dictionary/campaigns';
import productDictionary from '../../../dictionary/products';
import { productImages, campaignImages } from '../../../dictionary/images';
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
//Translation
import { useTranslation } from 'react-i18next';

export default function CampaignScreen(props) {
    const navigation = useNavigation();
    const campaignContent = dictionary?.campaigns; // DA dictionary
    const productContent = productDictionary?.products;
    const { t } = useTranslation();

    const campaignTitle = props?.route?.params?.product;
    const [products, setProducts] = React.useState([]);

    const dispatch = useDispatch();
    const favourite = useSelector((state) => state.favourite);
    const favouriteId = favourite.map((i) => i?._id);

    React.useEffect(() => {
        // Update Screen's headerTitle
        props.navigation?.setOptions({
            headerTitle: t(
                'campaigns:campaigns.title.' + campaignTitle?.title,
            ).toUpperCase(),
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });

        // Fetch this category's products
        axios(fetchFilteredProducts('products', campaignTitle?.title))
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
                title={t('campaigns:campaigns.title.' + campaignTitle?.title)}
                imageSrc={campaignImages[campaignTitle?.imageSrc]}
                banner
            />
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
    display: {
        display: 'none',
    },
});
