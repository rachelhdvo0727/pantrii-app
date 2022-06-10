import React, { useState, useMemo, useRef, useCallback } from 'react';
import { numberFormat } from '../../utils/functions';
// Components
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    Pressable,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ThermoIcon from '../svgs/ThermoIcon';
import OrganicIcon from '../svgs/OrganicIcon';
import FrozenIcon from '../svgs/FrozenIcon';
import FavoriteButton from '../actions/FavoriteButton';
import Product from '../../models/Product';
import AddToCart from '../actions/AddToCart';
// Dictionary
import dictionary from '../../dictionary/products.json';

export interface Props {
    productID: string;
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
    onPress?: () => void;
    productStory: string;
    productUnique: string;
    expiryDuration: string;
    onPressAdd?: () => void;
    onPressFavourite?: React.ComponentProps<typeof Pressable>['onPress'];
    onPressUnFavourite?: React.ComponentProps<typeof Pressable>['onPress'];
}

const ProductInfoCard = ({
    productID,
    imageSrc,
    productTitle,
    producerTitle,
    productDesc,
    productUnit,
    bulkPrice,
    singlePrice,
    isCold,
    isFrozen,
    isOrganic,
    productStory,
    productUnique,
    expiryDuration,
    onPressAdd,
    onPressFavourite,
    onPressUnFavourite,
}: Props) => {
    const [index, setIndex] = React.useState(0);
    const carouselRef = React.useRef(null);
    const content = dictionary?.products;
    const [addItem, setAddItem] = React.useState(false);

    // Delivery cost
    const deliveryPrice = '2000';
    // Delivery date
    let today = new Date();
    today.setDate(today.getDate() + 7);
    let deliveryDate = new Date(today).toLocaleDateString('dk');

    return (
        <View>
            <ScrollView>
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
                <Image style={styles.image} source={imageSrc}></Image>

                <View style={styles.wrapper}>
                    <Text style={styles.productTitle}>{productTitle}</Text>
                    <View style={styles.flexWrapper}>
                        <View style={styles.infoWrapper}>
                            <Text style={styles.producerTitle}>
                                {producerTitle}
                            </Text>
                            <Text style={styles.productDesc}>
                                {productDesc}
                            </Text>
                            <Text style={styles.productID}>{productID}</Text>
                            <Text style={styles.unit}>{productUnit}</Text>
                        </View>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.bulkPrice}>
                                {bulkPrice}/kolli
                            </Text>
                            <Text style={styles.singularPrice}>
                                {singlePrice}/enhed
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.headerH1}>Levering</Text>
                    <Text style={styles.flexText}>
                        <Feather
                            name="box"
                            size={14}
                            color="black"
                            iconStyle={{ marginRight: 10 }}
                        />
                        {content.delivery.deliveryCost}
                        {numberFormat(deliveryPrice)}
                    </Text>
                    <Text style={styles.flexText}>
                        <MaterialCommunityIcons
                            name="truck-outline"
                            size={14}
                            color="black"
                        />
                        {content.delivery.deliveryDate} &nbsp;
                        {deliveryDate}
                    </Text>
                </View>
                <View style={styles.wrapperBottom}>
                    <Text style={styles.headerH1}>Produktbeskrivelse</Text>
                    <Text style={styles.p}>{productStory}</Text>
                    <Text style={styles.headerH1}>
                        Varens produktion adskiller sig fra lignende varer
                        fordi...
                    </Text>
                    <Text style={styles.p}>{productUnique}</Text>
                    <Text style={styles.headerH1}>Forventet holdbarhed...</Text>
                    <Text style={styles.flexText}>
                        <MaterialCommunityIcons
                            name="clock-time-two-outline"
                            size={14}
                            color="black"
                        />
                        &nbsp;
                        {expiryDuration}
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.bottomWrapper}>
                <FavoriteButton
                    isActive={productID == '' ? false : true}
                    onPress={
                        productID == '' ? onPressFavourite : onPressUnFavourite
                    }
                />

                <AddToCart
                    title={!addItem ? 'Tilføj til kurv' : 'Tilføjet'}
                    secondary={addItem ? false : true}
                    confirmed={addItem ? true : false}
                    onPressOut={() =>
                        setTimeout(() => {
                            setAddItem(false);
                        }, 400)
                    }
                    onPressIn={() =>
                        setTimeout(() => {
                            setAddItem(true);
                        }, 100)
                    }
                    onPress={onPressAdd}
                />
            </View>
        </View>
    );
};

export default ProductInfoCard;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        marginBottom: 20,
        paddingVertical: 10,
    },
    wrapperBottom: {
        backgroundColor: 'white',
        marginBottom: 80,
        paddingVertical: 10,
    },
    headerH1: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 0.6,
        paddingVertical: 8,
        paddingHorizontal: 20,
        lineHeight: 20,
    },
    p: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.6,
        paddingVertical: 5,
        paddingHorizontal: 20,
        lineHeight: 20,
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
        height: Dimensions.get('window').height / 3,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productTitle: {
        fontSize: 20,
        color: '#1B463C',
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    productID: {
        display: 'none',
    },
    infoWrapper: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        width: '60%',
    },
    producerTitle: {
        fontSize: 18,
        color: '#000000',
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 0.5,
    },
    productDesc: {
        fontSize: 16,
        color: '#797979',
        fontFamily: 'TT-Commons-Medium',
        letterSpacing: 0.5,
        paddingTop: 5,
    },
    flexWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.5)',
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
        paddingHorizontal: 15,
    },
    bulkPrice: {
        fontSize: 18,
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 0.2,
    },
    singularPrice: {
        fontSize: 16,
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.2,
        paddingTop: 4,
    },
    flexText: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 3,
        fontSize: 14,
        color: 'black',
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        display: 'flex',
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
        left: 20,
        top: 10,
    },
    iconHidden: {
        display: 'none',
        marginTop: 2.5,
    },
    bottomWrapper: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.5)',
        alignItems: 'center',
    },
});
