import React from 'react';
import generalStyles from '../../styles/General';
// Components
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import ProductCard from './ProductCard';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProductsForProducer } from '../../redux/slice/producerProducts';
import { productImages } from '../../dictionary/images';

const ProducerProductList = ({ limit, producerId }) => {
    const dispatch = useDispatch();
    const { producerProducts } = useSelector(
        (state) => state?.producerProducts,
    );
    const listConfig = { producerId: producerId, limit: limit };

    React.useEffect(() => {
        dispatch(getProductsForProducer(listConfig));
    }, []);

    return (
        <SafeAreaView>
            {limit < 5 ? (
                <View>
                    {producerProducts?.map((item) => (
                        <ProductCard
                            key={item?._id}
                            productTitle={item?.productTitle}
                            productDesc={item?.productDesc}
                            productUnit={item?.productUnit}
                            bulkPrice={item?.bulkPrice}
                            singlePrice={item?.singlePrice}
                            imageSrc={productImages[item?.imageSrc]}
                            amount={item?.amount}
                        ></ProductCard>
                    ))}
                </View>
            ) : (
                <FlatList
                    data={producerProducts}
                    keyExtractor={(item) => item?._id}
                    renderItem={({ item }) => (
                        <ProductCard
                            productTitle={item?.productTitle}
                            productDesc={item?.productDesc}
                            productUnit={item?.productUnit}
                            bulkPrice={item?.bulkPrice}
                            singlePrice={item?.singlePrice}
                            imageSrc={productImages[item?.imageSrc]}
                            amount={item?.amount}
                        />
                    )}
                    contentContainerStyle={styles.listContainer}
                ></FlatList>
            )}
        </SafeAreaView>
    );
};

export default ProducerProductList;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    listContainer: {},
    image: {
        resizeMode: 'cover',
        width: '30%',
        height: '106.5%',
        marginRight: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    productContent: {
        paddingVertical: 5,
        flexShrink: 1,
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
        borderBottomWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.5)',
        borderStyle: 'dashed',
    },
    bottomSection: {
        paddingRight: 10,
        paddingTop: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
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
