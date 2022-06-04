import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Dimensions,
    PressableProps,
    ViewProps,
    StyleProp,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
// Components
import ThermoIcon from '../svgs/ThermoIcon';
import OrganicIcon from '../svgs/OrganicIcon';
import FrozenIcon from '../svgs/FrozenIcon';
import FavoriteIcon from '../actions/FavouriteIcon';
import Modal from 'react-native-modal';
import FavoriteButton from '../actions/FavoriteButton';
import IconButton from '../actions/IconButton';
import CloseButton from '../actions/CloseButton';
import Product from '../../models/Product';
import AddToCart from '../actions/AddToCart';

export interface Props {
    // onPress: React.ComponentProps<typeof Pressable>['onPress'];
    cardStyle: StyleProp<PressableProps>;
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
    onPressAdd?: React.ComponentProps<typeof Pressable>['onPress'];
    id: string;
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
    onPress,
    onPressAdd,
    id,
}: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [addItem, setAddItem] = React.useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View key={id}>
            {/* Slide up modal */}
            <Modal
                isVisible={isModalVisible}
                coverScreen={true}
                onSwipeComplete={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}
                swipeDirection="down"
                backdropOpacity={0.3}
                animationOutTiming={500}
            >
                <View style={styles.modalWrapper}>
                    <CloseButton
                        style={{
                            position: 'absolute',
                            zIndex: 4,
                            top: Dimensions.get('window').height - 385,
                            right: 0,
                        }}
                        onPress={toggleModal}
                    />
                    <View style={styles.modalIcons}>
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
                    <View style={styles.modalView}>
                        <View style={styles.imageGallery}>
                            <Image
                                style={styles.modalImage}
                                source={imageSrc}
                            ></Image>
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.modalH1} numberOfLines={1}>
                                {productTitle}
                            </Text>
                            <View style={styles.bodyWrapper}>
                                <View style={[styles.paddingLeft, styles.desc]}>
                                    <Text
                                        style={[
                                            styles.producerTitle,
                                            styles.modalH2,
                                        ]}
                                    >
                                        {producerTitle}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.productDesc,
                                            styles.modalH3,
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {productDesc}
                                    </Text>
                                    <Text style={[styles.unit, styles.modalH4]}>
                                        {productUnit}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.modalPriceWrapper,
                                        styles.paddingRight,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.bulkPrice,
                                            styles.modalH2,
                                        ]}
                                    >
                                        {bulkPrice}/kolli
                                    </Text>
                                    <Text
                                        style={[
                                            styles.singularPrice,
                                            styles.modalH4,
                                        ]}
                                    >
                                        {singlePrice}/enhed
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.dottedLine}></View>
                            <View style={styles.modalBottomWrapper}>
                                <View
                                    style={[
                                        styles.bottomRightWrapper,
                                        styles.modalBottomRightWrapper,
                                    ]}
                                >
                                    <FavoriteButton />
                                    <IconButton
                                        arrowRight
                                        title="Detaljer"
                                        onPress={onPress}
                                        onPressOut={toggleModal}
                                    />
                                </View>
                                <View style={styles.paddingRight}>
                                    <AddToCart
                                        title={
                                            !addItem
                                                ? 'Tilføj til kurv'
                                                : 'Tilføjet'
                                        }
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
                        </View>
                    </View>
                </View>
            </Modal>
            {/* product card */}
            <Pressable
                style={[
                    styles.productWrapper,
                    secondary && styles.secondary,
                    cardStyle,
                ]}
                onPress={() => setModalVisible(true)}
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
                    <Text style={styles.producerTitle} numberOfLines={1}>
                        {producerTitle}
                    </Text>
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
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontFamily: 'TT-Commons-Regular',
                                }}
                            >
                                per kolli
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.cartButtonWrapper,
                                { width: secondary ? 36 : 36 },
                            ]}
                        >
                            <Ionicons
                                name="cart-outline"
                                size={16}
                                color="white"
                            />
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    productWrapper: {
        // width: 180,
        width: Dimensions.get('window').width / 2 - 25,
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
        paddingHorizontal: 7.5,
    },
    infoWrapper: {
        borderTopWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.5)',
        paddingVertical: 2,
        paddingHorizontal: 7.5,
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
        paddingLeft: 7.5,
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
        fontSize: 10,
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.2,
        paddingVertical: 5,
    },
    priceWrapper: {
        alignItems: 'flex-end',
        paddingVertical: 5,
        marginRight: 4,
        justifyContent: 'center',
    },
    bulkPrice: {
        fontSize: 14,
        fontFamily: 'TT-Commons-DemiBold',
        letterSpacing: 0.2,
        paddingBottom: 1.5,
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
    modalWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: -20,
    },
    modalView: {
        width: Dimensions.get('window').width,
        height: 375,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textWrapper: {
        width: '100%',
    },
    modalH1: {
        fontSize: 20,
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 0.5,
        paddingHorizontal: 20,
        paddingVertical: 5,
        textTransform: 'uppercase',
        color: '#1B463C',
    },
    modalH2: {
        fontSize: 18,
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 0.5,
    },
    modalH3: {
        fontSize: 16,
        fontFamily: 'TT-Commons-Medium',
        letterSpacing: 0.2,
    },
    modalH4: {
        fontSize: 14,
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.2,
    },
    imageGallery: {
        backgroundColor: 'pink',
        height: 185,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalImage: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.5)',
        paddingVertical: 5,
    },
    paddingLeft: {
        paddingLeft: 20,
    },
    paddingRight: {
        paddingRight: 20,
    },
    modalPriceWrapper: {
        alignItems: 'flex-end',
    },
    modalBottomWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingVertical: 5,
        alignContent: 'center',
        alignItems: 'center',
    },
    modalBottomRightWrapper: {
        height: 50,
    },
    modalIcons: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        top: Dimensions.get('window').height - 385,
    },
    desc: {
        width: '65%',
    },
});
