import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ImageBackground,
} from 'react-native';
import generalStyles from '../../styles/General';


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
        <Pressable style={generalStyles.cardContainer}>
            <ImageBackground
                source={imageSrc}
                style={generalStyles.imageBg}
                resizeMode="cover"
                imageStyle={{ borderRadius: 10 }}
            >
                <Text style={generalStyles.headerH1}>{title}</Text>
            </ImageBackground>
        </Pressable>
    );
};

export default CampaginCard;

