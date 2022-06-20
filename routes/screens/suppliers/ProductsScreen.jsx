import React from 'react';
import generalStyles from '../../../styles/General';
import { sortOptions } from '../../../utils/variables';
import dictionary from '../../../dictionary/general.json';
import productDictionary from '../../../dictionary/products.json';
import { numberFormat } from '../../../utils/functions';
import { productImages } from '../../../dictionary/images';
import { useNavigation } from '@react-navigation/native';
// Components
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import SelectDropDown from '../../../components/SelectDropDown';
import IconButton from '../../../components/actions/IconButton';
import ProductCard from '../../../components/suppliers/ProductCard';
import Spinner from '../../../components/Spinner';
import NotFound from '../../../components/NotFound';
// Redux & API
import axios from 'axios';
import { findProducerProducts } from '../../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
// Translations
import { useTranslation } from 'react-i18next';

export default function ProductsScreen(props) {
    const navigation = useNavigation();
    const content = dictionary?.inventoryStatus;
    const productContent = productDictionary?.products;
    const { user } = useSelector((state) => state?.user);
    const userId = props?.route?.params?.loggedInUser?._id;
    const [products, setProducts] = React.useState(null);

    const [filterInStock, setFilterInStock] = React.useState(false);
    const [filterLowOnStock, setFilterLowOnStock] = React.useState(false);
    const [filterSoldOut, setFilterSoldOut] = React.useState(false);

    const [selectedSort, setSelectedSort] = React.useState(sortOptions[0]);
    const onSelectedSort = (item) => {
        setSelectedSort(item);
    };

    const producerId = userId || user?._id;
    const listConfig = { producerId: producerId, limit: 100 };

    const { t } = useTranslation();

    React.useEffect(() => {
        let isMounted = true; // mutable flag
        axios(findProducerProducts(listConfig))
            .then((response) => {
                const data = response?.data?.documents;
                isMounted && setProducts(data);
            })
            .catch((error) => console.error(error));
        // reset state with flag when component is unmount
        return () => {
            isMounted = false;
        };
    }, [products]);

    const filteredData = filterInStock
        ? products?.filter((item) => item?.amountInStock > 10)
        : filterLowOnStock
        ? products?.filter(
              (item) => item?.amountInStock < 10 && item?.amountInStock !== 0,
          )
        : filterSoldOut
        ? products?.filter((item) => item?.amountInStock === 0)
        : products;

    return (
        <View style={styles.container}>
            <SelectDropDown
                label={t('common:labels.sort')}
                data={sortOptions}
                onSelect={onSelectedSort}
                selectedItem={selectedSort}
            />
            <View style={styles.filtersContainer}>
                <IconButton
                    outlined
                    title={t('common:labels.inStock')}
                    onPress={() => setFilterInStock(!filterInStock)}
                    iconButtonStyle={{
                        borderColor: '#9DB76E',
                        backgroundColor: filterInStock ? '#9DB76E' : '#EFF2EE',
                    }}
                    titleStyle={{
                        color: filterInStock ? '#FFFFFF' : '#9DB76E',
                    }}
                    disabled={filterLowOnStock || filterSoldOut}
                />
                <IconButton
                    outlined
                    title={t('common:labels.lowInStock')}
                    onPress={() => setFilterLowOnStock(!filterLowOnStock)}
                    iconButtonStyle={{
                        borderColor: '#EA6F2D',
                        backgroundColor: filterLowOnStock
                            ? '#EA6F2D'
                            : '#EFF2EE',
                    }}
                    titleStyle={{
                        color: filterLowOnStock ? '#FFFFFF' : '#EA6F2D',
                    }}
                    disabled={filterInStock || filterSoldOut}
                />
                <IconButton
                    outlined
                    title={t('common:labels.soldOut')}
                    onPress={() => setFilterSoldOut(!filterSoldOut)}
                    iconButtonStyle={{
                        borderColor: '#FF0000',
                        backgroundColor: filterSoldOut ? '#FF0000' : '#EFF2EE',
                    }}
                    titleStyle={{
                        color: filterSoldOut ? '#FFFFFF' : '#FF0000',
                    }}
                    disabled={filterInStock || filterLowOnStock}
                />
            </View>
            {(products === null || !filteredData) && <Spinner />}
            {(filteredData || products)?.length === 0 && (
                <NotFound text={dictionary?.producer?.noProductsFound} />
            )}
            {products?.length > 0 && (
                <SafeAreaView>
                    <FlatList
                        data={
                            (selectedSort?.value === 'A-AA' &&
                                filteredData?.sort((a, b) =>
                                    a.productTitle
                                        .normalize()
                                        .localeCompare(
                                            b.productTitle.normalize(),
                                        ),
                                )) ||
                            (selectedSort?.value === 'AA-A' &&
                                filteredData?.reverse(
                                    (a, b) =>
                                        a.productTitle.toLowerCase() <
                                            b.productTitle.toLowerCase() && -1,
                                )) ||
                            (selectedSort?.value === 'lowest' &&
                                filteredData?.sort(
                                    (a, b) =>
                                        parseInt(a.bulkPrice) >
                                        parseInt(b.bulkPrice),
                                )) ||
                            (selectedSort?.value === 'highest' &&
                                filteredData?.sort(
                                    (a, b) =>
                                        parseInt(a.bulkPrice) <
                                        parseInt(b.bulkPrice),
                                ))
                        }
                        keyExtractor={(item) => item?._id}
                        renderItem={({ item }) => (
                            <ProductCard
                                status={item?.status}
                                productTitle={
                                    t(
                                        'products:products.productTitle.' +
                                            item?.productTitle,
                                    ) || item?.productTitle
                                }
                                imageSrc={productImages[item?.imageSrc]}
                                producerTitle={item?.producerTitle}
                                productDesc={
                                    t(
                                        'products:products.productDesc.' +
                                            item?.productDesc,
                                    ) || item?.productDesc
                                }
                                productUnit={item?.productUnit}
                                bulkPrice={numberFormat(item?.bulkPrice)}
                                singlePrice={numberFormat(item?.singlePrice)}
                                amountInStock={item?.amountInStock}
                                isLowOnStock={
                                    item?.amountInStock < 10 ||
                                    item?.amountInStock === 10
                                }
                                isSoldOut={item?.amountInStock === 0}
                                onPress={() => {
                                    navigation.navigate('ProductInfoScreen', {
                                        productId: item?._id,
                                    });
                                }}
                            />
                        )}
                        contentContainerStyle={styles.listContainer}
                    />
                </SafeAreaView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,
    },
    filtersContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        marginTop: 0,
    },
    listContainer: { marginVertical: 7 },
});
