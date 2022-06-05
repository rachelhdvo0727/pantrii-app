import React from 'react';
import generalStyles from '../../styles/General';
import dictionary from '../../dictionary/general.json';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, StackActions } from '@react-navigation/native';
// Components
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/actions/Button';
import HeroCard from '../../components/buyers/HeroCard';
import InformationCard from '../../components/InformationCard';
import SectionInInformationCard from '../../components/SectionInInformationCard';
// API
import { useSelector } from 'react-redux';

export default function ProfileScreen(props) {
    const content = dictionary?.customerTypes;
    const navigation = useNavigation();
    const { user } = useSelector((state) => state.user);
    const loggedInUser = props?.route?.params.loggedInUser;
    const userRole = props?.route?.params?.currentRole;

    const onEdit = (information) => {
        navigation.navigate('ProfileEditScreen', {
            user: user || loggedInUser,
            informationType: information,
        });
    };

    const handleLogOut = () => {
        SecureStore.setItemAsync('user', '');
    };

    // const handleLogOut = async function () {
    //     return await SecureStore.setItemAsync('user', '')
    //         .then(async () => {
    //             // To verify that current user is now empty, currentAsync can be used
    //             const currentUser = await SecureStore.getItemAsync('user');
    //             if (currentUser === null) {
    //                 console.log('Success!', 'No user is logged in anymore!');
    //             }
    //             // Navigation dispatch calls a navigation action, and popToTop will take
    //             // the user back to the very first screen of the stack
    //             // navigation.dispatch(StackActions.popToTop());
    //             return true;
    //         })
    //         .catch((error) => {
    //             console.log('Error!', error.message);
    //             return false;
    //         });
    // };

    const ProfileInformation = () => (
        <SectionInInformationCard
            isTopSection
            sectionTitle="Profil information"
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
                        <Text style={styles.text}>
                            {(user || loggedInUser)?.phone}
                        </Text>
                    )}
                </React.Fragment>
            }
            isEditable
            iconButtonStyle={styles.iconButton}
            onEdit={() => onEdit('profile')}
        ></SectionInInformationCard>
    );

    const Address = () => (
        <SectionInInformationCard
            sectionTitle="Adresse"
            isLastSection
            sectionContent={
                <React.Fragment>
                    <Text style={styles.text}>
                        {(user || loggedInUser)?.address?.line1}
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
            isEditable
            iconButtonStyle={styles.iconButton}
            onEdit={() => onEdit('address')}
        ></SectionInInformationCard>
    );

    return (
        <View style={generalStyles.container}>
            <HeroCard
                title={content[userRole]}
                secondary
                imageSrc={require('../../assets/banners/profile-hero.png')}
            />
            <InformationCard style={styles.informationCard}>
                <ProfileInformation />
                <Address />
            </InformationCard>
            <Button
                outlined
                title="log mig ud"
                buttonStyle={styles.buttonStyle}
                onPress={handleLogOut}
            ></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    informationCard: {
        marginVertical: 20,
    },
    highlightText: {
        ...generalStyles.mediumText,
    },
    text: { ...generalStyles.paragraphText },
    cityWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 110, // adjust space-between in flex
    },
    iconButton: {
        alignSelf: 'center',
    },
    buttonStyle: {
        alignSelf: 'center',
        marginVertical: 40,
    },
});
