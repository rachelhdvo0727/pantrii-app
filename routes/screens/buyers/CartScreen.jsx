import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import generalStyles from '../../../styles/General';
// Components
import ProductCardList from '../../../components/buyers/ProductCardList';

export default function CartScreen() {
    return (
        <ScrollView style={generalStyles.container}>
            <View style={styles.container}>
                <ProductCardList />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
});
