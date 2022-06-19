import React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import generalStyles from '../../styles/General';

export interface Props {
    onPress?: React.ComponentProps<typeof TouchableOpacity>['onPress'];
    title: string;
    imageSrc: React.ComponentProps<typeof ImageBackground>['source'];
}

const CampaignCard: React.FC<Props> = ({ title, imageSrc, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <ImageBackground
                source={imageSrc}
                style={generalStyles?.imageBg}
                resizeMode="cover"
                imageStyle={{ borderRadius: 10 }}
            >
                <Text style={generalStyles.headerH1}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default CampaignCard;

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginRight: 15,
        height: 120,
    },
    overlay: {
        backgroundColor: '#000000',
        borderRadius: 10,
        position: 'absolute',
        height: 120,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 888,
        opacity: 0.28,
    },
    title: {
        textAlign: 'center',
        zIndex: 999,
    },
});
