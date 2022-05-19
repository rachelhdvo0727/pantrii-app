import React from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export interface Props {
    value: React.ComponentProps<typeof TextInput>['value'];
    label: string;
    onBlur?: React.ComponentProps<typeof TextInput>['onBlur'];
    onValid(arg: boolean): void;
    setContent(arg: string): void;
    errorMessage?: string;
    placeholder: React.ComponentProps<typeof TextInput>['placeholder'];
    keyboardType?: React.ComponentProps<typeof TextInput>['keyboardType'];
    multiline?: React.ComponentProps<typeof TextInput>['multiline'];
    autoCapitalize?: React.ComponentProps<typeof TextInput>['autoCapitalize'];
    autoComplete?: React.ComponentProps<typeof TextInput>['autoComplete'];
    secureTextEntry?: React.ComponentProps<typeof TextInput>['secureTextEntry'];
    inputStyle?: React.ComponentProps<typeof View>['style'];
}

export default function InputField({
    value,
    label,
    onBlur,
    onValid,
    setContent,
    errorMessage,
    placeholder,
    keyboardType,
    secureTextEntry,
    multiline,
    autoCapitalize,
    autoComplete,
    inputStyle,
}: Props) {
    const [touched, setTouched] = React.useState(false);
    const onChangeText = (text: string) => {
        setTouched(true);
        text === '' ? onValid(false) : onValid(true);
        setContent(text);
    };

    return (
        <View>
            <View style={[styles.container, inputStyle]}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={() => setTouched(true)}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    autoCapitalize={autoCapitalize}
                    autoComplete={autoComplete}
                    secureTextEntry={secureTextEntry}
                    style={styles.textValue}
                ></TextInput>
            </View>
            {/* Error message */}
            {touched ? (
                !onValid ? (
                    <SafeAreaView style={styles.errorContainer}>
                        <MaterialIcons
                            name="error"
                            size={17}
                            color="red"
                            style={styles.errorIcon}
                        />
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    </SafeAreaView>
                ) : null
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 25,
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
        // color: '#1B463C',
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
    textValue: {
        fontFamily: 'TT-Commons-Regular',
        fontSize: 16,
        letterSpacing: 1,
        marginTop: 1,
    },
    errorContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginHorizontal: 50,
    },
    errorMessage: {
        fontFamily: 'TT-Commons-Regular',
        fontSize: 14,
        letterSpacing: 1,
        marginTop: 1,
        color: 'red',
    },
    errorIcon: {
        marginRight: 5,
    },
});
