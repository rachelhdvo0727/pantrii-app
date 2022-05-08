import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../../styles/General.js';

export default function HomeSuppliersScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text style={styles.headerH1}>Hjem Leverandører</Text>
        </View>
    );
}
