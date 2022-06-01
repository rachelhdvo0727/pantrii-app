import React from 'react';
import generalStyles from '../../../styles/General';
import { useNavigation } from '@react-navigation/native';
// Component
import { StyleSheet, Text, View } from 'react-native';
import HeroCard from '../../../components/buyers/HeroCard';
import CampaignCardSlider from '../../../components/buyers/CampaignCardSlider';
import Button from '../../../components/actions/Button';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeSuppliersScreen(props) {
    const navigation = useNavigation();
    React.useEffect(() => {
        console.log(props);
    }, []);

    const handleCreateProduct = () => {
        navigation.navigate('Opret');
    };
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <HeroCard
                    title={`Velkommen tilbage`}
                    secondary
                    imageSrc={require('../../../assets/banners/producer-banner-home.png')}
                />
                <Button
                    primary
                    title="&emsp;Opret vare"
                    children={
                        <FontAwesome name="plus" size={15} color="#FFFFFF" />
                    }
                    onPress={handleCreateProduct}
                    buttonStyle={styles.buttonStyle}
                />
            </View>
            <View style={styles.section}>
                <Text style={styles.headers}>opdateringer</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.headers}>dine varer</Text>
            </View>
            <CampaignCardSlider />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { ...generalStyles.homeContainer },
    section: {
        marginHorizontal: 15,
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
});
