import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import generalStyles from '../../../styles/General';
import { numberFormat } from '../../../utils/functions';
// Components
import ProductCardList from '../../../components/buyers/ProductCardList';
import Button from '../../../components/actions/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    increment,
    decrement,
    clear,
    removeItem,
} from '../../../redux/reducer/CartReducer';
import { cartTotalPriceSelector } from '../../../redux/reducer/selector';
import dictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';
import InformationCard from '../../../components/InformationCard';
// Translations
import { useTranslation } from 'react-i18next';

export default function CartScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const content = dictionary?.products;

    const cart = useSelector((state) => state.cart);
    const totalPrice = useSelector(cartTotalPriceSelector);

    const { t } = useTranslation();

    return (
        <View style={styles.wrapper}>
            {cart.length === 0 ? (
                <View style={styles.wrapperCenter}>
                    <Text style={styles.emptyText}>
                        {t('common:cart.cartEmpty')}
                    </Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <InformationCard>
                        <FlatList
                            data={cart}
                            keyExtractor={(item) => item?._id}
                            renderItem={({ item }) => (
                                <ProductCardList
                                    productTitle={t(
                                        'products:products.productTitle.' +
                                            item?.productTitle,
                                    )}
                                    imageSrc={productImages[item?.imageSrc]}
                                    producerTitle={item?.producerTitle}
                                    productUnit={item?.productUnit}
                                    bulkPrice={numberFormat(
                                        item?.bulkPrice * item.quantity,
                                    )}
                                    isCold={item.tags?.find(
                                        (tag) => tag == 'cold',
                                    )}
                                    isOrganic={item.tags?.find(
                                        (tag) => tag == 'organic',
                                    )}
                                    isFrozen={item.tags?.find(
                                        (tag) => tag == 'frozen',
                                    )}
                                    quantity={item.quantity}
                                    onPressMinus={() => {
                                        if (item.quantity === 1) {
                                            dispatch(removeItem(item._id));

                                            console.log('removed');
                                            return;
                                        } else {
                                            dispatch(decrement(item._id));
                                        }
                                    }}
                                    onPressAdd={() => {
                                        dispatch(increment(item._id));
                                    }}
                                    onPressDelete={() => {
                                        dispatch(removeItem(item._id));
                                    }}
                                />
                            )}
                            scrollEnabled={true}
                        ></FlatList>
                    </InformationCard>
                </View>
            )}
            <View
                style={
                    cart.length === 0
                        ? styles.displayNone
                        : styles.bottomWrapper
                }
            >
                <Text style={generalStyles.headerH2}>
                    {t('common:cart.total')}: {numberFormat(totalPrice)}
                </Text>
                <Button
                    title={t('common:labels.goCheckOut')}
                    primary
                    onPress={() => navigation.navigate('CheckOutScreen')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#EFF2EE',
    },
    wrapperCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFF2EE',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 10,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 75,
    },
    bottomWrapper: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.5)',
        alignItems: 'center',
    },
    emptyText: {
        justifyContent: 'center',
        fontSize: 18,
        fontFamily: 'TT-Commons-Medium',
        letterSpacing: 0.5,
    },
    displayNone: {
        display: 'none',
    },
});
