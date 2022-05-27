import React from 'react';
import generalStyles from '../../../styles/General';
import categoryDictionary from '../../../dictionary/categories';
import productDictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';
import { categoryImages } from '../../../dictionary/images';
import { SLIDER_WIDTH, sortOptions } from '../../../utils/variables';
// Components
import { StyleSheet, View, FlatList } from 'react-native';
import CategoryCard from '../../../components/buyers/CategoryCard';
import ProductCard from '../../../components/buyers/ProductCard';
import Slider from '../../../components/Slider';
import SelectDropDown from '../../../components/SelectDropDown';
// API
import axios from 'axios';
import { fetchCategoryProducts, mongoDbConfig } from '../../../utils/api';

export default function AllProductsScreen(props) {
    const categoryContent = categoryDictionary?.categories;
    const productContent = productDictionary?.products;
    // Clean up
    const categories = props?.route?.params?.categories;
    const categoryId = props?.route?.params?.category?._id;
    const categoryName = props?.route?.params?.category?.name;
    const filteredCategories = categories?.filter(
        (t) => t?.name !== categoryName,
    );
    const isAllProductsView = filteredCategories[0].name !== 'allProducts';
    // Carousel
    const ITEM_WIDTH = SLIDER_WIDTH / 2.9;

    const [categoryProducts, setCategoryProducts] = React.useState([]);
    const [selectedSort, setSelectedSort] = React.useState(sortOptions[0]);
    const onSelectedSort = (item) => {
        setSelectedSort(item);
    };

    React.useEffect(() => {
        // Update Screen's headerTitle
        props.navigation?.setOptions({
            headerTitle: categoryContent?.name[categoryName]?.toUpperCase(),
        });

        // Fetch this category's products
        axios(
            isAllProductsView
                ? mongoDbConfig('products')
                : fetchCategoryProducts(`${categoryId}`),
        )
            .then(function (response) {
                const data = response.data?.documents;

                setCategoryProducts(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [categoryId, categoryName, categoryProducts]);

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
                    itemWidth={ITEM_WIDTH}
                    sliderWidth={SLIDER_WIDTH}
                    renderItem={({ item: { name, imageSrc }, index }) => (
                        <CategoryCard
                            secondary
                            key={index}
                            title={categoryContent?.name[name]}
                            imageSrc={categoryImages[imageSrc]}
                            cardStyle={
                                {
                                    // paddingHorizontal: 2.5,
                                }
                            }
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
                label="sortér"
                data={sortOptions}
                onSelect={onSelectedSort}
                selectedItem={selectedSort}
            />
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
                                    b.producerTitle.toLowerCase() && -1,
                        )) ||
                    (selectedSort?.value === 'lowest' &&
                        categoryProducts?.sort(
                            (a, b) =>
                                parseInt(a.bulkPrice) > parseInt(b.bulkPrice),
                        )) ||
                    (selectedSort?.value === 'highest' &&
                        categoryProducts?.sort(
                            (a, b) =>
                                parseInt(a.bulkPrice) < parseInt(b.bulkPrice),
                        ))
                }
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                    <ProductCard
                        productTitle={
                            productContent?.productTitle[item?.productTitle]
                        }
                        imageSrc={productImages[item?.imageSrc]}
                        producerTitle={item?.producerTitle}
                        productDesc={
                            productContent?.productDesc[item?.productDesc]
                        }
                        productUnit={item?.productUnit}
                        bulkPrice={
                            item?.bulkPrice +
                            productContent?.currency.DKK +
                            '/kolli'
                        }
                        singlePrice={
                            item?.singlePrice +
                            productContent?.currency.DKK +
                            '/enhed'
                        }
                        isCold={item.tags?.find((tag) => tag == 'cold')}
                        isOrganic={item.tags?.find((tag) => tag == 'organic')}
                        isFrozen={item.tags?.find((tag) => tag == 'frozen')}
                        cardStyle={styles.cardStyle}
                    />
                )}
                numColumns={2}
                // scrollEnabled={true}
                contentContainerStyle={styles.productListContainer}
            ></FlatList>
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
        marginTop: 10,
    },
    cardStyle: {
        margin: 5,
    },
});
