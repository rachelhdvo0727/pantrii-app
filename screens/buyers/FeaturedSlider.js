import React from 'react';
import { ParallaxImage } from 'react-native-snap-carousel';
import {
    View,
    Text,
    Pressable,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Platform,
} from 'react-native';

import generalStyles from '../../styles/General';

function CarouselItem({ item, index }, parallaxProps) {
    return (
        <Pressable
            onPress={() => alert('Image description:' + item.description)}
        >
            <SafeAreaView style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.source }} /* the source of the image */
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    {...parallaxProps} /* pass in the necessary props */
                />
                /* CarouselItem.js */
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
            </SafeAreaView>
        </Pressable>
    );
}

export default CarouselItem;

const { width: screenWidth } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
    },
    title: {
        fontSize: 20,
    },
    item: {
        width: '100%',
        height: screenWidth - 20, //height will be 20 units less than screen width.
    },
    imageContainer: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: 'lightblue',
        marginBottom: Platform.select({ ios: 0, android: 1 }), //handle rendering bug.
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    },
    dotContainer: {
        backgroundColor: 'rgb(230,0,0)',
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'black',
    },
    inactiveDotStyle: {
        backgroundColor: 'rgb(255,230,230)',
    },
});
