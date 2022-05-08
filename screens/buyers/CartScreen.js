import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import generalStyles from '../../styles/General.js';

export default function CartScreen() {
    return (
        <View style={generalStyles.container}>
            <Text style={generalStyles.headerH1}>Kurv</Text>
        </View>
    );
}
