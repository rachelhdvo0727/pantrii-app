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
import {
    addToFavourite,
    removeFavourite,
} from '../../../redux/reducer/FavouriteReducer';
// Translations
import { useTranslation } from 'react-i18next';

export default function ProductScreen(props) {
    const navigation = useNavigation();
    const content = dictionary?.products;
    const { t } = useTranslation();

    const product = props?.route?.params?.product;
    const [productInfo, setProductInfo] = React.useState([]);

    const dispatch = useDispatch();
    const favourite = useSelector((state) => state.favourite);
    const favouriteId = favourite.map((i) => i?._id);

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
            productID={favouriteId?.filter((i) => i == product?._id)}
            imageSrc={productImages[product?.imageSrc]}
            productTitle={
                t('products:products.productTitle.' + product?.productTitle) ||
                product?.productTitle
            }
            producerTitle={product?.producerTitle}
            productDesc={
                t('products:products.productDesc.' + product?.productDesc) ||
                product?.productDesc
            }
            productUnit={product?.productUnit}
            bulkPrice={numberFormat(product?.bulkPrice)}
            singlePrice={numberFormat(product?.singlePrice)}
            productStory={
                t('products:products.productStory.' + product?.productStory) ||
                product?.productStory
            }
            productUnique={
                t(
                    'products:products.productUnique.' + product?.productUnique,
                ) || product?.productUnique
            }
            isCold={product.tags?.find((tag) => tag == 'cold')}
            isOrganic={product.tags?.find((tag) => tag == 'organic')}
            isFrozen={product.tags?.find((tag) => tag == 'frozen')}
            expiryDuration={
                product?.expiryDuration + t('products:products.expiration.days')
            }
            onPressAdd={() => {
                dispatch(addToCart(product));
            }}
            onPressFavourite={() => {
                dispatch(addToFavourite(product));
            }}
            onPressUnFavourite={() => {
                dispatch(removeFavourite(product._id));
            }}
        />
    );
}
