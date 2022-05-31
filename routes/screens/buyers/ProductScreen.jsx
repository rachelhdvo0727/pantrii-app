import React, { useState } from 'react';
import generalStyles from '../../../styles/General';
import { useNavigation } from '@react-navigation/native';
import { mongoDbConfig } from '../../../utils/api';
import { StyleSheet, View, FlatList, Text } from 'react-native';
// Dictionary
import dictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';
// Api
import axios from 'axios';
// Components
import BackIconButton from '../../../components/actions/BackIconButton';
import ProductInfoCard from '../../../components/buyers/ProductInfoCard';

export default function ProductScreen(props) {
    const navigation = useNavigation();
    const content = dictionary?.products;

    const product = props?.route?.params?.product;
    const [productInfo, setProductInfo] = React.useState([]);
    const test = props?.route?.params?.quantity;

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
    const [quantity, setQuantity] = useState(test);
    return (
        <ProductInfoCard
            imageSrc={productImages[product?.imageSrc]}
            productTitle={content?.productTitle[product?.productTitle]}
            producerTitle={product?.producerTitle}
            productDesc={content?.productDesc[product?.productDesc]}
            productUnit={product?.productUnit}
            bulkPrice={product?.bulkPrice + content.currency.DKK}
            singlePrice={product?.singlePrice + content.currency.DKK + '/enhed'}
            productStory={content?.productStory[product?.productStory]}
            productUnique={content?.productUnique[product?.productUnique]}
            isCold={product.tags?.find((tag) => tag == 'cold')}
            isOrganic={product.tags?.find((tag) => tag == 'organic')}
            isFrozen={product.tags?.find((tag) => tag == 'frozen')}
            expiryDuration={product?.expiryDuration}
            quantity={quantity}
            onPressAdd={() => {
                setQuantity(quantity + 1);
                console.log(quantity);
            }}
            onPressMinus={() => {
                setQuantity(quantity - 1);
                console.log(quantity);
            }}
        />
    );
}
