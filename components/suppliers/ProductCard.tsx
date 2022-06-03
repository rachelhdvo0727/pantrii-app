import React from 'react';
import generalStyles from '../../styles/General';
import Product from '../../models/Product';
// Components
import { StyleSheet, Text, View, Image } from 'react-native';
import InformationCard from '../InformationCard';

export interface Props {
    productTitle: Product['productTitle'];
    amount: Product['amount'];
    productDesc: Product['productDesc'];
    productUnit: Product['productUnit'];
    bulkPrice: Product['bulkPrice'];
    singlePrice: Product['singlePrice'];
    isLowOnStock?: boolean;
    isSoldOut?: boolean;
    imageSrc?: React.ComponentProps<typeof Image>['source'];
    cardStyle?: React.ComponentProps<typeof InformationCard>['style'];
}

const ProductCard = ({
    productTitle,
    amount,
    productDesc,
    productUnit,
    bulkPrice,
    singlePrice,
    imageSrc,
    cardStyle,
    isSoldOut,
    isLowOnStock,
}: Props) => {
    return (
        <InformationCard style={[styles.container, cardStyle]}>
            <Image style={styles.image} source={imageSrc} />
            <View style={styles.productContent}>
                <View>
                    <Text style={styles.productTitle}>{productTitle}</Text>

                    <Text style={styles.amountText}>
                        Antal: 
                        <Text
                            style={
                                isLowOnStock
                                    ? styles.amountNegative
                                    : styles.amountPositive
                            }
                        >
                            {amount}
                        </Text>
                    </Text>
                </View>

                <View>
                    <Text style={styles.productDesc}>{productDesc}</Text>
                </View>
                <View>
                    <Text style={styles.unitText}>{productUnit}</Text>
                    <View>
                        <Text style={styles.bulkPrice}>{bulkPrice}</Text>
                        <Text style={styles.singularPrice}>{singlePrice}</Text>
                    </View>
                </View>
            </View>
        </InformationCard>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: { flexDirection: 'row' },
    image: {
        resizeMode: 'cover',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    productContent: {},
    productTitle: {
        fontSize: 16,
        color: '#1B463C',
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
        paddingVertical: 2,
        paddingHorizontal: 7.5,
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
