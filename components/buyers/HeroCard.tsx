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
import { SLIDER_WIDTH } from '../../utils/variables';

export const ITEM_WIDTH = SLIDER_WIDTH - 30;

export interface Props {
    onPress?: () => void;
    title: string;
    imageSrc: { uri: string };
    secondary?: boolean;
}

const HeroCard = ({ title, imageSrc, onPress, secondary }: Props) => {
    return (
        <Pressable
            style={[styles.featuredWrapper, secondary && styles.secondary]}
        >
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
        textAlign: 'center',
    },
    secondary: {
        height: 180 / 2,
    },
});
