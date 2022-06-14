import React from 'react';
import generalStyles from '../../styles/General';
import User from '../../models/User';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { saveData, objectToString } from '../../utils/functions';
// Components
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/actions/Button';
import InputField from '../../components/InputField';
import AppLogo from '../../components/svgs/AppLogo';
// API
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, logOut } from '../../redux/slice/user';

export default function LogInScreen(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { roles } = useSelector((state) => state.roles);
    const { user } = useSelector((state) => state.user);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = (data) => {
        reset();
        dispatch(getUser({ data: data, byId: false }));
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
                if (savedUser) {
                    dispatch(getUser({ data: savedUser?._id, byId: true }));
                }
            } catch {
                console.error;
                dispatch(logOut(undefined));
            }
        };
        persistLogIn();
    }, [user]);

    return (
        <View style={[styles.container]}>
            <AppLogo style={styles.icon}></AppLogo>
            <View style={styles.formWrapper}>
                <Text style={styles.header}>log ind</Text>
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
                            label="email"
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
                            label="adgangskode"
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
                    title="log ind"
                    primary
                    buttonStyle={[styles.buttonStyle, { marginTop: 20 }]}
                    onPress={handleSubmit(onSubmit)}
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
});
