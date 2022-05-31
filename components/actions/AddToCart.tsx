import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
import generalStyles from '../../styles/General';
import { AntDesign } from '@expo/vector-icons';
// Components
import Button from './Button';

export interface Props {
    onPressAdd?: React.ComponentProps<typeof Pressable>['onPress'];
    onPressMinus?: React.ComponentProps<typeof Pressable>['onPress'];
    quantity: number;
    disabled: boolean;
}

const AddToCart: React.FC<Props> = ({
    quantity,
    onPressAdd,
    onPressMinus,
    disabled,
}) => {
    const [isQuantityOpened, setIsQuantityOpened] = useState(false);
    const toggleButton = () => {
        setIsQuantityOpened(!isQuantityOpened);
    };
    return (
        <View>
            {isQuantityOpened ? (
                <View style={styles.container}>
                    <Pressable
                        style={[styles.button, disabled && styles.disabled]}
                        onPress={onPressMinus}
                        disabled={disabled}
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
            ) : null}
            {!isQuantityOpened ? (
                <Button
                    onPress={toggleButton}
                    secondary
                    title="Tilføj til kurv"
                />
            ) : null}
        </View>
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
});
