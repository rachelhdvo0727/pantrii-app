import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Dimensions,
    ScrollView,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
// Components
import ThermoIcon from '../svgs/ThermoIcon';
import OrganicIcon from '../svgs/OrganicIcon';
import FrozenIcon from '../svgs/FrozenIcon';
import FavoriteIcon from '../actions/FavouriteIcon';
import FavoriteButton from '../actions/FavoriteButton';
import IconButton from '../actions/IconButton';
import Button from '../actions/Button';
import Product from '../../models/Product';
// Dictionary
import dictionary from '../../dictionary/products.json';

export interface Props {
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
    onPress: () => void;
    productStory: string;
    productUnique: string;
    expiryDuration: string;
}

const ProductInfoCard = ({
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
    onPress,
    productStory,
    productUnique,
    expiryDuration,
}: Props) => {
    const [index, setIndex] = React.useState(0);
    const carouselRef = React.useRef(null);
    const content = dictionary?.products;
    const images = [
        { name: '627fc4457a0fa962a5cb745b-1.png' },
        { name: '627fc4457a0fa962a5cb745b-2.png' },
        { name: '627fc4457a0fa962a5cb745b-3.png' },
    ];
    const listItems = images.map((image) => <Text>{image.name}</Text>);
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
                {/* <Carousel
                layout="default"
                ref={carouselRef}
                data={images}
                activeSlideAlignment="start"
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                renderItem={({ item }) => {
                    listItems;
                }}
                sliderWidth={414}
                itemWidth={120} // width depends on window's screen
                useScrollView={true}
                onSnapToItem={(index) => setIndex(index)}
                enableSnap={false}
            /> */}
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
                            <Text style={styles.unit}>{productUnit}</Text>
                        </View>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.bulkPrice}>{bulkPrice}</Text>
                            <Text style={styles.singularPrice}>
                                {singlePrice}
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
                        {deliveryPrice}
                        {content.currency.DKK}
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
                <View style={styles.wrapper}>
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
                <FavoriteButton />
                <Button
                    secondary
                    buttonStyle={{ height: 45 }}
                    title="Tilføj til kurv"
                />
            </View>
        </View>
    );
};

export default ProductInfoCard;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        marginBottom: 15,
        paddingVertical: 10,
    },
    headerH1: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 0.6,
        paddingVertical: 5,
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
        height: 265,
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
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
    },
});
