import React from 'react';
import generalStyles from '../../styles/General';
import User from '../../models/User';
import dictionary from '../../dictionary/general.json';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
// Components
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/actions/Button';
import HeroCard from '../../components/buyers/HeroCard';
import InformationCard from '../../components/InformationCard';
import SectionInInformationCard from '../../components/SectionInInformationCard';

export default function ProfileScreen(props) {
    const content = dictionary?.customerTypes;
    const navigation = useNavigation();
    const [user, setUser] = React.useState({});
    const [edit, setEdit] = React.useState(false);

    React.useEffect(() => {
        async function fetchUser() {
            try {
                setUser(JSON.parse(await SecureStore.getItemAsync('user')));
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, []);

    const onEdit = (information) => {
        setEdit(true);

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
                    <Text style={styles.text}>{user?.address?.zipCode}</Text>
                    <Text style={styles.text}>{user?.address?.city}</Text>
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
                title={content[user?.roleTitle]}
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
    iconButton: {
        alignSelf: 'center',
    },
    buttonStyle: {
        alignSelf: 'center',
        marginVertical: 40,
    },
});
