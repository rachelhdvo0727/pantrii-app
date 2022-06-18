import React from 'react';
import {
    Text,
    StyleSheet,
    Pressable,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { SLIDER_WIDTH } from '../../utils/variables';

export const ITEM_WIDTH = SLIDER_WIDTH - 30;

export interface Props {
    onPress?: React.ComponentProps<typeof TouchableOpacity>['onPress'];
    title: string;
    imageSrc: React.ComponentProps<typeof ImageBackground>['source'];
    secondary?: boolean;
    banner?: boolean;
}

const HeroCard = ({ title, imageSrc, onPress, secondary, banner }: Props) => {
    return (
        <TouchableOpacity
            style={[styles.featuredWrapper, secondary && styles.secondary]}
            onPress={onPress}
        >
            <ImageBackground
                source={imageSrc}
                style={styles.imageBg}
                resizeMode="cover"
                imageStyle={{ borderRadius: banner ? 0 : 10 }}
            >
                <Text style={styles.featuredTitle}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
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
