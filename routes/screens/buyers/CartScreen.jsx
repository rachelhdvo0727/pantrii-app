import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import generalStyles from '../../../styles/General';
// Components
import ProductCardList from '../../../components/buyers/ProductCardList';
import Button from '../../../components/actions/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
    increment,
    decrement,
    clear,
    removeItem,
} from '../../../reducer/CartReducer';
import { cartTotalPriceSelector } from '../../../reducer/CartReducer';
import CartContainer from '../../../components/CartContainer';
import dictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';

export default function CartScreen() {
    const numberFormat = (total) =>
        new Intl.NumberFormat('en-DK', {
            style: 'currency',
            currency: 'DKK',
        }).format(total);
    const content = dictionary?.products;
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item?._id}
                    renderItem={({ item }) => (
                        <ProductCardList
                            productTitle={
                                content.productTitle[item?.productTitle]
                            }
                            imageSrc={productImages[item?.imageSrc]}
                            producerTitle={item?.producerTitle}
                            productUnit={item?.productUnit}
                            bulkPrice={numberFormat(item?.bulkPrice)}
                            isCold={item.tags?.find((tag) => tag == 'cold')}
                            isOrganic={item.tags?.find(
                                (tag) => tag == 'organic',
                            )}
                            isFrozen={item.tags?.find((tag) => tag == 'frozen')}
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
                    scrollEnabled={false}
                ></FlatList>
            </View>

            <View style={styles.bottomWrapper}>
                <Text style={generalStyles.headerH2}>
                    I ALT:
                    {/* I ALT: {numberFormat(total)} */}
                </Text>
                <Button title="Gå til betaling" primary />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 10,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
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
});
