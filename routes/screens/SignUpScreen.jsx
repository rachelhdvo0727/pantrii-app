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
import { useForm, Controller } from 'react-hook-form';
import { RadioButton } from 'react-native-paper';
import ApprovedModal from '../../components/ApprovedModal';
// API
import axios from 'axios';
import { createUserAccount } from '../../utils/api';
import CryptoJS from 'crypto-js';

export default function LogInScreen(props) {
    const navigation = useNavigation();
    const [value, setValue] = React.useState('');

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            address: {
                line1: '',
                line2: '',
                zipCode: '',
                city: '',
                country: '',
            },
        },
    });

    const onSubmit = (data) => {
        setModalVisible(true);

        // Send data
        axios(createUserAccount(data))
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
    };

    const showLogIn = () => {
        navigation.navigate('LogInScreen');
    };

    // Modal
    const [modalVisible, setModalVisible] = React.useState(false);
    const onSignUpSuccess = () => {
        setModalVisible(!modalVisible);
        navigation?.navigate('LogInScreen');
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
                        <Controller
                            name="firstName"
                            control={control}
                            rules={{
                                required: 'Fornavn er påkrævet',
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label="fornavn *"
                                    placeholder="John"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                    errorMessage={error}
                                ></InputField>
                            )}
                        ></Controller>
                        <Controller
                            name="lastName"
                            control={control}
                            rules={{
                                required: 'Efternavn er påkrævet',
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label="efternavn *"
                                    placeholder="Eksempel"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                    errorMessage={error}
                                ></InputField>
                            )}
                        ></Controller>

                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Email er påkrævet',
                                pattern: {
                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Din email er ugyldig',
                                },
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label="email *"
                                    placeholder="example@mail.com"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    errorMessage={error}
                                ></InputField>
                            )}
                        ></Controller>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: 'Adgangskode er påkrævet',
                                minLength: {
                                    value: 12,
                                    message:
                                        'Adgangskode skal være mellem 12-20 karakterer',
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        'Adgangskode skal være mellem 12-20 karakterer',
                                },
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label="adgangskode *"
                                    placeholder="**********"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    secureTextEntry
                                    autoComplete={false}
                                    errorMessage={error}
                                    maxLength={20}
                                ></InputField>
                            )}
                        ></Controller>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: 'Mobilnummer er påkrævet',
                                pattern: {
                                    value: /^((\(?\+45\)?)?)(\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2})$/,
                                    message:
                                        'Mobilnummer skal være 8 cifre, uden landskode',
                                },
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label="mobilnummer *"
                                    placeholder="57575757"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    errorMessage={error}
                                ></InputField>
                            )}
                        ></Controller>
                        <Controller
                            name={`address.line1`}
                            control={control}
                            rules={{
                                required: 'Adresse er påkrævet',
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label="adresselinje 1 *"
                                    placeholder="Vejnavn og husnummer"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={error}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                ></InputField>
                            )}
                        ></Controller>
                        <Controller
                            name={`address.line2`}
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label="adresselinje 2"
                                    placeholder="Evt. dørnummer"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={error}
                                    autoComplete={false}
                                    autoCapitalize="sentences"
                                ></InputField>
                            )}
                        ></Controller>

                        <View style={styles.fieldset}>
                            <Controller
                                name={`address.zipCode`}
                                control={control}
                                rules={{
                                    required: 'Postnr. er påkrævet',
                                }}
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error },
                                }) => (
                                    <InputField
                                        label="postnr. *"
                                        placeholder="2000"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        errorMessage={error}
                                        autoComplete={false}
                                        keyboardType="numbers-and-punctuation"
                                        inputStyle={styles.fieldsetCell}
                                    ></InputField>
                                )}
                            ></Controller>
                            <Controller
                                name={`address.city`}
                                control={control}
                                rules={{
                                    required: 'By er påkrævet',
                                }}
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error },
                                }) => (
                                    <InputField
                                        label="by *"
                                        placeholder="København"
                                        autoComplete
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        errorMessage={error}
                                        inputStyle={styles.fieldsetCell}
                                    ></InputField>
                                )}
                            ></Controller>
                        </View>
                        <Controller
                            name={`address.country`}
                            control={control}
                            rules={{
                                required: 'Land er påkrævet',
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label="land *"
                                    placeholder="Danmark"
                                    autoComplete={false}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={error}
                                ></InputField>
                            )}
                        ></Controller>

                        <Button
                            title="registrér mig"
                            primary
                            buttonStyle={styles.buttonStyle}
                            onPress={handleSubmit(onSubmit)}
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

            {/* Success sign uo modal */}
            <ApprovedModal
                messageTitle="godkendt"
                messageText="Din konto er oprette. Fortsæt med at logge ind"
                isModalVisible={modalVisible}
                buttonTitle="log ind"
                hasConfirmedIcon={true}
                hasButton={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                onPress={onSignUpSuccess}
            ></ApprovedModal>
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
        ...generalStyles.headerH1,
        color: '#000000',
        marginVertical: 10,
        paddingHorizontal: 18,
    },
    buttonStyle: { alignSelf: 'center' },
    fieldset: {
        flexDirection: 'row',
    },
    fieldsetCell: { flex: 1 },
    radioButtonGroup: {
        flexDirection: 'row',
        //  alignContent: 'stretch',
        alignContent: 'flex-start',
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
