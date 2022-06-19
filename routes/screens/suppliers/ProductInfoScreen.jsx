import React from 'react';
import generalStyles from '../../../styles/General';
import productDictionary from '../../../dictionary/products.json';
import categoryDictionary from '../../../dictionary/categories.json';
import { numberFormat, capitalize } from '../../../utils/functions';
import { productImages } from '../../../dictionary/images';
import { useNavigation } from '@react-navigation/native';
// Components
import { StyleSheet } from 'react-native';
import BackIconButton from '../../../components/actions/BackIconButton';
import ProductInfoCard from '../../../components/buyers/ProductInfoCard';
import Spinner from '../../../components/Spinner';
// API & Redux
import { useDispatch, useSelector } from 'react-redux';
import { findCategory } from '../../../redux/slice/categories';
import { findProduct } from '../../../redux/slice/product';

export default function ProductInfoScreen(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const productContent = productDictionary?.products;
    const categoryContent = categoryDictionary?.categories;
    const productId = props?.route?.params?.productId;
    const { product } = useSelector((state) => state?.product);
    const category = useSelector((state) => state.categories?.category);

    React.useEffect(() => {
        // Update Screen's headerTitle
        props.navigation?.setOptions({
            headerTitle:
                productContent?.productTitle[product?.productTitle] ||
                product?.productTitle,
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });

        // Find product's category
        dispatch(findCategory(product?.categoryId));
        // Fetch data of the current product
        dispatch(findProduct(productId));
    }, [product]);

    const onEditProduct = (information) => {
        navigation.navigate('ProductEditScreen', {
            productId: product?._id,
            informationSection: information,
        });
    };

    return (
        <ProductInfoCard
            isProducerView
            status={product?.status}
            onEditBottomSection={() => onEditProduct('bottom')}
            onEditTopSection={() => onEditProduct('top')}
            category={capitalize(categoryContent.name[category?.name])}
            amountInStock={product?.amountInStock}
            isSoldOut={product?.amountInStock === 0}
            isLowOnStock={
                product?.amountInStock < 10 || product?.amountInStock === 10
            }
            productID={product?._id}
            imageSrc={productImages[product?.imageSrc]}
            productTitle={
                productContent?.productTitle[product?.productTitle] ||
                product?.productTitle
            }
            producerTitle={product?.producerTitle}
            productDesc={
                productContent?.productDesc[product?.productDesc] ||
                product?.productDesc
            }
            productUnit={product?.productUnit}
            bulkPrice={numberFormat(product?.bulkPrice)}
            singlePrice={numberFormat(product?.singlePrice)}
            productStory={
                productContent.productStory[product?.productStory] ||
                product?.productStory
            }
            productUnique={
                productContent.productUnique[product?.productUnique] ||
                product?.productUnique
            }
            isCold={product?.tags?.find((tag) => tag == 'cold')}
            isOrganic={product?.tags?.find((tag) => tag == 'organic')}
            isFrozen={product?.tags?.find((tag) => tag == 'frozen')}
            expiryDuration={product?.expiryDuration}
        />
    );
}

const styles = StyleSheet.create({});
