import React from 'react';
import {
    Text,
    StyleSheet,
    Pressable,
    ImageBackground,
} from 'react-native';
import generalStyles from '../../styles/General';


export interface Props {
    onPress?: React.ComponentProps<typeof Pressable>['onPress'];
    title: string;
    imageSrc: React.ComponentProps<typeof ImageBackground>['source'];
    secondary?: boolean;
}

const CategoryCard : React.FC<Props> = ({ title, imageSrc, onPress, secondary }) => {
    return (
        <Pressable style={[generalStyles.cardContainer, styles.padding, secondary && styles.secondary]} onPress={onPress}>
            <ImageBackground
                source={imageSrc}
                style={generalStyles.imageBg}
                resizeMode="cover"
                imageStyle={{ borderRadius: secondary? 5 : 10 }}>
                <Text style={[generalStyles.headerH1, secondary && styles.secondaryTitle]}>{title}</Text>
            </ImageBackground>
        </Pressable>
    );
};

export default CategoryCard;

const styles = StyleSheet.create({
    secondary: {
        width: 122,
        height: 50,
    },
    secondaryTitle:{
        fontSize: 12,
    },
    padding:{
        marginBottom: 15,
    }
})