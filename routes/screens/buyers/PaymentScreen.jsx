import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import generalStyles from '../../../styles/General';
import { findUser } from '../../../utils/api';
import axios from 'axios';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// Component
import InformationCard from '../../../components/InformationCard';
import SectionInInformationCard from '../../../components/SectionInInformationCard';
import Button from '../../../components/actions/Button';
import dictionary from '../../../dictionary/products.json';
import BackIconButton from '../../../components/actions/BackIconButton';
// Redux
import { cartTotalPriceSelector } from '../../../redux/reducer/selector';
import { useSelector } from 'react-redux';

export default function PaymentScreen(props) {
    const navigation = useNavigation();
    const user = props?.route?.params?.user;

    React.useEffect(() => {
        props?.navigation?.setOptions({
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });
    });

    const numberFormat = (total) =>
        new Intl.NumberFormat('en-DK', {
            style: 'currency',
            currency: 'DKK',
        }).format(total);

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Text>Payment Screen</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#EFF2EE',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 10,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 75,
    },
    informationCard: {
        marginVertical: 20,
    },
    highlightText: {
        ...generalStyles.boldText,
    },
    text: { ...generalStyles.paragraphText },
    bottomWrapper: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.5)',
        alignItems: 'center',
    },
    flexText: {
        flexDirection: 'row',
        paddingVertical: 3,
        fontSize: 14,
        color: 'black',
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    flex: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        fontSize: 14,
        color: 'black',
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.5,
        paddingVertical: 3,
    },
});
