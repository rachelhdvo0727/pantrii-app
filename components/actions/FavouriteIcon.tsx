import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export interface Props {
    onPress?: React.ComponentProps<typeof Pressable>['onPress'];
    isActive?: boolean;
}

const FavoriteIcon: React.FC<Props> = ({ isActive, onPress }) => {
    return (
        <Pressable
            style={[styles.container, isActive ? styles.isActive : null]}
            onPress={onPress}
        >
            <View>
                <FontAwesome
                    name={isActive ? 'heart' : 'heart-o'}
                    size={20}
                    color="#EA6F2D"
                />
            </View>
        </Pressable>
    );
};
export default FavoriteIcon;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    isActive: {
        backgroundColor: '#EA6F2D',
        color: '#FFFFFF', // for title
    },
});
