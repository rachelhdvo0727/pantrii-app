import React from 'react';
import generalStyles from '../../../styles/General';
import { numberFormat } from '../../../utils/functions';
import { useNavigation } from '@react-navigation/native';
// Component
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import InformationCard from '../../../components/InformationCard';
import SectionInInformationCard from '../../../components/SectionInInformationCard';
import Button from '../../../components/actions/Button';
import BackIconButton from '../../../components/actions/BackIconButton';
import ProductCardList from '../../../components/buyers/ProductCardList';
// Redux
import { cartTotalPriceSelector } from '../../../redux/reducer/selector';
import { useSelector } from 'react-redux';
// Dictionary
import dictionary from '../../../dictionary/products';
import { productImages } from '../../../dictionary/images';

export default function CheckOutScreen(props) {
    const navigation = useNavigation();
    const loggedInUser = props?.route?.params?.loggedInUser;
    const { user } = useSelector((state) => state.user);
    const content = dictionary?.products;

    const cart = useSelector((state) => state.cart);

    React.useEffect(() => {
        // Update Screen's headerTitle
        props?.navigation?.setOptions({
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });
    });

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
                    <Text style={styles.highlightText}>
                        {(user || loggedInUser)?.firstName}{' '}
                        {(user || loggedInUser)?.lastName}
                    </Text>
                    {(user || loggedInUser)?.email && (
                        <Text style={styles.text}>
                            {(user || loggedInUser)?.email}
                        </Text>
                    )}
                    {(user || loggedInUser)?.phone && (
                        <Text style={[styles.text, styles.endSection]}>
                            {(user || loggedInUser)?.phone}
                        </Text>
                    )}
                    <Text style={styles.text}>
                        {(user || loggedInUser)?.address?.line1}{' '}
                        {(user || loggedInUser)?.address?.line2}
                    </Text>
                    <View style={styles.cityWrapper}>
                        <Text style={styles.text}>
                            {(user || loggedInUser)?.address?.zipCode}
                        </Text>
                        <Text style={styles.text}>
                            {(user || loggedInUser)?.address?.city}
                        </Text>
                    </View>

                    <Text style={styles.text}>
                        {(user || loggedInUser)?.address?.country}
                    </Text>
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
                    <View style={styles.contentContainerStyle}>
                        {cart.map((item) => {
                            return (
                                <ProductCardList
                                    key={item._id}
                                    secondary
                                    productTitle={
                                        content.productTitle[item?.productTitle]
                                    }
                                    imageSrc={productImages[item?.imageSrc]}
                                    producerTitle={item?.producerTitle}
                                    productUnit={item?.productUnit}
                                    bulkPrice={numberFormat(
                                        item?.bulkPrice * item.quantity,
                                    )}
                                    isCold={item.tags?.find(
                                        (tag) => tag == 'cold',
                                    )}
                                    isOrganic={item.tags?.find(
                                        (tag) => tag == 'organic',
                                    )}
                                    isFrozen={item.tags?.find(
                                        (tag) => tag == 'frozen',
                                    )}
                                    quantity={item.quantity}
                                    onPressMinus={() => {
                                        if (item.quantity === 1) {
                                            dispatch(removeItem(item._id));

                                            console.log('removed');
                                            return;
                                        } else {
                                            dispatch(decrement(item._id));
                                        }
                                    }}
                                    onPressAdd={() => {
                                        dispatch(increment(item._id));
                                    }}
                                    onPressDelete={() => {
                                        dispatch(removeItem(item._id));
                                    }}
                                />
                            );
                        })}
                    </View>
                    <View style={styles.flex}>
                        <Text style={styles.H1}>Subtotal:</Text>
                        <Text style={[styles.H1, styles.flexEnd]}>
                            {numberFormat(totalPrice)}
                        </Text>
                    </View>
                    <View style={styles.flex}>
                        <Text style={styles.H1}>Levering:</Text>
                        <Text style={styles.H1}>
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
            <ScrollView style={styles.container}>
                <InformationCard>
                    <Address />
                    <Delivery />
                    <PaymentMethod />
                    <Overview />
                </InformationCard>
            </ScrollView>
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
        ...generalStyles.mediumText,
    },
    H1: {
        ...generalStyles.boldText,
        fontSize: 16,
        paddingVertical: 2,
    },
    text: { ...generalStyles.paragraphText },
    cityWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 110, // adjust space-between in flex
    },
    endSection: {
        marginBottom: 5,
    },
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
        alignContent: 'center',
        alignItems: 'center',
    },
    contentContainerStyle: {
        paddingVertical: 10,
    },
});
