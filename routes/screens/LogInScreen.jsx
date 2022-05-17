import React from 'react';
import generalStyles from '../../styles/General';
import { StyleSheet, Text, View, Image } from 'react-native';
// Components
import { Link, useNavigation } from '@react-navigation/native';
import Button from '../../components/actions/Button';
import InputField from '../../components/InputField';

// import { useDispatch } from 'react-redux';
// import { logIn, restoreUser, refreshToken } from '../store/actions/UserActions';
// import * as SecureStore from 'expo-secure-store';

export default function LogInScreen(props) {
    const navigation = useNavigation();
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const handleLogIn = () => {
        //   dispatch(logIn(email, password));
        console.log('authenticating user...');
    };
    const showSignUp = () => {
        navigation?.navigate('SignUpScreen');
    };
    return (
        <View style={[styles.container]}>
            <Image
                source={require('../../assets/logos/pantrii-round-logo.png')}
                style={[styles.icon, { width: 97, height: 97 }]}
            ></Image>
            <View style={styles.formWrapper}>
                <InputField label="email"></InputField>
                <InputField label="password" secureTextEntry></InputField>
                <Button
                    title="log ind"
                    primary
                    buttonStyle={styles.buttonStyle}
                    onPress={handleLogIn}
                ></Button>
                <Text style={styles.mediumText}>Jeg er ny hér</Text>
                <Button
                    title="bliv kunde"
                    outlined
                    buttonStyle={styles.buttonStyle}
                    onPress={showSignUp}
                ></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,
        backgroundColor: '#EFF2EE',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formWrapper: {
        width: '100%',
    },
    icon: {
        marginBottom: 50,
        //   margin: 20,
    },
    buttonStyle: {
        alignSelf: 'center',
    },
    mediumText: {
        ...generalStyles.mediumText,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 5,
    },
});
