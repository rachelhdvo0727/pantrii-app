import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ThermoIcon from '../svgs/ThermoIcon';
import OrganicIcon from '../svgs/OrganicIcon';
import FrozenIcon from '../svgs/FrozenIcon';
import FavoriteIcon from '../actions/FavouriteIcon';
import Product from '../../models/Product';

export interface Props {
    // onPress: React.ComponentProps<typeof Pressable>['onPress'];
    cardStyle: React.ComponentProps<typeof Pressable>['style'];
    imageSrc: React.ComponentProps<typeof Image>['source'];
    productTitle: Product['productTitle'];
    producerTitle: Product['producerTitle'];
    productDesc: Product['productDesc'];
    productUnit: Product['productUnit'];
    bulkPrice: Product['bulkPrice'];
    singlePrice: Product['singlePrice'];
    secondary?: boolean;
    isCold?: string;
    isFrozen?: string;
    isOrganic?: string;
    isFeatured?: Product['isFeatured'];
}

const ProductCard = ({
    // onPress,
    cardStyle,
    imageSrc,
    productTitle,
    producerTitle,
    productDesc,
    productUnit,
    bulkPrice,
    singlePrice,
    secondary,
    isCold,
    isFrozen,
    isOrganic,
}: Props) => {
    return (
        <Pressable
            style={[
                styles.productWrapper,
                secondary && styles.secondary,
                cardStyle,
            ]}
        >
            <View style={styles.icons}>
                {isCold ? (
                    <ThermoIcon
                        style={[
                            styles.iconHidden,
                            { display: isCold ? 'block' : '' },
                        ]}
                    />
                ) : null}
                {isOrganic ? (
                    <OrganicIcon
                        style={[
                            styles.iconHidden,
                            { display: isOrganic ? 'block' : '' },
                        ]}
                    />
                ) : null}
                {isFrozen ? (
                    <FrozenIcon
                        style={[
                            styles.iconHidden,
                            { display: isFrozen ? 'block' : '' },
                        ]}
                    />
                ) : null}
            </View>
            <View style={styles.favouriteIcon}>
                <FavoriteIcon />
            </View>
            <Image style={styles.image} source={imageSrc}></Image>
            <Text style={styles.productTitle} numberOfLines={1}>
                {productTitle}
            </Text>
            <View style={styles.infoWrapper}>
                <Text style={styles.producerTitle}>{producerTitle}</Text>
                <Text style={styles.productDesc} numberOfLines={1}>
                    {productDesc}
                </Text>
            </View>
            <View style={styles.dottedLine}></View>
            <View style={styles.bottomWrapper}>
                <Text style={styles.unit}>{productUnit}</Text>
                <View style={styles.bottomRightWrapper}>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.bulkPrice}>{bulkPrice}</Text>
                        <Text style={styles.singularPrice}>{singlePrice}</Text>
                    </View>
                    <View
                        style={[
                            styles.cartButtonWrapper,
                            { width: secondary ? 36 : 30 },
                        ]}
                    >
                        <Ionicons name="cart-outline" size={16} color="white" />
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    productWrapper: {
        // width: 180,
        width: Dimensions.get('window').width / 2 - 15,
        height: 190,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        position: 'relative',
    },
    secondary: {
        width: Dimensions.get('window').width / 2 - 20,
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
        paddingHorizontal: 10,
    },
    infoWrapper: {
        borderTopWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.5)',
        paddingVertical: 2,
        paddingHorizontal: 10,
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
        paddingLeft: 10,
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
        fontSize: 11,
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
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.2,
    },
    cartButtonWrapper: {
        backgroundColor: '#1B463C',
        height: 36,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icons: {
        position: 'absolute',
        zIndex: 1,
        left: 10,
        top: 2.5,
    },
    iconHidden: {
        display: 'none',
        marginTop: 2.5,
    },
    favouriteIcon: {
        position: 'absolute',
        zIndex: 1,
        right: 10,
        top: 5,
    },
});
