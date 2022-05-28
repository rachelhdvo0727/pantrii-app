import React from 'react';
import { ActivityIndicator, StyleSheet, View, Platform } from 'react-native';

export default function Spinner() {
    return (
        <View style={[styles.container]}>
            <ActivityIndicator
                style={{ opacity: 1 }}
                size="large"
                color="#1B463C"
                animating
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
