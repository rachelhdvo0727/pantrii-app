import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import generalStyles from '../../styles/General';

export interface Props {
    onPress?: React.ComponentProps<typeof TouchableOpacity>['onPress'];
    title: string;
    imageSrc: React.ComponentProps<typeof ImageBackground>['source'];
    secondary?: boolean;
    cardStyle?: React.ComponentProps<typeof TouchableOpacity>['style'];
    imageStyle?: React.ComponentProps<typeof ImageBackground>['imageStyle'];
}

const CategoryCard: React.FC<Props> = ({
    title,
    imageSrc,
    onPress,
    secondary,
    cardStyle,
    imageStyle,
}) => {
    return (
        <TouchableOpacity
            style={[
                generalStyles.cardContainer,
                styles.container,
                secondary && styles.secondary,
                cardStyle,
            ]}
            onPress={onPress}
        >
            <ImageBackground
                source={imageSrc}
                style={generalStyles.imageBg}
                resizeMode="cover"
                imageStyle={[{ borderRadius: secondary ? 5 : 10 }, imageStyle]}
            >
                <View style={[styles.background]}></View>
                <Text
                    style={[
                        generalStyles.headerH1,
                        styles.title,
                        secondary && styles.secondaryTitle,
                    ]}
                >
                    {title}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default CategoryCard;

const styles = StyleSheet.create({
    secondary: {
        width: 122,
        height: 50,
    },
    secondaryTitle: {
        fontSize: 12,
    },
    container: {
        marginBottom: 15,
    },
    background: {
        backgroundColor: '#000000',
        borderRadius: 5,
        position: 'absolute',
        height: 120,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 888,
        opacity: 0.2,
    },
    title: {
        zIndex: 999,
    },
});
