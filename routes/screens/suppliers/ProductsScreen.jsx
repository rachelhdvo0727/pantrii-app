import React from 'react';
import generalStyles from '../../../styles/General';
import { sortOptions } from '../../../utils/variables';
import dictionary from '../../../dictionary/general.json';
import productDictionary from '../../../dictionary/products.json';
import { numberFormat } from '../../../utils/functions';
import { productImages } from '../../../dictionary/images';
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

export default function ProductsSuppliersScreen(props) {
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
    React.useEffect(() => {
        axios(findProducerProducts(listConfig))
            .then((response) => {
                const data = response?.data?.documents;
                setTimeout(() => setProducts(data), 500);
            })
            .catch((error) => console.error(error));
    }, []);

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
                label="Sort??r efter"
                data={sortOptions}
                onSelect={onSelectedSort}
                selectedItem={selectedSort}
            />
            <View style={styles.filtersContainer}>
                <IconButton
                    outlined
                    title={content?.inStock}
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
                    title={content?.lowOnStock}
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
                    title={content?.soldOut}
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
                                amountInStock={item?.amountInStock}
                                isLowOnStock={
                                    item?.amountInStock < 10 ||
                                    item?.amountInStock === 10
                                }
                                isSoldOut={item?.amountInStock === 0}
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
