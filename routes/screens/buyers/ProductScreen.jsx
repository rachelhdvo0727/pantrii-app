import React from 'react';
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

export default function ProductScreen(props) {
    const navigation = useNavigation();
    const content = dictionary?.products;

    const products = props?.route?.params?.products;
    const productId = props?.route?.params?.product?._id;
    const productName = props?.route?.params?.product?.productTitle;
    const [productInfo, setProductInfo] = React.useState([]);

    React.useEffect(() => {
        // Update Screen's headerTitle
        props.navigation?.setOptions({
            headerTitle: content?.productTitle[productName]?.toUpperCase(),
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
        <View style={generalStyles.container}>
            <Text style={generalStyles.headerH}>
                {content?.productTitle[productName]?.toUpperCase()}
            </Text>
        </View>
    );
}
