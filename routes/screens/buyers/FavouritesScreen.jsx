import React from 'react';
import { View, Dimensions, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ProductCard from '../../../components/buyers/ProductCard';
import dictionary from '../../../dictionary/products'
import generalStyles from '../../../styles/General';
import { mongoDbConfig } from '../../../utils/api';
import { productImages } from '../../../dictionary/images';
import axios from 'axios';

export default function FavouritesScreen() {

    const content = dictionary?.products; // DA dictionary

    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        // Fetch all categories from MongoDB api
        axios(mongoDbConfig('post', 'products'))
            .then(function (response) {
                setProducts(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    return (
        <SafeAreaView style={[generalStyles.container]}>
            <FlatList
                data={products}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                    <ProductCard
                    secondary
                    productTitle={content.productTitle[item?.productTitle]}
                    imageSrc={productImages[item?.imageSrc]}
                    producerTitle={item?.producerTitle}
                    productDesc={content.productDesc[item?.productDesc]}
                    productUnit={item?.productUnit}
                    bulkPrice={item?.bulkPrice + '/' + content.currency.DKK + ' kolli'}
                    singlePrice={item?.singlePrice + '/' + content.currency.DKK + ' enhed'}
                />
                )}
                numColumns={2}
                scrollEnabled={true}
                contentContainerStyle={[
                    styles.contentContainerStyle,
                ]}
                columnWrapperStyle={styles.columnWrapperStyle}
            ></FlatList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        padding: 15,
        width: '100%',
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
});
