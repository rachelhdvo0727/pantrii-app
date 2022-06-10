import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { mongoDbConfig } from '../../../utils/api';
import { numberFormat } from '../../../utils/functions';
// Dictionary
import dictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';
// Api
import axios from 'axios';
// Components
import BackIconButton from '../../../components/actions/BackIconButton';
import ProductInfoCard from '../../../components/buyers/ProductInfoCard';
// Redux
import { useDispatch, useSelector, connect } from 'react-redux';
import { addToCart } from '../../../redux/reducer/CartReducer';

export default function ProductScreen(props) {
    const navigation = useNavigation();
    const content = dictionary?.products;

    const product = props?.route?.params?.product;
    const [productInfo, setProductInfo] = React.useState([]);

    const dispatch = useDispatch();

    React.useEffect(() => {
        // Update Screen's headerTitle
        props.navigation?.setOptions({
            headerTitle:
                content?.productTitle[product?.productTitle]?.toUpperCase(),
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });

        // Fetch this category's products
        axios(mongoDbConfig('products'))
            .then(function (response) {
                setProductInfo(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <ProductInfoCard
            imageSrc={productImages[product?.imageSrc]}
            productTitle={
                content.productTitle[item?.productTitle] || item?.productTitle
            }
            producerTitle={product?.producerTitle}
            productDesc={
                content.productTitle[item?.productDesc] || item?.productDesc
            }
            productUnit={product?.productUnit}
            bulkPrice={numberFormat(product?.bulkPrice)}
            singlePrice={numberFormat(product?.singlePrice)}
            productStory={
                content.productTitle[item?.productStory] || item?.productStory
            }
            productUnique={
                content.productTitle[item?.productUnique] || item?.productUnique
            }
            isCold={product.tags?.find((tag) => tag == 'cold')}
            isOrganic={product.tags?.find((tag) => tag == 'organic')}
            isFrozen={product.tags?.find((tag) => tag == 'frozen')}
            expiryDuration={product?.expiryDuration}
            onPressAdd={() => {
                dispatch(addToCart(product));
            }}
        />
    );
}
