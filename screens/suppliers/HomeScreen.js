import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeSuppliersScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text style={styles.headerH1}>Hjem Leverandører</Text>
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
