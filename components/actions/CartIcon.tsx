import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface Props {
    name: any;
    color: string;
    size: number;
    // totalAmount: number;
}

function CartIcon({ name, color, size }: Props) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => navigation.navigate('CartScreen')}
        >
            <Ionicons name={name} size={size} color={color} />
            <View
                style={{
                    flexDirection: 'column',
                    height: 20,
                }}
            >
                <Text style={{ color: 'black', fontSize: 12 }}>Hi</Text>
            </View>
        </TouchableOpacity>
    );
}

export default CartIcon;

const styles = StyleSheet.create({
    container: {},
});
