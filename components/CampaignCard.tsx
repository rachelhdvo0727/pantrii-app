import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ImageBackground,
} from 'react-native';
import generalStyles from '../styles/General.js';


interface Props {
    // onPress: () => void;
    title: string;
    imageSrc: { uri: string };
}

const CampaginCard = ({
    title,
    imageSrc,
    // onPress,
}: Props) => {
    return (
        <Pressable style={generalStyles.containerLarge}>
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

export default CampaginCard;

const styles = StyleSheet.create({
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