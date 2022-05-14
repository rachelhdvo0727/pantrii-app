import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Pressable,
    ImageBackground,
} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Dimensions.get('window').width - 30;

export interface Props {
    onPress?: () => void;
    title: string;
    imageSrc: { uri: string };
}

const HeroCard = ({ title, imageSrc, onPress }: Props) => {
    return (
        <Pressable style={styles.featuredWrapper}>
            <ImageBackground
                source={imageSrc}
                style={styles.imageBg}
                resizeMode="cover"
                imageStyle={{ borderRadius: 10 }}
            >
                <Text style={styles.featuredTitle}>{title}</Text>
            </ImageBackground>
        </Pressable>
    );
};

export default HeroCard;

const styles = StyleSheet.create({
    featuredWrapper: {
        width: '100%',
        height: 170,
        borderRadius: 10,
    },
    imageBg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    featuredTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});
