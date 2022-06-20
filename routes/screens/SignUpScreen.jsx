import React from 'react';
import generalStyles from '../../styles/General';
import dictionary from '../../dictionary/general.json';
import { useNavigation } from '@react-navigation/native';
import { CONSTANTS, JSHash } from 'react-native-hash';

// Components
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Button from '../../components/actions/Button';
import InputField from '../../components/InputField';
import AppLogo from '../../components/svgs/AppLogo';
import { useForm, Controller } from 'react-hook-form';
import { RadioButton } from 'react-native-paper';
import ApprovedModal from '../../components/ApprovedModal';
// API
import { createUser } from '../../redux/slice/user';
import { useDispatch, useSelector } from 'react-redux';
// Translations
import { useTranslation } from 'react-i18next';

export default function LogInScreen(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const content = dictionary?.customerTypes; // DA dictionary
    // const savedRoles = props?.route.params?.roles;
    const { roles } = useSelector((state) => state?.roles);
    const [value, setValue] = React.useState('');

    const { t } = useTranslation();

    const { control, handleSubmit, reset } = useForm({
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
            roleId: '',
        },
    });

    const _hash = async (data) => {
        console.log(data);
    };

    const onSubmit = (data) => {
        // Hash password
        JSHash(data.password, CONSTANTS.HashAlgorithms.sha256)
            .then((hash) => {
                data.roleId = value; // add roleId from RadioButton group
                data.password = hash; // replace password with the hash

                dispatch(createUser(data)); // Send data
                reset();
                setModalVisible(true);
            })
            .catch((e) => console.log(e));
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

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 70 }}>
            <ScrollView>
                <View style={styles.container}>
                    <AppLogo style={styles.icon}></AppLogo>

                    {/* Form */}
                    <View style={styles.formWrapper}>
                        <Text style={styles.header}>
                            {t('common:labels.newCustomerText')}
                        </Text>
                        <RadioButton.Group
                            onValueChange={(value) => setValue(value)}
                            value={value}
                        >
                            <View style={styles.radioButtonGroup}>
                                <RadioButton.Item
                                    label={t('common:labels.producer')}
                                    value={roles[0]?._id}
                                    status={
                                        value === content?.customer
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    color="#000000"
                                    mode="android"
                                    position="leading"
                                    labelStyle={styles.radioButtonLabel}
                                />
                                <RadioButton.Item
                                    label={t('common:labels.customer')}
                                    status={
                                        value === content?.producer
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    value={roles[1]?._id}
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
                                required:
                                    t('common:profile.firstName') +
                                    t('common:labels.isRequired'),
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label={t('common:profile.firstName') + '*'}
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
                                required:
                                    t('common:profile.lastName') +
                                    t('common:labels.isRequired'),
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label={t('common:profile.lastName') + '*'}
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
                                required:
                                    t('common:profile.email') +
                                    t('common:labels.isRequired'),
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
                                    label={t('common:profile.email') + '*'}
                                    placeholder="eksemple@mail.com"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoCapitalize="none"
                                    autoComplete={false}
                                    errorMessage={error}
                                ></InputField>
                            )}
                        ></Controller>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required:
                                    t('common:profile.password') +
                                    t('common:labels.isRequired'),
                                minLength: {
                                    value: 12,
                                    message:
                                        t('common:profile.password') +
                                        t('common:labels.passwordRequirement'),
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        t('common:profile.password') +
                                        t('common:labels.passwordRequirement'),
                                },
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label={t('common:profile.password') + '*'}
                                    placeholder="**********"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    secureTextEntry
                                    isPasswordInput
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
                                required:
                                    t('common:profile.phoneNumber') +
                                    t('common:labels.isRequired'),
                                pattern: {
                                    value: /^((\(?\+45\)?)?)(\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2})$/,
                                    message:
                                        t('common:profile.phoneNumber') +
                                        t('common:labels.phoneRequirement'),
                                },
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label={
                                        t('common:profile.phoneNumber') + '*'
                                    }
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
                                required:
                                    t('common:profile.addressLine1') +
                                    t('common:labels.isRequired'),
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label={
                                        t('common:profile.addressLine1') + '*'
                                    }
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
                                    label={t('common:profile.addressLine2')}
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
                                    required:
                                        t('common:profile.postNumber') +
                                        t('common:labels.isRequired'),
                                }}
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error },
                                }) => (
                                    <InputField
                                        label={
                                            t('common:profile.postNumber') + '*'
                                        }
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
                                    required:
                                        t('common:profile.city') +
                                        t('common:labels.isRequired'),
                                }}
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error },
                                }) => (
                                    <InputField
                                        label={t('common:profile.city') + '*'}
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
                                required:
                                    t('common:profile.country') +
                                    t('common:labels.isRequired'),
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label={t('common:profile.country') + '*'}
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
                            title={t('common:labels.signUp')}
                            primary
                            buttonStyle={styles.buttonStyle}
                            onPress={handleSubmit(onSubmit)}
                        ></Button>
                    </View>
                    <Text style={styles.mediumText}>
                        {t('common:labels.customerText')}
                    </Text>
                    <Button
                        title={t('common:labels.logIn')}
                        outlined
                        buttonStyle={styles.buttonStyle}
                        onPress={showLogIn}
                    ></Button>
                </View>
            </ScrollView>

            {/* Success sign uo modal */}
            <ApprovedModal
                messageTitle={t('common:labels.approvedMessage')}
                messageText={t('common:labels.signUpSuccess')}
                isModalVisible={modalVisible}
                buttonTitle={t('common:labels.logIn')}
                hasConfirmedIcon={true}
                hasButton={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                onPress={onSignUpSuccess}
                modalAsScreen
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
    icon: {
        marginVertical: 5,
    },
    formWrapper: { width: '95%', marginVertical: 20 },
    header: {
        ...generalStyles.headerH1,
        color: '#000000',
        marginVertical: 10,
        paddingHorizontal: 18,
    },
    buttonStyle: { alignSelf: 'center', marginVertical: 15 },
    fieldset: {
        flexDirection: 'row',
    },
    fieldsetCell: { flex: 1 },
    radioButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },
});
