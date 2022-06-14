import React from 'react';
import generalStyles from '../../styles/General';
import Product from '../../models/Product';
// Components
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import InformationCard from '../InformationCard';

export interface Props {
    onPress?: React.ComponentProps<typeof TouchableOpacity>['onPress'];
    productTitle: Product['productTitle'];
    productDesc: Product['productDesc'];
    productUnit: Product['productUnit'];
    amountInStock: Product['amountInStock'];
    bulkPrice: Product['bulkPrice'];
    singlePrice: Product['singlePrice'];
    isLowOnStock?: boolean;
    isSoldOut?: boolean;
    imageSrc?: React.ComponentProps<typeof Image>['source'];
    cardStyle?: React.ComponentProps<typeof InformationCard>['style'];
}

const ProductCard = ({
    onPress,
    productTitle,
    productDesc,
    productUnit,
    amountInStock,
    bulkPrice,
    singlePrice,
    imageSrc,
    cardStyle,
    isSoldOut,
    isLowOnStock,
}: Props) => {
    return (
        // <TouchableOpacity onPress={onPress}>
        <InformationCard style={[styles.container, cardStyle]}>
            <Image style={styles.image} source={imageSrc} />

            <View style={styles.productContent}>
                <View style={styles.topSection}>
                    <Text
                        style={styles.productTitle}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {productTitle?.length > 18
                            ? productTitle?.substring(0, 18 - 3) + '...'
                            : productTitle}
                    </Text>
                    <Text style={styles.amountText}>
                        {isSoldOut ? (
                            <Text style={styles.amountNegative}>UDSOLGT</Text>
                        ) : (
                            <Text>
                                Antal:&ensp;
                                <Text
                                    style={
                                        isLowOnStock
                                            ? styles.amountLow
                                            : styles.amountPositive
                                    }
                                >
                                    {amountInStock}
                                </Text>
                            </Text>
                        )}
                    </Text>
                </View>

                <View style={styles.middleSection}>
                    <Text style={styles.productDesc} numberOfLines={1}>
                        {productDesc}
                    </Text>
                </View>
                <View style={styles.dottedLine}></View>
                <View style={styles.bottomSection}>
                    <Text style={styles.unitText}>{productUnit}</Text>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.bulkPrice}>
                            {bulkPrice}
                            <Text
                                style={{
                                    fontSize: 11,
                                }}
                            >
                                &thinsp; /kolli
                            </Text>
                        </Text>
                        <Text style={styles.singularPrice}>
                            {singlePrice}
                            <Text
                                style={{
                                    fontSize: 11,
                                }}
                            >
                                &thinsp; /enhed
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </InformationCard>
        // </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    image: {
        resizeMode: 'cover',
        width: '28%',
        height: '106.5%',
        marginRight: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    productContent: {
        paddingVertical: 5,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    topSection: {
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(189, 189, 189, 0.5)',
    },
    middleSection: {
        paddingRight: 10,
        paddingVertical: 3,
        borderBottomWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.5)',
        borderStyle: 'dashed',
    },
    dottedLine: {
        borderColor: 'rgba(189, 189, 189, 0.5)',
        borderStyle: 'dashed',
        borderWidth: 0.5,
    },
    bottomSection: {
        paddingRight: 10,
        paddingTop: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    priceWrapper: {
        alignItems: 'flex-end',
    },
    productTitle: {
        fontSize: 16,
        color: '#1B463C',
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
        paddingVertical: 2,
    },
    productDesc: {
        fontSize: 12,
        color: '#797979',
        fontFamily: 'TT-Commons-Medium',
        letterSpacing: 0.5,
        paddingTop: 2,
    },
    amountText: {
        ...generalStyles.mediumText,
    },
    amountPositive: { color: '#9DB76E' },
    amountLow: { color: '#EA6F2D' },
    amountNegative: { color: '#FF0000' },
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
    unitText: {
        fontSize: 10,
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.2,
        paddingVertical: 5,
    },
});
