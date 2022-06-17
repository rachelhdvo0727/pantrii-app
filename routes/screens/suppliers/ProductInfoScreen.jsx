import React from 'react';
import dictionary from '../../../dictionary/products.json';
import { numberFormat } from '../../../utils/functions';
import { productImages } from '../../../dictionary/images';
import { useNavigation } from '@react-navigation/native';
// Components
import { StyleSheet, Text, View } from 'react-native';
import BackIconButton from '../../../components/actions/BackIconButton';
import ProductInfoCard from '../../../components/buyers/ProductInfoCard';
// API & Redux
import { useDispatch, useSelector } from 'react-redux';
import { findProduct } from '../../../redux/slice/product';

export default function ProductInfoScreen(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const content = dictionary?.products;
    const productId = props?.route?.params?.productId;
    const productTitle = props?.route?.params?.productTitle;

    const { product } = useSelector((state) => state.product);

    React.useEffect(() => {
        // Update Screen's headerTitle
        props.navigation?.setOptions({
            headerTitle: productTitle,
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });
        //   console.log(productId, product);

        // Fetch data of the current product
        dispatch(findProduct(productId));
    }, []);

    return (
        <View>
            <ProductInfoCard
                productID={product?._id}
                imageSrc={productImages[product?.imageSrc]}
                productTitle={
                    content.productTitle[product?.productTitle] ||
                    product?.productTitle
                }
                producerTitle={product?.producerTitle}
                productDesc={
                    content.productTitle[product?.productDesc] ||
                    product?.productDesc
                }
                productUnit={product?.productUnit}
                bulkPrice={numberFormat(product?.bulkPrice)}
                singlePrice={numberFormat(product?.singlePrice)}
                productStory={
                    content.productTitle[product?.productStory] ||
                    product?.productStory
                }
                productUnique={
                    content.productTitle[product?.productUnique] ||
                    product?.productUnique
                }
                isCold={product.tags?.find((tag) => tag == 'cold')}
                isOrganic={product.tags?.find((tag) => tag == 'organic')}
                isFrozen={product.tags?.find((tag) => tag == 'frozen')}
                expiryDuration={product?.expiryDuration}
                isProducerView
            />
        </View>
    );
}

const styles = StyleSheet.create({});
