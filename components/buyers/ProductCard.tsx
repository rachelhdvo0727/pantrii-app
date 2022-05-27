import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ThermoIcon from '../svgs/ThermoIcon';
import OrganicIcon from '../svgs/OrganicIcon';
import FrozenIcon from '../svgs/FrozenIcon';
import FavoriteIcon from '../actions/FavouriteIcon';
import Modal from 'react-native-modal';
import FavoriteButton from '../actions/FavoriteButton';
import IconButton from '../actions/IconButton';
import Button from '../actions/Button';
import CloseButton from '../actions/CloseButton';

export interface Props {
    // onPress: React.ComponentProps<typeof Pressable>['onPress'];
    imageSrc: React.ComponentProps<typeof Image>['source'];
    productTitle: string;
    producerTitle: string;
    productDesc: string;
    productUnit: string;
    bulkPrice: string;
    singlePrice: string;
    secondary?: boolean;
    isCold?: string;
    isFrozen?: string;
    isOrganic?: string;
}

const ProductCard = ({
    // onPress,
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
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        console.log('hi');
    };
    return (
        <View>
            {/* Slide up modal */}
            <Modal
                isVisible={isModalVisible}
                coverScreen={true}
                deviceHeight={Dimensions.get('window').height - 80}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection="down"
                backdropOpacity={0.3}
            >
                <View style={styles.modalWrapper}>
                    <CloseButton
                        style={{
                            position: 'absolute',
                            zIndex: 4,
                            top: Dimensions.get('window').height - 440,
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
                                <View style={styles.padding}>
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
                                        styles.padding,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.bulkPrice,
                                            styles.modalH2,
                                        ]}
                                    >
                                        {bulkPrice}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.singularPrice,
                                            styles.modalH3,
                                        ]}
                                    >
                                        {singlePrice}
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
                                    <IconButton arrowRight title="Detaljer" />
                                </View>
                                <View style={styles.paddingRight}>
                                    <Button secondary title="Tilføj til kurv" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.productWrapper, secondary && styles.secondary]}
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
                            <Text style={styles.singularPrice}>
                                {singlePrice}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.cartButtonWrapper,
                                { width: secondary ? 36 : 30 },
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
        width: 180,
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
    modalWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 58,
    },
    modalView: {
        width: Dimensions.get('window').width,
        height: 350,
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
        letterSpacing: 0.2,
        paddingHorizontal: 20,
        paddingVertical: 5,
        textTransform: 'uppercase',
    },
    modalH2: {
        fontSize: 18,
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 0.2,
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
    padding: {
        paddingHorizontal: 20,
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
        top: Dimensions.get('window').height - 440,
    },
});
