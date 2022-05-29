import React from 'react';
// Components
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';

export interface Props {
    style?: StyleProp<ViewStyle>;
    children?:
        | React.Component
        | React.ReactNode
        | React.ReactChildren
        | React.ReactChild;
}

export default function InformationCard({ style, children }: Props) {
    return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingBottom: 10,
    },
});
