import React from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, Text } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

export interface Props {
    value: React.ComponentProps<typeof TextInput>['value'];
    label: string;
    onBlur?: React.ComponentProps<typeof TextInput>['onBlur'];
    onChangeText?: React.ComponentProps<typeof TextInput>['onChangeText'];
    errorMessage?: { message: string };
    placeholder: React.ComponentProps<typeof TextInput>['placeholder'];
    keyboardType?: React.ComponentProps<typeof TextInput>['keyboardType'];
    multiline?: React.ComponentProps<typeof TextInput>['multiline'];
    autoCapitalize?: React.ComponentProps<typeof TextInput>['autoCapitalize'];
    autoComplete?: React.ComponentProps<typeof TextInput>['autoComplete'];
    secureTextEntry?: React.ComponentProps<typeof TextInput>['secureTextEntry'];
    isPasswordInput?: boolean;
    maxLength?: React.ComponentProps<typeof TextInput>['maxLength'];
    inputStyle?: React.ComponentProps<typeof View>['style'];
}

export default function InputField({
    value,
    label,
    onBlur,
    onChangeText,
    errorMessage,
    placeholder,
    keyboardType,
    maxLength,
    secureTextEntry,
    isPasswordInput,
    multiline,
    autoCapitalize,
    autoComplete,
    inputStyle,
}: Props) {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={inputStyle}>
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    autoCapitalize={autoCapitalize}
                    autoComplete={autoComplete}
                    secureTextEntry={!showPassword}
                    maxLength={maxLength}
                    blurOnSubmit
                    style={styles.textValue}
                ></TextInput>
                {isPasswordInput ? (
                    <AntDesign
                        name={!showPassword ? 'eye' : 'eyeo'}
                        size={17}
                        color="black"
                        style={styles.eyeIcon}
                        onPress={togglePassword}
                    />
                ) : null}
            </View>
            {/* Error message */}
            {errorMessage && errorMessage?.message !== '' ? (
                <SafeAreaView style={styles.errorContainer}>
                    <MaterialIcons
                        name="error"
                        size={17}
                        color="red"
                        style={styles.errorIcon}
                    />
                    <Text style={styles.errorMessage}>
                        {errorMessage?.message}
                    </Text>
                </SafeAreaView>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 18,
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: '#EFF2EE',

        borderRadius: 1000,
        borderStyle: 'solid',
        // borderColor: '#1B463C',
        borderWidth: 1,
    },
    label: {
        fontFamily: 'TT-Commons-DemiBold',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 1,
        textTransform: 'capitalize',
        paddingHorizontal: 5,

        position: 'absolute',
        width: 'auto',
        height: 19.41,
        backgroundColor: '#EFF2EE',
        left: 20,
        top: 50,
        transform: [
            {
                translateY: -59,
            },
        ],
    },
    eyeIcon: {
        alignSelf: 'flex-end',
        position: 'absolute',
        right: 20,
        top: '62%',
    },
    textValue: {
        fontFamily: 'TT-Commons-Regular',
        fontSize: 16,
        letterSpacing: 1,
        marginTop: 1,
    },
    errorContainer: {
        flexDirection: 'row',

        alignContent: 'center',
        marginHorizontal: 30,
        marginBottom: 15,
        paddingHorizontal: 14,
    },
    errorMessage: {
        fontFamily: 'TT-Commons-Regular',
        fontSize: 14,
        letterSpacing: 1,
        lineHeight: 17.5,
        marginTop: 1,
        color: 'red',
    },
    errorIcon: {
        marginRight: 5,
    },
});
