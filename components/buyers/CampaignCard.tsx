import React from 'react';
import { StyleSheet, Text, Pressable, ImageBackground } from 'react-native';
import generalStyles from '../../styles/General';

interface Props {
    onPress?: React.ComponentProps<typeof Pressable>['onPress'];
    title: string;
    imageSrc: React.ComponentProps<typeof ImageBackground>['source'];
}

function CampaignCard({ title, imageSrc, onPress }: Props) {
    return (
        <Pressable
            style={[generalStyles.containerLarge, styles.container]}
            onPress={onPress}
        >
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
}

export default CampaignCard;

const styles = StyleSheet.create({
    container: {
        marginRight: 15,
    },
});