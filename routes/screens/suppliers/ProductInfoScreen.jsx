import React from 'react';
import dictionary from '../../../dictionary/products.json';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import BackIconButton from '../../../components/actions/BackIconButton';

export default function ProductInfoScreen(props) {
    const navigation = useNavigation();
    const productId = props?.route?.params?.productId;
    const productTitle = props?.route?.params?.productTitle;

    React.useEffect(() => {
        // Update Screen's headerTitle
        props.navigation?.setOptions({
            headerTitle: productTitle,
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });
        console.log(productId, productTitle);
    }, []);

    return (
        <View>
            <Text>ProductInfoScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
