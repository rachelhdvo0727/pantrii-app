import React from 'react';
import generalStyles from '../../styles/General';
import User from '../../models/User';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
// Components
import { StyleSheet, Text, View } from 'react-native';
import HeroCard from '../../components/buyers/HeroCard';
import InputField from '../../components/InputField';
import BackIconButton from '../../components/actions/BackIconButton';
import Button from '../../components/actions/Button';
import { Feather } from '@expo/vector-icons';
// API
import axios from 'axios';

export default function ProfileEditScreen(props) {
    const navigation = useNavigation();
    const user = props.route?.params?.user;
    const informationType = props.route?.params?.informationType;
    const information =
        informationType === 'profile'
            ? 'profil'
            : informationType === 'address'
            ? 'adresse'
            : null;

    React.useEffect(() => {
        props.navigation?.setOptions({
            headerTitle: `REDIGER ${information.toUpperCase()}`,
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });
    }, [informationType]);

    const { control, handleSubmit } = useForm({
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
        // POST
    };

    return (
        <View style={styles.container}>
            <HeroCard
                title="User Role"
                secondary
                imageSrc={require('../../assets/banners/profile-hero.png')}
            />
            <View style={styles.formWrapper}>
                <Text style={styles.header}>
                    {informationType === 'profile' &&
                        `${information[0].toUpperCase()}${information.slice(
                            1,
                        )} information`}
                    {informationType === 'address' &&
                        `${information[0].toUpperCase()}${information.slice(
                            1,
                        )}`}
                    {'  '}
                    <Feather name="edit-2" size={13} color="black" />
                </Text>
                {informationType === 'profile' && (
                    <React.Fragment>
                        <Controller
                            name="firstName"
                            control={control}
                            rules={{}}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label="fornavn *"
                                    placeholder={user?.firstName}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                    errorMessage={error}
                                ></InputField>
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            rules={{}}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label="efternavn *"
                                    placeholder={user?.lastName}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                    errorMessage={error}
                                ></InputField>
                            )}
                        />
                        <Controller
                            name="email *"
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
                                    placeholder={user?.email}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoCapitalize="none"
                                    autoComplete={false}
                                    errorMessage={error}
                                ></InputField>
                            )}
                        />
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
                                    placeholder={user?.phone}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    errorMessage={error}
                                ></InputField>
                            )}
                        />
                    </React.Fragment>
                )}
                {informationType === 'address' && (
                    <React.Fragment>
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
                                    placeholder={user?.address?.line1}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={error}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                ></InputField>
                            )}
                        />
                        <Controller
                            name={`address.line2`}
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label="adresselinje 2"
                                    placeholder={user?.address?.line2}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={error}
                                    autoComplete={false}
                                    autoCapitalize="sentences"
                                ></InputField>
                            )}
                        />
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
                                        placeholder={user?.address?.zipCode}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        errorMessage={error}
                                        autoComplete={false}
                                        keyboardType="numbers-and-punctuation"
                                        inputStyle={styles.fieldsetCell}
                                    ></InputField>
                                )}
                            />
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
                                        placeholder={user?.address?.city}
                                        autoComplete
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        errorMessage={error}
                                        inputStyle={styles.fieldsetCell}
                                    ></InputField>
                                )}
                            />
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
                                    placeholder={user?.address?.country}
                                    autoComplete={false}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={error}
                                ></InputField>
                            )}
                        />
                    </React.Fragment>
                )}
                <Button
                    primary
                    buttonStyle={styles.buttonStyle}
                    title="Gem"
                    onPress={handleSubmit(onSubmit)}
                ></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,
        alignItems: 'center',
    },
    header: {
        ...generalStyles.headerH3,
        marginBottom: 13,
        marginLeft: 20,
    },
    formWrapper: {
        paddingVertical: 30,
        width: '95%',
        alignSelf: 'center',
        flex: 1,
    },
    fieldset: {
        flexDirection: 'row',
    },
    fieldsetCell: { flex: 1 },
    buttonStyle: { alignSelf: 'center', marginVertical: 10, width: '40%' },
});
