import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import generalStyles from '../../styles/General';

export default function ProductsScreen() {
    return (
        <View style={generalStyles.container}>
            <Text style={generalStyles.headerH1}>Produkter</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerH1: {
        fontFamily: 'TT-Commons-Bold',
    },
});
