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
import axios from 'axios';
import { findUser } from '../../utils/api';

export default function ProfileScreen(props) {
    const content = dictionary?.customerTypes;
    const navigation = useNavigation();
    const [user, setUser] = React.useState({});
    const userRole = props?.route?.params?.user?.roleTitle;
    const userId = props?.route?.params?.user?._id;

    const isMounted = React.useRef(null);
    const fetchCurrentUser = React.useCallback(() => {
        axios(findUser(userId, true))
            .then((response) => setUser(response?.data?.document))
            .catch((error) => console.error(error));
    }, []);

    React.useEffect(() => {
        isMounted.current = true;
        const timer = setTimeout(() => {
            fetchCurrentUser();
        }, 800);

        const willFocusSubscription = props.navigation.addListener(
            'focus',
            () => {
                fetchCurrentUser();
            },
        );
        // console.log('fetched api, user', user);

        return () =>
            (isMounted.current = false) &&
            willFocusSubscription &&
            clearTimeout(timer) &&
            setUser({ ...user });
    }, []);

    const onEdit = (information) => {
        navigation.navigate('ProfileEditScreen', {
            user: user,
            informationType: information,
        });
    };

    const handleLogOut = () => {
        SecureStore.setItemAsync('user', '');
        navigation.navigate('LogInScreen');
    };

    const ProfileInformation = () => (
        <SectionInInformationCard
            isTopSection
            sectionTitle="Profil information"
            sectionContent={
                <React.Fragment>
                    <Text style={styles.highlightText}>
                        {user?.firstName} {user?.lastName}
                    </Text>
                    {user?.email && (
                        <Text style={styles.text}>{user?.email}</Text>
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
    );

    const Address = () => (
        <SectionInInformationCard
            sectionTitle="Adresse"
            isLastSection
            sectionContent={
                <React.Fragment>
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
