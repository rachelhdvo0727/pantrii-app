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
import CategoryCard from '../../../components/buyers/CategoryCard';
import ProductCard from '../../../components/buyers/ProductCard';
import Slider from '../../../components/Slider';
import SelectDropDown from '../../../components/SelectDropDown';
import BackIconButton from '../../../components/actions/BackIconButton';
import NotFound from '../../../components/NotFound';
import Spinner from '../../../components/Spinner';
// API
import axios from 'axios';
import { fetchCategoryProducts, mongoDbConfig } from '../../../utils/api';
// Redux
import { useDispatch, useSelector, connect } from 'react-redux';
import { addToCart } from '../../../redux/reducer/CartReducer';

export default function CategoryScreen(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const categoryContent = categoryDictionary?.categories;
    const productContent = productDictionary?.products;
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

    React.useEffect(() => {
        // Update Screen's headerTitle
        props.navigation?.setOptions({
            headerTitle: categoryContent?.name[categoryName]?.toUpperCase(),
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });

        // Fetch this category's products
        axios(
            isAllProductsView
                ? mongoDbConfig('products')
                : fetchCategoryProducts(categoryId),
        )
            .then((response) => {
                const data = response.data?.documents;
                setTimeout(() => {
                    setCategoryProducts(data);
                }, 500);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [categoryId, categoryName]);

    return (
        <View style={styles.container}>
            {/* Categories slider - show on ALL Products view*/}
            {isAllProductsView ? (
                <Slider
                    title="Kategorier"
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
                label="Sortér efter"
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
            {categoryProducts?.length > 0 && (
                <FlatList
                    data={
                        (selectedSort?.value === 'A-AA' &&
                            categoryProducts?.sort((a, b) =>
                                a.productTitle
                                    .normalize()
                                    .localeCompare(b.productTitle.normalize()),
                            )) ||
                        (selectedSort?.value === 'AA-A' &&
                            categoryProducts?.reverse(
                                (a, b) =>
                                    a.productTitle.toLowerCase() <
                                        b.productTitle.toLowerCase() && -1,
                            )) ||
                        (selectedSort?.value === 'lowest' &&
                            categoryProducts?.sort(
                                (a, b) =>
                                    parseInt(a.bulkPrice) >
                                    parseInt(b.bulkPrice),
                            )) ||
                        (selectedSort?.value === 'highest' &&
                            categoryProducts?.sort(
                                (a, b) =>
                                    parseInt(a.bulkPrice) <
                                    parseInt(b.bulkPrice),
                            ))
                    }
                    keyExtractor={(item) => item?._id}
                    renderItem={({ item }) => (
                        <ProductCard
                            productTitle={
                                content.productTitle[item?.productTitle] ||
                                item?.productTitle
                            }
                            imageSrc={productImages[item?.imageSrc]}
                            producerTitle={item?.producerTitle}
                            productDesc={
                                content.productDesc[item?.productDesc] ||
                                item?.productDesc
                            }
                            productUnit={item?.productUnit}
                            bulkPrice={numberFormat(item?.bulkPrice)}
                            singlePrice={numberFormat(item?.singlePrice)}
                            isCold={item.tags?.find((tag) => tag == 'cold')}
                            isOrganic={item.tags?.find(
                                (tag) => tag == 'organic',
                            )}
                            isFrozen={item.tags?.find((tag) => tag == 'frozen')}
                            cardStyle={styles.cardStyle}
                            onPress={() =>
                                navigation.navigate('ProductScreen', {
                                    categoryProducts: categoryProducts,
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
                        categoryProducts?.length === 1 && styles.shortListStyle,
                    ]}
                ></FlatList>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,
        paddingBottom: 0,
        paddingHorizontal: 0,
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
        marginBottom: 10,
    },
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
