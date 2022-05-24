import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
} from 'react-native';
import generalStyles from '../../../styles/General';
import axios from 'axios';
import { fetchFeaturedProducts } from '../../../utils/api';
import ProductCard from '../../../components/buyers/ProductCard';
import dictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';

export default function HighlightProductsScreen() {
    const content = dictionary?.products; // DA dictionary
    
    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        axios(fetchFeaturedProducts('post', 'products'))
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
        width: '100%',
        padding: 15,
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
});