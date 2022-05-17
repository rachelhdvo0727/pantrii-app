import React from 'react';
import generalStyles from '../../styles/General';
import { StyleSheet, Text, View, Image } from 'react-native';
// Components
import { Link, useNavigation } from '@react-navigation/native';
import Button from '../../components/actions/Button';
import InputField from '../../components/InputField';

export default function LogInScreen(props) {
    const navigation = useNavigation();
    const [email, onChangeEmail] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(false);

    const [password, onChangePassword] = React.useState('');
    const [isPasswordValid, setIsPasswordValid] = React.useState(false);

    const handleLogIn = () => {
        console.log('authenticating user...');
        if (email !== '' && password !== '') {
            console.log('log in');
        }
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
                <InputField
                    label="email"
                    placeholder="example@mail.com"
                    value={email}
                    onValid={(valid) => setIsEmailValid(valid)}
                    setContent={(email) => onChangeEmail(email)}
                    autoCapitalize={false}
                    autoComplete={false}
                ></InputField>
                <InputField
                    label="password"
                    placeholder="**********"
                    secureTextEntry
                    value={password}
                    onValid={(valid) => setIsPasswordValid(valid)}
                    setContent={(password) => onChangePassword(password)}
                    autoCapitalize={false}
                    autoComplete={false}
                ></InputField>
                <Button
                    title="log ind"
                    primary
                    buttonStyle={styles.buttonStyle}
                    onPress={handleLogIn}
                ></Button>
                <Text style={styles.mediumText}>
                    Jeg er ny hér. Registrer mig.
                </Text>
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
    },
    buttonStyle: {
        alignSelf: 'center',
    },
    mediumText: {
        ...generalStyles.mediumText,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 5,
    },
});
