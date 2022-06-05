import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import generalStyles from '../../../styles/General';

export default function FavouritesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Kommende feature</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        ...generalStyles.mediumText,
        fontSize: 17,
    },
});
