import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import generalStyles from '../../styles/General.js';
import Button from '../../components/actions/Button';
import { StatusBar } from 'expo-status-bar';
import IconButton from '../../components/actions/IconButton';
import FavoriteButton from '../../components/actions/FavoriteButton';
import ViewButton from '../../components/actions/ViewButton';

export default function HomeSuppliersScreen() {
    return (
        <View style={generalStyles.container}>
            <Text style={generalStyles.headerH1}>Hjem Leverandører</Text>

            <StatusBar style="auto" />
            <Button title="log ind" primary></Button>
            <IconButton title="detaljer" arrowRight></IconButton>
            <IconButton title="sort" arrowDown outlined></IconButton>
            <FavoriteButton isActive></FavoriteButton>
            <ViewButton></ViewButton>
        </View>
    );
}
