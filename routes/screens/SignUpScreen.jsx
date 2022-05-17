import React from 'react';
import generalStyles from '../../styles/General';
// Components
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/actions/Button';
import InputField from '../../components/InputField';
import { RadioButton } from 'react-native-paper';

export default function LogInScreen(props) {
    const navigation = useNavigation();
    const [value, setValue] = React.useState('');

    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const handleSignUp = () => {};

    const showLogIn = () => {
        navigation.navigate('LogInScreen');
    };

    React.useEffect(() => {
        //   console.log(value);
    });
    return (
        <SafeAreaView style={{ flex: 1, marginTop: 70 }}>
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/logos/pantrii-round-logo.png')}
                        style={{ width: 97, height: 97 }}
                    ></Image>

                    {/* Form */}
                    <View style={styles.formWrapper}>
                        <Text style={styles.header}>jeg er ny her</Text>
                        <RadioButton.Group
                            onValueChange={(newValue) => setValue(newValue)}
                            value={value}
                        >
                            <View style={styles.radioButtonGroup}>
                                <RadioButton.Item
                                    label="Erhvervskunde"
                                    value="corporate"
                                    status={
                                        value === 'corporate'
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    color="#000000"
                                    mode="android"
                                    position="leading"
                                    labelStyle={styles.radioButtonLabel}
                                />
                                <RadioButton.Item
                                    label="Privat"
                                    status={
                                        value === 'private'
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    value="private"
                                    color="#000000"
                                    labelStyle={styles.radioButtonLabel}
                                    mode="android"
                                    position="leading"
                                />
                            </View>
                        </RadioButton.Group>
                        <InputField
                            label="fornavn *"
                            placeholder="John"
                            value={email}
                            onValid={(valid) => setIsEmailValid(valid)}
                            setContent={(email) => onChangeEmail(email)}
                            autoComplete={false}
                            autoCapitalize="words"
                        ></InputField>
                        <InputField
                            label="efternavn *"
                            placeholder="Eksempel"
                            autoComplete={false}
                            autoCapitalize="words"
                        ></InputField>
                        <InputField
                            label="email *"
                            placeholder="example@mail.com"
                            autoComplete={false}
                        ></InputField>
                        <InputField
                            label="mobilnummer *"
                            placeholder="57575757"
                            autoComplete={false}
                        ></InputField>
                        <InputField
                            label="adresselinje 1 *"
                            placeholder="Vejnavn og husnummer"
                            autoComplete={false}
                            autoCapitalize="words"
                        ></InputField>
                        <InputField
                            label="adresselinje 2"
                            placeholder="Evt. dørnummer"
                            autoComplete={false}
                            autoCapitalize="sentences"
                        ></InputField>
                        <View style={styles.fieldset}>
                            <InputField
                                label="postnr. *"
                                placeholder="2000"
                                autoComplete={false}
                                autoCapitalize="sentences"
                                inputStyle={{
                                    width: '90%',
                                }}
                            ></InputField>
                            <InputField
                                label="by *"
                                placeholder="København"
                                autoComplete={false}
                                inputStyle={{
                                    width: 120,
                                    alignSelf: 'flex-start',
                                }}
                            ></InputField>
                        </View>
                        <InputField
                            label="land *"
                            placeholder="Danmark"
                            autoComplete={false}
                        ></InputField>

                        <Button
                            title="registrér mig"
                            primary
                            buttonStyle={styles.buttonStyle}
                            onPress={handleSignUp}
                        ></Button>
                    </View>
                    <Text style={styles.mediumText}>Velkomme tilbage</Text>
                    <Button
                        title="log ind"
                        outlined
                        buttonStyle={styles.buttonStyle}
                        onPress={showLogIn}
                    ></Button>
                </View>
            </ScrollView>
        </SafeAreaView>
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
    formWrapper: { width: '95%', marginVertical: 20 },
    header: {
        ...generalStyles.headerH2,
        marginVertical: 10,
        paddingHorizontal: 30,
    },
    buttonStyle: { alignSelf: 'center' },
    fieldset: {
        width: '100%',

        flexDirection: 'row',
        alignContent: 'stretch',
        justifyContent: 'space-between',
    },
    radioButtonGroup: {
        flexDirection: 'row',
        alignContent: 'stretch',
    },
    radioButtonLabel: {
        fontFamily: 'TT-Commons-DemiBold',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 1,
        textTransform: 'capitalize',
        paddingHorizontal: 5,
    },
    mediumText: {
        ...generalStyles.mediumText,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 5,
    },
});
