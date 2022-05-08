import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import generalStyles from '../../styles/General';

export default function HomeScreen() {
    return (
        <View style={generalStyles.container}>
            <Text style={generalStyles.headerH1}>Hjem</Text>
        </View>
    );
}
