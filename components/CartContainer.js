import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React from 'react';

//import CartItems
import ProductCardList from './buyers/ProductCardList';
import { mongoDbConfig } from '../utils/api';
import axios from 'axios';

const CartContainer = () => {
    const amount = 0;
    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        // Fetch all categories from MongoDB api
        axios(mongoDbConfig('products'))
            .then(function (response) {
                setProducts(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // if (amount < 1) {
    //     return (
    //         <View
    //             style={{
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 height: '80%',
    //             }}
    //         >
    //             <Text style={styles.emptyCart}>Your cart is empty</Text>
    //         </View>
    //     );
    // }

    return (
        <ScrollView style={styles.cartContainer}>
            <View>
                <Text style={styles.cartTitle}>Your Cart</Text>
            </View>
            <View style={styles.cartItems}>
                {products.map((item) => (
                    <ProductCardList key={item.id} item={item} {...item} />
                ))}
            </View>
            <View style={styles.cartTotal}>
                <Text style={styles.cartTotalTitle}>Total</Text>
            </View>
        </ScrollView>
    );
};

export default CartContainer;

const styles = StyleSheet.create({
    cartContainer: {
        backgroundColor: '#fff',
    },
    cartItems: {},
    cartTotal: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20,
        borderTopColor: '#eee',
        borderTopWidth: 1,
    },
    clearCart: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'coral',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    cartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
    },
});
