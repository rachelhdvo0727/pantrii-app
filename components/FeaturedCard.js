import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Dimensions.get('window').width - 30;

export default FeaturedCard = ({ item, index }) => {
    return (
        <View style={styles.featuredWrapper} key={index}>
            <ImageBackground
                source={item.imgUrl}
                style={styles.imageBg}
                resizeMode="cover"
                imageStyle={{ borderRadius: 10 }}
            >
                <Text style={styles.featuredTitle}>{item.title}</Text>
            </ImageBackground>
        </View>
    );
};

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
