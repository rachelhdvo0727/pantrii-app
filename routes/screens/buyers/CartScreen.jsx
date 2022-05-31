import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import generalStyles from '../../../styles/General';
// Components
import ProductCardList from '../../../components/buyers/ProductCardList';
import Button from '../../../components/actions/Button';

export default function CartScreen() {
    const [quantity, setQuantity] = useState(1);
    const number = 200;
    const total = number * quantity;
    const numberFormat = (total) =>
        new Intl.NumberFormat('en-DK', {
            style: 'currency',
            currency: 'DKK',
        }).format(total);

    console.log(quantity);
    return (
        <View style={styles.wrapper}>
            <ScrollView style={generalStyles.container}>
                <View style={styles.container}>
                    <ProductCardList
                        bulkPrice={numberFormat(number)}
                        quantity={quantity}
                        onPressMinus={() => {
                            setQuantity(quantity - 1);
                        }}
                        onPressAdd={() => {
                            setQuantity(quantity + 1);
                        }}
                        disabled={quantity === 0 ? true : false}
                    />
                </View>
            </ScrollView>
            <View style={styles.bottomWrapper}>
                <Text style={generalStyles.headerH2}>
                    I ALT: {numberFormat(total)}
                </Text>
                <Button title="Gå til betaling" primary />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
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
