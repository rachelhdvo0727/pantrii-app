import React from 'react';
import generalStyles from '../../styles/General';
import dictionary from '../../dictionary/general.json';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
// Components
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/actions/Button';
import HeroCard from '../../components/buyers/HeroCard';
import InformationCard from '../../components/InformationCard';
import SectionInInformationCard from '../../components/SectionInInformationCard';
// API
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/slice/user';

export default function ProfileScreen(props) {
    const content = dictionary?.customerTypes;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state?.user);
    const userRole = props?.route?.params?.currentRole;

    const onEdit = (information) => {
        navigation.navigate('ProfileEditScreen', {
            informationType: information,
            userRole: userRole,
        });
    };

    const handleLogOut = () => {
        SecureStore.setItemAsync('user', '');
        dispatch(logOut(undefined));
    };

    return (
        <View style={generalStyles.container}>
            <HeroCard
                title={content[userRole]}
                secondary
                imageSrc={require('../../assets/banners/profile-hero.png')}
            />
            <InformationCard style={styles.informationCard}>
                <SectionInInformationCard
                    isTopSection
                    sectionTitle="Profil information"
                    sectionContent={
                        <React.Fragment>
                            <Text style={styles.highlightText}>
                                {user?.firstName} {user?.lastName}
                            </Text>
                            {user?.email && (
                                <Text
                                    style={[
                                        styles.text,
                                        { textTransform: 'none' },
                                    ]}
                                >
                                    {user?.email}
                                </Text>
                            )}
                            {user?.phone && (
                                <Text style={styles.text}>{user?.phone}</Text>
                            )}
                        </React.Fragment>
                    }
                    isEditable
                    iconButtonStyle={styles.iconButton}
                    onEdit={() => onEdit('profile')}
                ></SectionInInformationCard>
                <SectionInInformationCard
                    sectionTitle="Adresse"
                    isLastSection
                    sectionContent={
                        <React.Fragment>
                            <Text
                                style={[
                                    styles.text,
                                    { textTransform: 'capitalize' },
                                ]}
                            >
                                {user?.address?.line1} {user?.address?.line2}
                            </Text>
                            <View style={styles.cityWrapper}>
                                <Text style={styles.text}>
                                    {user?.address?.zipCode}{' '}
                                </Text>
                                <Text style={styles.text}>
                                    {user?.address?.city}
                                </Text>
                            </View>
                            <Text style={styles.text}>
                                {user?.address?.country}
                            </Text>
                        </React.Fragment>
                    }
                    isEditable
                    iconButtonStyle={styles.iconButton}
                    onEdit={() => onEdit('address')}
                ></SectionInInformationCard>
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
        textTransform: 'capitalize',
    },
    text: { ...generalStyles.paragraphText, textTransform: 'capitalize' },
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
