import React from 'react';
import generalStyles from '../../styles/General';
// Components
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/actions/Button';
import InputField from '../../components/InputField';
import { useForm, Controller } from 'react-hook-form';

export default function LogInScreen(props) {
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = (data) => {
        console.log(data);
        // POST
        // founduser ? save in SecureStore
        // go to Home
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
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'Dette er påkrævet',
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
                        required: 'Dette er påkrævet',
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
                            secureTextEntry
                            autoComplete={false}
                            errorMessage={error}
                        ></InputField>
                    )}
                ></Controller>
                <Button
                    title="log ind"
                    primary
                    buttonStyle={styles.buttonStyle}
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
