import React from 'react';
import generalStyles from '../../styles/General';
import User from '../../models/User';
import { useNavigation } from '@react-navigation/native';
// Components
import { StyleSheet, Text, View } from 'react-native';
import HeroCard from '../../components/buyers/HeroCard';
import InformationCard from '../../components/InformationCard';
import SectionInInformationCard from '../../components/SectionInInformationCard';

export default function ProfileScreen(props) {
    const user = props?.user;
    const navigation = useNavigation();
    const [edit, setEdit] = React.useState({
        mode: false,
        informationType: '',
    });

    const onEdit = (information) => {
        setEdit({ mode: true, informationType: information });
        console.log('to edit screen', information);

        navigation.navigate('ProfileEditScreen', {
            user: user,
            informationType: information,
        });
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
                    {user?.email ? (
                        <Text style={styles.text}>{user?.email}</Text>
                    ) : null}
                    {user?.phone ? (
                        <Text style={styles.text}>{user?.phone}</Text>
                    ) : null}
                </React.Fragment>
            }
            isEditable
            onEdit={() => onEdit('profile')}
        ></SectionInInformationCard>
    );

    const Address = (address) => (
        <SectionInInformationCard
            sectionTitle="Adresse"
            isLastSection
            sectionContent={
                <React.Fragment>
                    {user?.address ? (
                        <React.Fragment>
                            <Text style={styles.text}>
                                {user?.address?.line1} {user?.address?.line2}
                            </Text>
                            <Text style={styles.text}></Text>
                            <Text style={styles.text}>
                                {user?.address?.zipCode}
                            </Text>
                            <Text style={styles.text}>
                                {user?.address?.city}
                            </Text>
                            <Text style={styles.text}>
                                {user?.address?.country}
                            </Text>
                        </React.Fragment>
                    ) : null}
                </React.Fragment>
            }
            isEditable
            onEdit={() => onEdit('address')}
        ></SectionInInformationCard>
    );

    return (
        <View style={generalStyles.container}>
            <HeroCard
                title="User Role"
                secondary
                imageSrc={require('../../assets/banners/profile-hero.png')}
            />
            <InformationCard style={styles.informationCard}>
                <ProfileInformation />
                <Address />
            </InformationCard>
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
});
