import React from 'react';
import generalStyles from '../../styles/General';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { CONSTANTS, JSHash } from 'react-native-hash';
// Components
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/actions/Button';
import InputField from '../../components/InputField';
import AppLogo from '../../components/svgs/AppLogo';
import SplashScreen from './SplashScreen';
import LanguageSelector from '../../components/actions/LanguageSelector';
// API
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, logOut } from '../../redux/slice/user';
// Translations
import { useTranslation } from 'react-i18next';

export default function LogInScreen(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { roles } = useSelector((state) => state.roles);
    const { user } = useSelector((state) => state.user);
    const [showLoading, setShowLoading] = React.useState(true);

    const { t } = useTranslation();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data) => {
        // Hash password
        JSHash(data.password, CONSTANTS.HashAlgorithms.sha256)
            .then((hash) => {
                data.password = hash; // replace password with the hash

                dispatch(getUser({ data: data, byId: false }));
                reset();
            })
            .catch((e) => console.log(e));
    };

    const showSignUp = () => {
        navigation?.navigate('SignUpScreen', { roles: roles });
    };

    React.useEffect(() => {
        const persistLogIn = async () => {
            try {
                let savedUser = JSON.parse(
                    await SecureStore.getItemAsync('user'),
                );
                // Fetch user with Id if there's a saved user from SecureStore
                if (savedUser) {
                    dispatch(getUser({ data: savedUser?._id, byId: true }));
                }
            } catch {
                console.error;
                dispatch(logOut(undefined));
            }
        };
        persistLogIn();

        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 890);

        showLoading && timer;
        return () => clearTimeout(timer);
    }, [user]);

    return (
        <View
            style={[
                styles.container,
                showLoading && { backgroundColor: '#1B463C' },
            ]}
        >
            {showLoading ? (
                <SplashScreen />
            ) : (
                <React.Fragment>
                    <LanguageSelector
                        quickDisplay
                        style={styles.languageOptions}
                    />
                    <AppLogo style={styles.icon}></AppLogo>
                    <View style={styles.formWrapper}>
                        <Text style={styles.header}>
                            {t('common:labels.logIn')}
                        </Text>

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
                                    label={t('common:profile.email')}
                                    placeholder="john@mail.com"
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
                                    label={t('common:profile.password')}
                                    placeholder="**********"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    errorMessage={error}
                                    maxLength={20}
                                    secureTextEntry
                                ></InputField>
                            )}
                        ></Controller>

                        <Button
                            title={t('common:labels.logIn')}
                            onPress={handleSubmit(onSubmit)}
                            primary
                            buttonStyle={[
                                styles.buttonStyle,
                                { marginTop: 15 },
                            ]}
                        ></Button>
                        <Text style={styles.mediumText}>
                            {t('common:labels.signUpText')}
                        </Text>
                        <Button
                            title={t('common:labels.becomeCustomer')}
                            outlined
                            buttonStyle={styles.buttonStyle}
                            onPress={showSignUp}
                        ></Button>
                    </View>
                </React.Fragment>
            )}
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
        ...generalStyles.headerH1,
        color: '#000000',
        marginVertical: 15,
        paddingHorizontal: 18,
    },
    icon: { marginTop: 5, marginBottom: 40 },
    formWrapper: {
        width: '95%',
    },
    buttonStyle: {
        alignSelf: 'center',
    },
    mediumText: {
        ...generalStyles.mediumText,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 15,
    },
    languageOptions: {
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 70,
        right: 30,
    },
});
