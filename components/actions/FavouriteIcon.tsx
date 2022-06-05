import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export interface Props {
    onPress?: React.ComponentProps<typeof Pressable>['onPress'];
    isActive?: boolean;
    onPressOut?: React.ComponentProps<typeof Pressable>['onPress'];
}

const FavoriteIcon: React.FC<Props> = ({ isActive, onPress, onPressOut }) => {
    return (
        <Pressable
            style={styles.container}
            onPress={onPress}
            onPressOut={onPressOut}
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
        color: '#EA6F2D', // for title
    },
});
