import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import generalStyles from '../styles/General';
import Ionicons from '@expo/vector-icons/Ionicons';

// export default ProductCard = ({ item, index }) => {
export default function ProductCard() {
    return (
        <View style={styles.productWrapper}>
            {/* <View styles={styles.favouriteWrapper}>
                <Ionicons name="heart-outline" size={24} color="black" />
            </View> */}
            <Image
                style={styles.image}
                source={require('../assets/products/tofu.png')}
            ></Image>
            <Text style={styles.productTitle}>Tofu</Text>
            <View style={styles.infoWrapper}>
                <Text style={styles.producerTitle}>Le Trang</Text>
                <Text style={styles.productDesc}>
                    Tofu med citrongræs og chili
                </Text>
            </View>
            <View style={styles.dottedLine}></View>
            <View style={styles.bottomWrapper}>
                <Text style={styles.unit}>1 x 10stk</Text>
                <View style={styles.bottomRightWrapper}>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.bulkPrice}>200,00 /kolli</Text>
                        <Text style={styles.singularPrice}>20,00 /enhed</Text>
                    </View>
                    <View style={styles.cartButtonWrapper}>
                        <Ionicons name="cart-outline" size={16} color="white" />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    productWrapper: {
        width: 170,
        height: 190,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        position: 'relative',
    },
    favouriteWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 5,
    },
    image: {
        width: '100%',
        height: 100,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productTitle: {
        fontSize: 16,
        color: '#1B463C',
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    infoWrapper: {
        borderTopWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.5)',
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    producerTitle: {
        fontSize: 14,
        color: '#000000',
        fontFamily: 'TT-Commons-DemiBold',
        letterSpacing: 0.5,
    },
    productDesc: {
        fontSize: 12,
        color: '#797979',
        fontFamily: 'TT-Commons-Medium',
        letterSpacing: 0.5,
        paddingTop: 2,
    },
    bottomWrapper: {
        paddingLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomRightWrapper: {
        flexDirection: 'row',
    },
    dottedLine: {
        borderColor: 'rgba(189, 189, 189, 0.5)',
        borderStyle: 'dashed',
        borderWidth: 0.5,
    },
    unit: {
        fontSize: 12,
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.2,
        paddingVertical: 5,
    },
    priceWrapper: {
        alignItems: 'flex-end',
        paddingVertical: 5,
        marginRight: 4,
    },
    bulkPrice: {
        fontSize: 14,
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 0.2,
    },
    singularPrice: {
        fontSize: 12,
        fontFamily: 'TT-Commons-Medium',
        letterSpacing: 0.2,
    },
    cartButtonWrapper: {
        backgroundColor: '#1B463C',
        height: 36,
        width: 30,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
