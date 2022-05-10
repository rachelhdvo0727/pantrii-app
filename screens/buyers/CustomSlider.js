import * as React from 'react';
import {
    View,
    Text,
    Pressable,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Platform,
} from 'react-native';
import CarouselItem from './FeaturedSlider';
import generalStyles from '../../styles/General';
import Carousel from 'react-native-snap-carousel';
import FeaturedCard from '../../components/FeaturedCard';

const { width } = Dimensions.get('window');
export default function CustomSlider() {
    const settings = {
        sliderWidth: width,
        sliderHeight: width,
        itemWidth: width - 80,
        renderItem: FeaturedCard,
    };
    return (
        <View style={styles.container}>
            <Carousel {...settings} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
    },
});
