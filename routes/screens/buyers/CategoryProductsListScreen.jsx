import React from 'react';
import generalStyles from '../../../styles/General';
import categoryDictionary from '../../../dictionary/categories.json';
import productDictionary from '../../../dictionary/products.json';
import { productImages } from '../../../dictionary/images';
import { sortOptions } from '../../../utils/variables';
import { useNavigation } from '@react-navigation/native';
import { numberFormat } from '../../../utils/functions';
// Component
import { StyleSheet, View, FlatList } from 'react-native';
import SelectDropDown from '../../../components/SelectDropDown';
import ProductCard from '../../../components/buyers/ProductCard';
import BackIconButton from '../../../components/actions/BackIconButton';
import NotFound from '../../../components/NotFound';
import Spinner from '../../../components/Spinner';
import SearchBar from '../../../components/SearchBar';
// API
import axios from 'axios';
import { fetchCategoryProducts } from '../../../utils/api';
// Redux
import { useDispatch, useSelector, connect } from 'react-redux';
import { addToCart } from '../../../redux/reducer/CartReducer';
import {
    addToFavourite,
    removeFavourite,
} from '../../../redux/reducer/FavouriteReducer';
// Translations
import { useTranslation } from 'react-i18next';

const CategoryProductsListScreen = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const category = props?.route?.params?.category;
    const categoryContent = categoryDictionary?.categories;
    const productContent = productDictionary?.products;
    const favourite = useSelector((state) => state.favourite);
    const favouriteId = favourite.map((i) => i?._id);

    const [categoryProducts, setCategoryProducts] = React.useState(null);
    const [selectedSort, setSelectedSort] = React.useState(sortOptions[0]);
    const onSelectedSort = (item) => {
        setSelectedSort(item);
    };

    const { t } = useTranslation();

    React.useEffect(() => {
        // Update Screen's headerTitle
        props?.navigation?.setOptions({
            headerTitle: t(
                'categories:categories.name.' + category?.name,
            )?.toUpperCase(),
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });

        // Fetch this category's products
        axios(fetchCategoryProducts(category?._id))
            .then((response) => {
                const data = response.data?.documents;
                setTimeout(() => {
                    setCategoryProducts(data);
                    setFilteredDataSource(data);
                }, 500);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [searchValue, setSearchValue] = React.useState('');
    const [filteredDataSource, setFilteredDataSource] = React.useState([]);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Filter the categoryProducts
            const newData = categoryProducts.filter((item) => {
                const searchedProductNames = t(
                    'products:products.productTitle.' + item?.productTitle,
                )
                    ? t(
                          'products:products.productTitle.' +
                              item?.productTitle,
                      ).toLowerCase()
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
            setFilteredDataSource(categoryProducts); // Update FilteredDataSource with categoryProducts
            setSearchValue(text);
        }
    };
    const sortedList =
        (selectedSort?.value === 'A-AA' &&
            filteredDataSource?.sort((a, b) =>
                a?.productTitle
                    .normalize()
                    .localeCompare(b?.productTitle.normalize()),
            )) ||
        (selectedSort?.value === 'AA-A' &&
            filteredDataSource?.sort((a, b) =>
                b.productTitle
                    .normalize()
                    .localeCompare(a.productTitle.normalize()),
            )) ||
        (selectedSort?.value === 'lowest' &&
            filteredDataSource?.sort(
                (a, b) => parseInt(a?.bulkPrice) > parseInt(b?.bulkPrice),
            )) ||
        (selectedSort?.value === 'highest' &&
            filteredDataSource?.sort(
                (a, b) => parseInt(a?.bulkPrice) < parseInt(b?.bulkPrice),
            ));

    return (
        <View style={styles.container}>
            <SearchBar
                onChangeText={(text) => searchFilterFunction(text)}
                value={searchValue}
            />

            <SelectDropDown
                label={t('common:labels.sort')}
                data={sortOptions}
                onSelect={onSelectedSort}
                selectedItem={selectedSort}
            />
            {categoryProducts === null && <Spinner />}
            {categoryProducts?.length === 0 && (
                <NotFound text={t('common:categories.notFound')} />
            )}
            {categoryProducts?.length > 0 && (
                <FlatList
                    data={sortedList}
                    keyExtractor={(item) => item?._id}
                    renderItem={({ item }) => (
                        <ProductCard
                            productID={favouriteId?.filter(
                                (i) => i == item?._id,
                            )}
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
                            isCold={item.tags?.find((tag) => tag === 'cold')}
                            isOrganic={item.tags?.find(
                                (tag) => tag === 'organic',
                            )}
                            isFrozen={item.tags?.find(
                                (tag) => tag === 'frozen',
                            )}
                            cardStyle={styles.cardStyle}
                            onPress={() =>
                                navigation.navigate('ProductScreen', {
                                    products: categoryProducts,
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
                    contentContainerStyle={styles.productListContainer}
                    columnWrapperStyle={styles.columnWrapperStyle}
                ></FlatList>
            )}
        </View>
    );
};

export default CategoryProductsListScreen;

const styles = StyleSheet.create({
    container: { ...generalStyles.container, padding: 0 },
    productListContainer: {
        width: '100%',
        marginTop: 0,
        paddingHorizontal: 15,
    },
    cardStyle: {
        margin: 5,
    },
    shortListStyle: { alignItems: 'flex-start', marginHorizontal: 10 },
    searchBar: {
        marginBottom: 15,
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
});
