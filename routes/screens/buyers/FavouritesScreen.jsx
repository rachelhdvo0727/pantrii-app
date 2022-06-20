import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import generalStyles from '../../../styles/General';
import ProductCard from '../../../components/buyers/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { removeFavourite } from '../../../redux/reducer/FavouriteReducer';
import { addToCart } from '../../../redux/reducer/CartReducer';
import dictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';
// Translations
import { useTranslation } from 'react-i18next';

export default function FavouritesScreen() {
    const numberFormat = (total) =>
        new Intl.NumberFormat('en-DK', {
            style: 'currency',
            currency: 'DKK',
        }).format(total);
    const content = dictionary?.products;
    const dispatch = useDispatch();

    const favourite = useSelector((state) => state.favourite);

    const { t } = useTranslation();

    return (
        <SafeAreaView style={[generalStyles.container]}>
            {favourite.length === 0 ? (
                <View style={styles.wrapperCenter}>
                    <Text style={styles.emptyText}>
                        {t('common:favourites.favouritesEmpty')}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={favourite}
                    keyExtractor={(item) => item?._id}
                    renderItem={({ item }) => (
                        <ProductCard
                            secondary
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
                            isOrganic={item.tags?.find(
                                (tag) => tag == 'organic',
                            )}
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
            )}
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
    wrapperCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFF2EE',
    },
    emptyText: {
        justifyContent: 'center',
        fontSize: 18,
        fontFamily: 'TT-Commons-Medium',
        letterSpacing: 0.5,
    },
});
