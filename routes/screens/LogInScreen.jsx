import React from 'react';
import generalStyles from '../../styles/General';
// Components
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
            console.log('emtpty inputs');
        } else {
            //authenticate inputs
            setModalVisible(!modalVisible);
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
                <Text style={styles.header}>log ind</Text>

                <InputField
                    label="email"
                    placeholder="example@mail.com"
                    value={email}
                    onValid={(valid) => setIsEmailValid(valid)}
                    setContent={(email) => onChangeEmail(email)}
                    autoComplete={false}
                ></InputField>
                <InputField
                    label="adgangskode"
                    placeholder="**********"
                    secureTextEntry
                    value={password}
                    onValid={(valid) => setIsPasswordValid(valid)}
                    setContent={(password) => onChangePassword(password)}
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
    header: {
        ...generalStyles.headerH2,
        marginVertical: 15,
        paddingHorizontal: 30,
    },
    formWrapper: {
        width: '95%',
    },
    icon: {
        marginBottom: 30,
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
