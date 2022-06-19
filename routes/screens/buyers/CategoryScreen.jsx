import React from 'react';
import generalStyles from '../../../styles/General';
import categoryDictionary from '../../../dictionary/categories';
import productDictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';
import { categoryImages } from '../../../dictionary/images';
import { SLIDER_WIDTH, sortOptions } from '../../../utils/variables';
import { numberFormat } from '../../../utils/functions';
import { useNavigation } from '@react-navigation/native';
// Components
import { StyleSheet, View, FlatList } from 'react-native';
import SearchBar from '../../../components/SearchBar';
import CategoryCard from '../../../components/buyers/CategoryCard';
import ProductCard from '../../../components/buyers/ProductCard';
import Slider from '../../../components/Slider';
import SelectDropDown from '../../../components/SelectDropDown';
import BackIconButton from '../../../components/actions/BackIconButton';
import NotFound from '../../../components/NotFound';
import Spinner from '../../../components/Spinner';
// API
import axios from 'axios';
import {
    fetchCategoryProducts,
    fetchAvailableProducts,
} from '../../../utils/api';
// Redux
import { useDispatch, useSelector, connect } from 'react-redux';
import { addToCart } from '../../../redux/reducer/CartReducer';
import {
    addToFavourite,
    removeFavourite,
} from '../../../redux/reducer/FavouriteReducer';
// Translations
import { useTranslation } from 'react-i18next';

