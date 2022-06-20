import React from 'react';
import generalStyles from '../../../styles/General';
import categoryDictionary from '../../../dictionary/categories';
import productDictionary from '../../../dictionary/products';
import { useNavigation } from '@react-navigation/native';
import { numberFormat } from '../../../utils/functions';
import { productImages } from '../../../dictionary/images';
// Components
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import ProductCard from '../../../components/buyers/ProductCard';
import SearchBar from '../../../components/SearchBar';
// API & redux
import { useDispatch, useSelector, connect } from 'react-redux';
import { addToCart } from '../../../redux/reducer/CartReducer';
import {
    addToFavourite,
    removeFavourite,
} from '../../../redux/reducer/FavouriteReducer';
//Translation
import { useTranslation } from 'react-i18next';

const SearchScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const categoryContent = categoryDictionary?.categories;
    const productContent = productDictionary?.products;
    const products = props?.route?.params?.products;
    const { t } = useTranslation();

    React.useEffect(() => {}, []);

    const favourite = useSelector((state) => state.favourite);
    const favouriteId = favourite.map((i) => i?._id);

    const [searchValue, setSearchValue] = React.useState('');
    const [filteredDataSource, setFilteredDataSource] = React.useState([]);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Filter the products
            const newData = products.filter((item) => {
                const searchedProductNames = productContent.productTitle[
                    item?.productTitle
                ]
                    ? productContent.productTitle[
                          item?.productTitle
                      ].toLowerCase()
                    : ''.toLowerCase();

                const searchedProducerNames = item?.producerTitle
                    ? item?.producerTitle.toLowerCase()
                    : ''.toLowerCase();

                const textData = text.toLowerCase();

                return (
                    searchedProductNames.indexOf(textData) > -1 ||
                    searchedProducerNames.indexOf(textData) > -1
                );
            });
            setFilteredDataSource(newData); // Update FilteredDataSource
            setSearchValue(text);
        } else {
            setFilteredDataSource(products); // Update FilteredDataSource with categoryProducts
            setSearchValue(text);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                onChangeText={(text) => searchFilterFunction(text)}
                value={searchValue}
                autoFocus
            ></SearchBar>
            <FlatList
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ProductCard
                        productID={favouriteId?.filter((i) => i == item?._id)}
                        productTitle={t(
                            'products:products.productTitle.' +
                                item?.productTitle,
                        )}
                        imageSrc={productImages[item?.imageSrc]}
                        producerTitle={item?.producerTitle}
                        productDesc={t(
                            'products:products.productDesc.' +
                                item?.productDesc,
                        )}
                        productUnit={item?.productUnit}
                        bulkPrice={numberFormat(item?.bulkPrice)}
                        singlePrice={numberFormat(item?.singlePrice)}
                        isCold={item.tags?.find((tag) => tag == 'cold')}
                        isOrganic={item.tags?.find((tag) => tag == 'organic')}
                        isFrozen={item.tags?.find((tag) => tag == 'frozen')}
                        cardStyle={styles.cardStyle}
                        onPress={() =>
                            navigation.navigate('ProductScreen', {
                                product: item,
                            })
                        }
                        onPressAdd={() => {
                            dispatch(addToCart(item));
                        }}
                        onPressFavourite={() => {
                            dispatch(addToFavourite(item));
                        }}
                        onPressUnFavourite={() => {
                            dispatch(removeFavourite(item._id));
                        }}
                    />
                )}
                numColumns={2}
                scrollEnabled={true}
                contentContainerStyle={[
                    styles.productListContainer,
                    filteredDataSource?.length === 1 && styles.shortListStyle,
                ]}
            ></FlatList>
        </SafeAreaView>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: { ...generalStyles.container, padding: 0 },
    productListContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
        paddingHorizontal: 5,
    },
    shortListStyle: { alignItems: 'flex-start', marginHorizontal: 10 },
    cardStyle: {
        margin: 5,
    },
});
