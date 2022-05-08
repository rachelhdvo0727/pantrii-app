import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../../styles/General.js';

export default function FavouritesScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text style={styles.headerH1}>Favoritter</Text>
        </View>
    );
}