export default function CategoryScreen(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const categoryContent = categoryDictionary?.categories;
    const productContent = productDictionary?.products;
    const favourite = useSelector((state) => state.favourite);
    const favouriteId = favourite.map((i) => i?._id);
    // Clean up
    const { categories } = useSelector((state) => state.categories);
    const categoryId = props?.route?.params?.category?._id;
    const categoryName = props?.route?.params?.category?.name;
    const filteredCategories = categories?.filter(
        (t) => t?.name !== categoryName,
    );
    const isAllProductsView = filteredCategories[0]?.name !== 'allProducts'; // For hiding category slider
    const [categoryProducts, setCategoryProducts] = React.useState(null);
    const [selectedSort, setSelectedSort] = React.useState(sortOptions[0]);
    const onSelectedSort = (item) => {
        setSelectedSort(item);
    };

    const [searchValue, setSearchValue] = React.useState('');
    const [filteredDataSource, setFilteredDataSource] = React.useState([]);

    const { t } = useTranslation();

    React.useEffect(() => {
        // Update Screen's headerTitle
        props.navigation?.setOptions({
            headerTitle: categoryContent?.name[categoryName]?.toUpperCase(),
            headerLeft: () =>
                !isAllProductsView && (
                    <BackIconButton onPress={() => navigation.goBack()} />
                ),
        });

        // Fetch this category's products
        axios(
            isAllProductsView
                ? fetchAvailableProducts('products')
                : fetchCategoryProducts(categoryId),
        )
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
    }, [categoryId, categoryName]);

    const handleShowSearchScreen = () => {
        navigation.navigate('SearchScreen', {
            products: categoryProducts,
        });
    };

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Filter the categoryProducts
            const newData = categoryProducts.filter((item) => {
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
            setFilteredDataSource(categoryProducts); // Update FilteredDataSource with categoryProducts
            setSearchValue(text);
        }
    };

    return (
        <View style={styles.container}>
            {/* Search directly on the shown list */}
            <SearchBar
                onChangeText={(text) => searchFilterFunction(text)}
                value={searchValue}
            />
            {/* Categories slider - show on ALL Products view*/}
            <React.Fragment>
                {isAllProductsView ? (
                    <Slider
                        title={t('navigate:categories')}
                        titleStyle={styles.titleStyle}
                        layout="default"
                        hasPagination
                        data={filteredCategories}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                        activeSlideAlignment="start"
                        snapToInterval={3}
                        itemWidth={128}
                        sliderWidth={SLIDER_WIDTH}
                        renderItem={({ item, index }) => (
                            <CategoryCard
                                secondary
                                key={index}
                                title={categoryContent?.name[item?.name]}
                                imageSrc={categoryImages[item?.imageSrc]}
                                onPress={() => {
                                    navigation.navigate(
                                        'CategoryProductsListScreen',
                                        {
                                            category: item,
                                        },
                                    );
                                }}
                            ></CategoryCard>
                        )}
                        dotStyle={styles.dotStyle}
                        containerStyle={styles.sliderContainer}
                        inactiveDotScale={1}
                        inactiveDotStyle={{
                            backgroundColor: '#BCBCBC',
                        }}
                    />
                ) : null}
                <SelectDropDown
                    label={t('common:labels.sort')}
                    data={sortOptions}
                    onSelect={onSelectedSort}
                    selectedItem={selectedSort}
                />
                {categoryProducts === null && <Spinner />}
                {categoryProducts?.length === 0 && (
                    <NotFound
                        text={`Der findes ikke produkter i ${categoryContent?.name[categoryName]} kategorien`}
                    />
                )}
                {/* Search directly on the shown list */}
                {categoryProducts?.length > 0 && (
                    <FlatList
                        data={
                            (selectedSort?.value === 'A-AA' &&
                                filteredDataSource?.sort((a, b) =>
                                    a.productTitle
                                        .normalize()
                                        .localeCompare(
                                            b.productTitle.normalize(),
                                        ),
                                )) ||
                            (selectedSort?.value === 'AA-A' &&
                                filteredDataSource?.sort((a, b) =>
                                    b.productTitle
                                        .normalize()
                                        .localeCompare(
                                            a.productTitle.normalize(),
                                        ),
                                )) ||
                            (selectedSort?.value === 'lowest' &&
                                filteredDataSource?.sort(
                                    (a, b) =>
                                        parseInt(a.bulkPrice) >
                                        parseInt(b.bulkPrice),
                                )) ||
                            (selectedSort?.value === 'highest' &&
                                filteredDataSource?.sort(
                                    (a, b) =>
                                        parseInt(a.bulkPrice) <
                                        parseInt(b.bulkPrice),
                                ))
                        }
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <ProductCard
                                productID={favouriteId?.filter(
                                    (i) => i == item?._id,
                                )}
                                productTitle={
                                    productContent.productTitle[
                                        item?.productTitle
                                    ] || item?.productTitle
                                }
                                imageSrc={productImages[item?.imageSrc]}
                                producerTitle={item?.producerTitle}
                                productDesc={
                                    productContent.productDesc[
                                        item?.productDesc
                                    ] || item?.productDesc
                                }
                                productUnit={item?.productUnit}
                                bulkPrice={numberFormat(item?.bulkPrice)}
                                singlePrice={numberFormat(item?.singlePrice)}
                                isCold={item.tags?.find((tag) => tag == 'cold')}
                                isOrganic={item.tags?.find(
                                    (tag) => tag == 'organic',
                                )}
                                isFrozen={item.tags?.find(
                                    (tag) => tag == 'frozen',
                                )}
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
                        contentContainerStyle={styles.productListContainer}
                        columnWrapperStyle={styles.columnWrapperStyle}
                    ></FlatList>
                )}
            </React.Fragment>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,

        padding: 0,
    },
    sliderContainer: {
        paddingVertical: 2,
        paddingHorizontal: 2,
        alignSelf: 'flex-end',
    },
    titleStyle: {
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 1,
        color: '#000000',
        fontSize: 14,
        textTransform: 'capitalize',
        marginVertical: 10,
    },
    productListContainer: {
        width: '100%',
        marginTop: 0,
        paddingHorizontal: 15,
    },
    shortListStyle: { alignItems: 'flex-start', marginHorizontal: 10 },
    cardStyle: {
        margin: 5,
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
});
