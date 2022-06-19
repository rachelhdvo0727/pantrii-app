import React from 'react';
import generalStyles from '../../../styles/General';
import { useNavigation } from '@react-navigation/native';
import dictionary from '../../../dictionary/products.json';
import { productImages } from '../../../dictionary/images';
import { numberFormat } from '../../../utils/functions';
// Component
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import HeroCard from '../../../components/buyers/HeroCard';
import SystemMessageBanner from '../../../components/SystemMessageBanner';
import CampaignCardSlider from '../../../components/buyers/CampaignCardSlider';
import Button from '../../../components/actions/Button';
import ViewButton from '../../../components/actions/ViewButton';
import ProductCard from '../../../components/suppliers/ProductCard';
import { Entypo } from '@expo/vector-icons';
import Spinner from '../../../components/Spinner';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getProductsForProducer } from '../../../redux/slice/producerProducts';

export default function HomeScreen(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state?.user);
    const { producerProducts } = useSelector(
        (state) => state?.producerProducts,
    );
    const listConfig = { producerId: user?._id, limit: 3 };
    const content = dictionary?.products;

    React.useEffect(() => {
        dispatch(getProductsForProducer(listConfig));
    }, []);

    const handleCreateProduct = () => {
        navigation.navigate('Opret');
    };

    return (
        <SafeAreaView style={styles.container}>
            {!producerProducts.length === 0 && <Spinner />}
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.section}>
                    <HeroCard
                        title={`Velkommen tilbage \n ${user?.firstName}`}
                        secondary
                        imageSrc={require('../../../assets/banners/producer-banner-home.png')}
                    />
                    <Button
                        primary
                        title="&emsp;Opret vare"
                        children={
                            <Entypo name="plus" size={17} color="#FFFFFF" />
                        }
                        onPress={handleCreateProduct}
                        buttonStyle={styles.buttonStyle}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={styles.headers}>opdateringer</Text>
                    <View style={styles.sectionContent}>
                        <SystemMessageBanner
                            text="Vi ændrer vores leveringsgebyr til 50,00 kr./ order"
                            isWarning
                        />
                        <SystemMessageBanner
                            text="Din vare nr. 123456 er godkendt og oprettet"
                            isConfirmation
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.headerWithButton}>
                        <Text style={styles.headers}>dine varer</Text>
                        <ViewButton
                            onPress={() => navigation.navigate('Produkter')}
                        />
                    </View>
                    <View style={styles.sectionContent}>
                        {producerProducts?.map((item) => (
                            <ProductCard
                                key={item?._id}
                                status={item?.status}
                                productTitle={
                                    content?.productTitle[item?.productTitle] ||
                                    item?.productTitle
                                }
                                productDesc={
                                    content?.productDesc[item?.productDesc] ||
                                    item?.productDesc
                                }
                                productUnit={item?.productUnit}
                                bulkPrice={numberFormat(item?.bulkPrice)}
                                singlePrice={numberFormat(item?.singlePrice)}
                                imageSrc={productImages[item?.imageSrc]}
                                amountInStock={item?.amountInStock}
                                isLowOnStock={
                                    item?.amountInStock < 10 ||
                                    item?.amountInStock === 10
                                }
                                isSoldOut={item?.amountInStock === 0}
                                onPress={() => {
                                    navigation.navigate('ProductInfoScreen', {
                                        productId: item?._id,
                                    });
                                }}
                            ></ProductCard>
                        ))}
                    </View>
                </View>
                <CampaignCardSlider />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { ...generalStyles.container },
    scrollViewContainer: {
        paddingVertical: 10,
    },
    section: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
    sectionContent: {
        justifyContent: 'space-evenly',
        marginVertical: 5,
    },
    buttonStyle: {
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
        justifyContent: 'center',

        marginTop: 25,
        width: '55%',
    },
    headers: {
        ...generalStyles.headerH2,
    },
    headerWithButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
