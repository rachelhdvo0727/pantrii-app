import React from 'react';
import generalStyles from '../../../styles/General';
import categoryDictionary from '../../../dictionary/categories';
import productDictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';
import { categoryImages } from '../../../dictionary/images';
import { SLIDER_WIDTH } from '../../../utils/variables';
// Components
import { StyleSheet, View, FlatList } from 'react-native';
import CategoryCard from '../../../components/buyers/CategoryCard';
import ProductCard from '../../../components/buyers/ProductCard';
import Slider from '../../../components/Slider';
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
    const ITEM_WIDTH = SLIDER_WIDTH / 3;

    const [categoryProducts, setCategoryProducts] = React.useState([]);
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
                // console.log(response.data?.documents);
                setCategoryProducts(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [categoryId, categoryName]);

    return (
        <View style={styles.container}>
            {/* Categories slider - show on ALL Products view*/}
            {isAllProductsView ? (
                <Slider
                    layout="default"
                    hasPagination
                    data={filteredCategories}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    activeSlideAlignment="start"
                    snapToInterval={3}
                    itemWidth={ITEM_WIDTH}
                    sliderWidth={SLIDER_WIDTH - 500}
                    renderItem={({ item: { name, imageSrc }, index }) => (
                        <CategoryCard
                            secondary
                            key={index}
                            title={categoryContent?.name[name]}
                            imageSrc={categoryImages[imageSrc]}
                            cardStyle={{
                                paddingHorizontal: 2.5,
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

            <FlatList
                data={categoryProducts}
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
                    />
                )}
                numColumns={2}
                scrollEnabled={true}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,
    },
    sliderContainer: {
        paddingVertical: 2,
        paddingHorizontal: 2,
        alignSelf: 'flex-end',
    },
});
