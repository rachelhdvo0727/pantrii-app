import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export interface Props {
    onPress?: () => void;
}

const DeleteIcon: React.FC<Props> = ({ onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View>
                <AntDesign name="delete" size={18} color="#797979" />
            </View>
        </Pressable>
    );
};
export default DeleteIcon;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
});
