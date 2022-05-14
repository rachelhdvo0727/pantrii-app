import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';

export interface Props {
    onPress: () => void;
}

const ViewButton: React.FC<Props> = ({ onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.title}>Se alle</Text>
        </Pressable>
    );
};

export default ViewButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AEC0AB',
        borderRadius: 3,
        margin: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: 'TT-Commons-Regular',
        color: '#1B463C',
        letterSpacing: 1,
        fontSize: 10,
    },
});
