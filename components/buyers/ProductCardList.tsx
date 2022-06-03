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
// Components
import ThermoIcon from '../svgs/ThermoIcon';
import OrganicIcon from '../svgs/OrganicIcon';
import FrozenIcon from '../svgs/FrozenIcon';
import AddMinusToCart from '../actions/AddMinusToCart';
import DeleteIcon from '../actions/DeleteButton';
import Product from '../../models/Product';
import InformationCard from '../InformationCard';

export interface Props {
    cardStyle: StyleProp<PressableProps>;
    imageSrc: React.ComponentProps<typeof Image>['source'];
    productTitle: Product['productTitle'];
    producerTitle: Product['producerTitle'];
    productUnit: Product['productUnit'];
    bulkPrice: number;
    isCold?: string;
    isFrozen?: string;
    isOrganic?: string;
    onPressDelete: () => void;
    quantity?: number;
    onPressAdd?: React.ComponentProps<typeof Pressable>['onPress'];
    onPressMinus?: React.ComponentProps<typeof Pressable>['onPress'];
    disabled: boolean;
}

const ProductCardList = ({
    quantity,
    onPressAdd,
    onPressMinus,
    disabled,
    bulkPrice,
    imageSrc,
    productTitle,
    producerTitle,
    productUnit,
    isCold,
    isFrozen,
    isOrganic,
    onPressDelete,
}: Props) => {
    return (
        <View style={styles.container}>
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
            <View style={styles.productWrapper}>
                <View>
                    <Text style={styles.productTitle} numberOfLines={1}>
                        {productTitle}
                    </Text>
                    <Text style={styles.producerTitle}>{producerTitle}</Text>
                    <Text style={styles.unit}>{productUnit}</Text>
                </View>
                <View style={styles.bottomWrapper}>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.bulkPrice}>{bulkPrice}</Text>
                    </View>
                    <AddMinusToCart
                        quantity={quantity}
                        onPressAdd={onPressAdd}
                        onPressMinus={onPressMinus}
                        disabled={disabled}
                    />
                </View>
            </View>
            <View style={styles.delete}>
                <DeleteIcon onPress={onPressDelete} />
            </View>
        </View>
    );
};

export default ProductCardList;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        height: 140,
    },
    productWrapper: {
        width: '70%',
        flexDirection: 'column',
        paddingLeft: 10,
        justifyContent: 'space-between',
    },
    image: {
        width: '30%',
        height: '100%',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    unit: {
        fontSize: 10,
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.2,
        paddingVertical: 5,
    },
    priceWrapper: {
        paddingVertical: 5,
        marginRight: 4,
        justifyContent: 'center',
    },
    bulkPrice: {
        fontSize: 16,
        fontFamily: 'TT-Commons-DemiBold',
        letterSpacing: 0.2,
        paddingBottom: 1.5,
    },
    singularPrice: {
        fontSize: 12,
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.2,
    },
    icons: {
        position: 'absolute',
        zIndex: 1,
        left: 15,
        top: 15,
    },
    iconHidden: {
        display: 'none',
        marginTop: 2.5,
    },
    delete: {
        position: 'absolute',
        zIndex: 1,
        right: 10,
        top: 10,
    },
});
