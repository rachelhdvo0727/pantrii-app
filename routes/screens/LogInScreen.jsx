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
import axios from 'axios';
import { findUser, mongoDbConfig } from '../../utils/api';

export default function LogInScreen(props) {
    const navigation = useNavigation();
    const [roles, setRoles] = React.useState([]);

    React.useEffect(() => {
        // Fetch all roles for this app
        axios(mongoDbConfig('roles'))
            .then((response) => {
                // console.log(response?.data);
                setRoles(response?.data?.documents);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = (data) => {
        // POST
        axios(findUser(data, false))
            .then((response) => {
                const data = response?.data?.document;
                const currentUserRole = roles?.filter(
                    (role) => data?.roleId === role?._id,
                );
                const user = new User(
                    data?._id,
                    data?.firstName,
                    data?.lastName,
                    data?.email,
                    data?.password,
                    data?.phone,
                    data?.address,
                    data?.roleId,
                    currentUserRole[0]?.role,
                );

                if (response?.status === 200) {
                    saveData('user', objectToString(user)); // save in SecureStore

                    // Navigate to the screens based on user's role
                    if (user?.roleId === currentUserRole[0]?._id) {
                        currentUserRole[0]?.role === 'producer' &&
                            navigation.navigate('BottomTabSuppliers', {
                                screen: 'HomeSuppliersScreen',
                                user: user,
                            });
                        currentUserRole[0]?.role === 'buyer' &&
                            navigation.navigate('BottomTabBuyers', {
                                screen: 'HomeStack',
                                params: {
                                    screen: 'HomeScreen',
                                    user: user,
                                },
                            });
                    }
                    reset();
                }
            })
            .catch((error) => console.error(error));
    };

    const showSignUp = () => {
        navigation?.navigate('SignUpScreen', { roles: roles });
    };

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
