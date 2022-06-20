import React from 'react';
import generalStyles from '../../styles/General';
import dictionary from '../../dictionary/general.json';
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
import { updateUser } from '../../redux/slice/user';
import { useSelector, useDispatch } from 'react-redux';
// Translations
import { useTranslation } from 'react-i18next';

export default function ProfileEditScreen(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const content = dictionary?.customerTypes;
    const userRole = props.route?.params?.userRole;
    const { user } = useSelector((state) => state?.user);
    const { t } = useTranslation();

    const informationType = props.route?.params?.informationType;
    const information =
        informationType === 'profile'
            ? t('navigate:profile')
            : informationType === 'address'
            ? t('common:profile.address')
            : null;

    const [hasUserInformation, setHasUserInformation] = React.useState(false);
    const [focused, setFocused] = React.useState(false);

    React.useEffect(() => {
        props.navigation?.setOptions({
            headerTitle:
                t('common:labels.edit').toUpperCase() +
                ` ${information.toUpperCase()}`,
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });

        if (user) {
            reset(user);
            setHasUserInformation(true);
        }
    }, [informationType]);

    const { control, handleSubmit, reset } = useForm({});

    const onSubmit = (data) => {
        // Find differences between input value and local data
        const dataDifferences = Object.keys(data).reduce((diff, key) => {
            if (user[key] === data[key]) return diff;
            return {
                ...diff,
                [key]: data[key],
            };
        }, {});

        // Remove address object in data to send when it's 'profile' info.
        if (informationType === 'profile') {
            delete dataDifferences?.address;
        }

        Object.keys(dataDifferences).length !== 0 &&
            dispatch(updateUser({ user: data, information: dataDifferences })); // POST to database

        navigation?.goBack(); // Back to display screen
    };

    const onFocus = () => {
        setFocused(true);
        setHasUserInformation(false);
    };

    return (
        <View style={styles.container}>
            <HeroCard
                banner
                title={content[userRole]}
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
                                    label={t('common:profile.firstName') + '*'}
                                    placeholder="John"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                    errorMessage={error}
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
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
                                    label={t('common:profile.lastName') + '*'}
                                    placeholder="Eksempel"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                    errorMessage={error}
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
                                ></InputField>
                            )}
                        />
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
                                    label={t('common:profile.email') + '*'}
                                    placeholder="eksemple@mail.com"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoCapitalize="none"
                                    autoComplete={false}
                                    errorMessage={error}
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
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
                                    label={
                                        t('common:profile.phoneNumber') + '*'
                                    }
                                    placeholder="57575757"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    errorMessage={error}
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
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
                                required:
                                    t('common:profile.address') +
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
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
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
                                    label={
                                        t('common:profile.addressLine2') + '*'
                                    }
                                    placeholder="Evt. dørnummer"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={error}
                                    autoComplete={false}
                                    autoCapitalize="sentences"
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
                                ></InputField>
                            )}
                        />
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
                                        hasDefaultValue
                                        onFocus={onFocus}
                                        focused={focused}
                                    ></InputField>
                                )}
                            />
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
                                        hasDefaultValue
                                        onFocus={onFocus}
                                        focused={focused}
                                    ></InputField>
                                )}
                            />
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
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
                                ></InputField>
                            )}
                        />
                    </React.Fragment>
                )}
                <Button
                    primary
                    buttonStyle={styles.buttonStyle}
                    disabled={hasUserInformation}
                    title={t('common:labels.save')}
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
    hasDefaultValue: {
        color: 'grey',
    },
});
