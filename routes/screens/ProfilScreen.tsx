import React from 'react';
import generalStyles from '../../styles/General';
import User from '../../models/User';
// Components
import { StyleSheet, Text, View } from 'react-native';
import HeroCard from '../../components/buyers/HeroCard';

export interface Props {
    user: User;
}

export default function ProfileScreen({ user }: Props) {
    return (
        <View style={generalStyles.container}>
            <HeroCard
                title="User Role"
                secondary
                imageSrc={require('../../assets/banners/profile-hero.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerH1: {
        fontFamily: 'TT-Commons-Bold',
    },
});
