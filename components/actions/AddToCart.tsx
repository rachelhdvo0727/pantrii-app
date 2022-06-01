import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
import generalStyles from '../../styles/General';
import { AntDesign } from '@expo/vector-icons';
// Components
import Button from './Button';

export interface Props {
    // quantity?: number;
    // onPressAdd?: React.ComponentProps<typeof Pressable>['onPress'];
    // onPressMinus?: React.ComponentProps<typeof Pressable>['onPress'];
}

const AddToCart: React.FC<Props> = ({}) => {
    const [quantity, setQuantity] = useState(1);
    const [add, setAdd] = useState('Tilføj til kurv');
    const onPressConfirm = () => setAdd('Tilføjet');
    return (
        <Button
            // onPress={onPressAdd}
            onPress={() => {
                setAdd('Tilføjet');
                setQuantity(quantity + 1);
                console.log(quantity);
            }}
            secondary
            title={add}
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
