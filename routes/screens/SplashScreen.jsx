import React from 'react';
import generalStyles from '../../styles/General';
import { StyleSheet, View, Image } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logos/pantrii-logo-new.jpg')}
                style={styles.image}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,
        padding: 0,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B463C',
        width: '100%',
    },
    image: {
        width: 115,
        height: 115,
        resizeMode: 'cover',
        alignSelf: 'center',
    },
});
