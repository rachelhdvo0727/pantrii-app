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
// API
import axios from 'axios';
import { fetchCategoryProducts } from '../../../utils/api';
// Redux
import { useDispatch, useSelector, connect } from 'react-redux';
import { addToCart } from '../../../redux/reducer/CartReducer';

const CategoryProductsListScreen = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const category = props?.route?.params?.category;
    const categoryContent = categoryDictionary?.categories;
    const productContent = productDictionary?.products;

    const [categoryProducts, setCategoryProducts] = React.useState(null);
    const [selectedSort, setSelectedSort] = React.useState(sortOptions[0]);
    const onSelectedSort = (item) => {
        setSelectedSort(item);
    };

    React.useEffect(() => {
        // Update Screen's headerTitle
        props?.navigation?.setOptions({
            headerTitle: categoryContent?.name[category?.name]?.toUpperCase(),
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
                }, 500);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const sortedList =
        (selectedSort?.value === 'A-AA' &&
            categoryProducts?.sort((a, b) =>
                a?.productTitle
                    .normalize()
                    .localeCompare(b?.productTitle.normalize()),
            )) ||
        (selectedSort?.value === 'AA-A' &&
            categoryProducts?.reverse(
                (a, b) =>
                    a?.productTitle.toLowerCase() <
                        b?.productTitle.toLowerCase() && -1,
            )) ||
        (selectedSort?.value === 'lowest' &&
            categoryProducts?.sort(
                (a, b) => parseInt(a?.bulkPrice) > parseInt(b?.bulkPrice),
            )) ||
        (selectedSort?.value === 'highest' &&
            categoryProducts?.sort(
                (a, b) => parseInt(a?.bulkPrice) < parseInt(b?.bulkPrice),
            ));

    return (
        <View style={styles.container}>
            <SelectDropDown
                label="Sortér efter"
                data={sortOptions}
                onSelect={onSelectedSort}
                selectedItem={selectedSort}
            />
            {categoryProducts === null && <Spinner />}
            {categoryProducts?.length === 0 ? (
                <NotFound
                    text={`Der findes ikke produkter i ${
                        categoryContent?.name[category?.name]
                    } kategorien`}
                />
            ) : (
                <FlatList
                    data={sortedList}
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
};

export default CategoryProductsListScreen;

const styles = StyleSheet.create({
    container: { ...generalStyles.container },
    productListContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
        marginHorizontal: 10,
    },
    cardStyle: {
        margin: 5,
    },
    shortListStyle: { alignItems: 'flex-start', marginHorizontal: 10 },
});
