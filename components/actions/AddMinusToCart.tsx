import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
import generalStyles from '../../styles/General';
import { AntDesign } from '@expo/vector-icons';
// Components
import Button from './Button';

export interface Props {
    quantity?: number;
    onPressAdd?: React.ComponentProps<typeof Pressable>['onPress'];
    onPressMinus?: React.ComponentProps<typeof Pressable>['onPress'];
    disabled: boolean;
}

const AddMinusToCart: React.FC<Props> = ({
    quantity,
    onPressAdd,
    onPressMinus,
    disabled,
}) => {
    return (
        <View style={[styles.container]}>
            <Pressable
                style={[styles.button, disabled ? styles.disabled : null]}
                disabled={disabled}
                onPress={onPressMinus}
            >
                <AntDesign name="minus" size={14} color="white" />
            </Pressable>
            <View style={styles.quantityWrapper}>
                <Text style={styles.text}>{quantity}</Text>
            </View>
            <Pressable style={styles.button} onPress={onPressAdd}>
                <AntDesign name="plus" size={14} color="white" />
            </Pressable>
        </View>
    );
};

export default AddMinusToCart;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#1B463C',
        borderRadius: 1000,
        padding: 8,
    },
    quantityWrapper: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 7,
        marginHorizontal: 4,
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
