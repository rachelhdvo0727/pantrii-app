import React from 'react';
import generalStyles from '../../../styles/General';
import { useNavigation } from '@react-navigation/native';
// Component
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import HeroCard from '../../../components/buyers/HeroCard';
import SystemMessageBanner from '../../../components/SystemMessageBanner';
import CampaignCardSlider from '../../../components/buyers/CampaignCardSlider';
import Button from '../../../components/actions/Button';
import ViewButton from '../../../components/actions/ViewButton';
import ProducerProductList from '../../../components/suppliers/ProducerProductList';
import { Entypo } from '@expo/vector-icons';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getProductsForProducer } from '../../../redux/slice/producerProducts';

export default function HomeSuppliersScreen(props) {
    const navigation = useNavigation();
    const loggedInUser = props.route?.params?.loggedInUser;
    const { user } = useSelector((state) => state?.user);

    React.useEffect(() => {
        console.log('home-supplier');
    }, []);

    const handleCreateProduct = () => {
        navigation.navigate('Opret');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
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
                        <ProducerProductList
                            producerId={loggedInUser?._id}
                            limit={2}
                        />
                    </View>
                </View>
                <CampaignCardSlider />
            </ScrollView>
        </SafeAreaView>
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
