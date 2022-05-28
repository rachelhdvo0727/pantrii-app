import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export interface Props {
    onPress: () => void;
    isActive: boolean;
}

const FavoriteButton: React.FC<Props> = ({ isActive, onPress }) => {
    return (
        <Pressable
            style={[styles.container, isActive ? styles.isActive : null]}
        >
            <View style={styles.wrapper}>
                <Text style={[styles.title, isActive ? styles.isActive : null]}>
                    Favorite
                </Text>
                <FontAwesome
                    name="heart-o"
                    size={12}
                    color={isActive ? '#FFFFFF' : '#EA6F2D'}
                    style={[styles.iconSpacing, isActive && styles.isActive]}
                />
            </View>
        </Pressable>
    );
};
export default FavoriteButton;

const styles = StyleSheet.create({
    container: {
        borderColor: '#EA6F2D',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 1000,
        backgroundColor: '#FFFFFF',
        marginVertical: 10,
        justifyContent: 'center',
    },
    wrapper: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: 'TT-Commons-Regular',
        fontSize: 12,
        color: '#EA6F2D',
        textTransform: 'capitalize',
        lineHeight: 14,
        letterSpacing: 1.2,
    },
    iconSpacing: {
        marginLeft: 4,
        marginTop: 1.2,
    },
    isActive: {
        backgroundColor: '#EA6F2D',
        color: '#FFFFFF', // for title
    },
});
