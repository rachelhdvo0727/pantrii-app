import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import generalStyles from '../../../styles/General';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
// API
import { fetchFeaturedProducts } from '../../../utils/api';
// Components
import ProductCard from '../../../components/buyers/ProductCard';
// Dictionary
import dictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';

export default function HighlightProductsScreen() {
    const navigation = useNavigation();
    const content = dictionary?.products; // DA dictionary

    const [products, setProducts] = React.useState([]);

    const numberFormat = (total) =>
        new Intl.NumberFormat('en-DK', {
            style: 'currency',
            currency: 'DKK',
        }).format(total);

    React.useEffect(() => {
        axios(fetchFeaturedProducts('products'))
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
                        bulkPrice={numberFormat(item?.bulkPrice)}
                        singlePrice={numberFormat(item?.singlePrice)}
                        isCold={item.tags?.find((tag) => tag == 'cold')}
                        isOrganic={item.tags?.find((tag) => tag == 'organic')}
                        isFrozen={item.tags?.find((tag) => tag == 'frozen')}
                        onPress={() =>
                            navigation.navigate('ProductScreen', {
                                products: products,
                                product: item,
                            })
                        }
                    />
                )}
                numColumns={2}
                scrollEnabled={true}
                contentContainerStyle={[styles.contentContainerStyle]}
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
