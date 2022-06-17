import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import generalStyles from '../../styles/General';
import { AntDesign } from '@expo/vector-icons';
// Components
import Button from './Button';

export interface Props {
    onPress?: React.ComponentProps<typeof Button>['onPress'];
    onPressOut?: React.ComponentProps<typeof Button>['onPressOut'];
    onPressIn?: React.ComponentProps<typeof Button>['onPressIn'];
    secondary?: boolean;
    confirmed?: boolean;
    title?: string;
}

const AddToCart: React.FC<Props> = ({
    onPress,
    onPressOut,
    onPressIn,
    secondary,
    confirmed,
    title,
}) => {
    return (
        <Button
            onPress={onPress}
            onPressOut={onPressOut}
            onPressIn={onPressIn}
            secondary
            confirmed={confirmed}
            buttonStyle={styles.buttonStyle}
            title={title}
        />
    );
};

export default AddToCart;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 12,
        backgroundColor: '#1B463C',
        borderRadius: 1000,
    },
    buttonStyle: {
        width: Dimensions.get('window').width / 2.5,
    },
    buttonConfirmed: {
        width: Dimensions.get('window').width / 2.5,
        backgroundColor: '#9DB76E',
    },
    quantityWrapper: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 5 - 10,
        marginHorizontal: 5,
    },
    text: {
        fontSize: 14,
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.2,
    },
    disabled: {
        opacity: 0.5,
    },
    displayNone: {
        display: 'none',
    },
});
