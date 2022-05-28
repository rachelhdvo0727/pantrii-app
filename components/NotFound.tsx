import React from 'react';
import generalStyles from '../styles/General';
import { StyleSheet, View, Text } from 'react-native';

export interface Props {
    text: string;
}

const NotFound: React.FC<Props> = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default NotFound;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    text: {
        ...generalStyles.mediumText,
        fontSize: 17,
        textAlign: 'center',
    },
});
