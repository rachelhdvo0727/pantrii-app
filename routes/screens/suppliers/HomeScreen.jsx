import React from 'react';
import generalStyles from '../../../styles/General';
import { useNavigation } from '@react-navigation/native';
// Component
import { StyleSheet, Text, View } from 'react-native';
import HeroCard from '../../../components/buyers/HeroCard';
import ProductCard from '../../../components/suppliers/ProductCard';
import SystemMessageBanner from '../../../components/SystemMessageBanner';
import CampaignCardSlider from '../../../components/buyers/CampaignCardSlider';
import Button from '../../../components/actions/Button';
import ViewButton from '../../../components/actions/ViewButton';
import { Entypo } from '@expo/vector-icons';
// Redux
import { useSelector } from 'react-redux';

export default function HomeSuppliersScreen(props) {
    const navigation = useNavigation();
    const loggedInUser = props.route?.params?.loggedInUser;
    const { user } = useSelector((state) => state?.user);
    React.useEffect(() => {
        // console.log('home-supplier', props);
    }, []);

    const handleCreateProduct = () => {
        navigation.navigate('Opret');
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <HeroCard
                    title={`Velkommen tilbage \n ${
                        (user || loggedInUser)?.firstName
                    }`}
                    secondary
                    imageSrc={require('../../../assets/banners/producer-banner-home.png')}
                />
                <Button
                    primary
                    title="&emsp;Opret vare"
                    children={<Entypo name="plus" size={17} color="#FFFFFF" />}
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
                    <ProductCard
                        productTitle="HI"
                        imageSrc={require('../../../assets/products/627fc6217a0fa962a5cb745c.png')}
                        amount="3"
                        productDesc="lorem ipsum hfeihuhfru hfeiueiurhfu fhweiuhfeiwuhf"
                        productUnit="3 x 100g"
                        bulkPrice="10000"
                        singlePrice="20000"
                        isLowOnStock
                    />
                </View>
            </View>
            <CampaignCardSlider />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { ...generalStyles.homeContainer },
    section: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
    sectionContent: {
        justifyContent: 'space-evenly',
        marginVertical: 10,
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
