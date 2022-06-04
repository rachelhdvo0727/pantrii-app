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

export default function CheckOutScreen(props) {
    const navigation = useNavigation();
    const user = props?.route?.params?.user;
    const content = dictionary?.products;

    React.useEffect(() => {
        // Update Screen's headerTitle
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

    const totalPrice = useSelector(cartTotalPriceSelector);
    // Delivery cost
    const standardDelivery = 150;
    const delivery = numberFormat(standardDelivery);
    const freeDelivery = 2000;

    // Delivery date
    let today = new Date();
    today.setDate(today.getDate() + 7);
    let deliveryDate = new Date(today).toLocaleDateString('dk');

    const Address = () => (
        <SectionInInformationCard
            sectionTitle="Adresse"
            isTopSection
            sectionContent={
                <React.Fragment>
                    <Text style={styles.text}>
                        {user?.firstName} {user?.lastName}
                    </Text>
                    {user?.email && (
                        <Text style={styles.text}>{user?.email}</Text>
                    )}
                    {user?.phone && (
                        <Text style={styles.text}>{user?.phone}</Text>
                    )}
                    <Text style={styles.text}>
                        {user?.address?.line1} {user?.address?.line2}
                    </Text>
                    <View style={styles.cityWrapper}>
                        <Text style={styles.text}>
                            {user?.address?.zipCode}
                        </Text>
                        <Text style={styles.text}>{user?.address?.city}</Text>
                    </View>

                    <Text style={styles.text}>{user?.address?.country}</Text>
                </React.Fragment>
            }
        ></SectionInInformationCard>
    );

    const Delivery = () => (
        <SectionInInformationCard
            sectionTitle="Levering"
            isTopSection
            sectionContent={
                <React.Fragment>
                    <Text style={styles.flexText}>
                        <Feather
                            name="box"
                            size={14}
                            color="black"
                            iconStyle={{ marginRight: 10 }}
                        />
                        {content.delivery.standardShipping}&nbsp;
                        {totalPrice > freeDelivery ? 'Gratis' : delivery}
                    </Text>
                    <Text style={styles.flexText}>
                        <MaterialCommunityIcons
                            name="truck-outline"
                            size={14}
                            color="black"
                        />
                        {content.delivery.deliveryDate} &nbsp;
                        {deliveryDate}
                    </Text>
                </React.Fragment>
            }
        ></SectionInInformationCard>
    );

    const PaymentMethod = () => (
        <SectionInInformationCard
            sectionTitle="Betalingsmetode"
            isTopSection
            sectionContent={
                <React.Fragment>
                    <Text style={styles.text}>Kredit/ Debit kort</Text>
                </React.Fragment>
            }
        ></SectionInInformationCard>
    );

    const Overview = () => (
        <SectionInInformationCard
            sectionTitle="Oversigt"
            isLastSection
            sectionContent={
                <React.Fragment>
                    <View style={styles.flex}>
                        <Text style={styles.text}>Subtotal:</Text>
                        <Text style={[styles.highlightText, styles.flexEnd]}>
                            {numberFormat(totalPrice)}
                        </Text>
                    </View>
                    <View style={styles.flex}>
                        <Text style={styles.text}>Levering:</Text>
                        <Text style={styles.highlightText}>
                            {totalPrice > freeDelivery ? 'Gratis' : delivery}
                        </Text>
                    </View>
                    {totalPrice < freeDelivery ? (
                        <Text
                            style={
                                (styles.text, { paddingTop: 10, fontSize: 12 })
                            }
                        >
                            Køb for {numberFormat(freeDelivery - totalPrice)}{' '}
                            mere og få gratis fragt
                        </Text>
                    ) : null}
                </React.Fragment>
            }
        ></SectionInInformationCard>
    );

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <InformationCard>
                    <Address />
                    <Delivery />
                    <PaymentMethod />
                    <Overview />
                </InformationCard>
            </View>
            <View style={styles.bottomWrapper}>
                <Text style={generalStyles.headerH2}>
                    I ALT:{' '}
                    {totalPrice > freeDelivery
                        ? numberFormat(totalPrice)
                        : numberFormat(totalPrice + standardDelivery)}
                </Text>
                <Button
                    title="Gå til betaling"
                    primary
                    onPress={() => navigation.navigate('PaymentScreen')}
                />
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
