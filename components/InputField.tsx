import React from 'react';
import generalStyles from '../styles/General';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { capitalize } from '../utils/functions';

export interface Props {
    value: React.ComponentProps<typeof TextInput>['value'];
    label: string;
    onBlur?: React.ComponentProps<typeof TextInput>['onBlur'];
    onFocus?: React.ComponentProps<typeof TextInput>['onFocus'];
    onChangeText?: React.ComponentProps<typeof TextInput>['onChangeText'];
    errorMessage?: { message: string };
    placeholder: React.ComponentProps<typeof TextInput>['placeholder'];
    keyboardType?: React.ComponentProps<typeof TextInput>['keyboardType'];
    multiline?: React.ComponentProps<typeof TextInput>['multiline'];
    numberOfLines?: React.ComponentProps<typeof TextInput>['numberOfLines'];
    autoCapitalize?: React.ComponentProps<typeof TextInput>['autoCapitalize'];
    autoComplete?: React.ComponentProps<typeof TextInput>['autoComplete'];
    secureTextEntry?: React.ComponentProps<typeof TextInput>['secureTextEntry'];
    isPasswordInput?: boolean;
    maxLength?: React.ComponentProps<typeof TextInput>['maxLength'];
    inputStyle?: React.ComponentProps<typeof View>['style'];
    hasDefaultValue?: boolean;
    focused?: boolean;
    withWarning?: boolean;
    warningText?: React.ComponentProps<typeof Text>['children'];
    warningTitle?: React.ComponentProps<typeof Text>['children'];
}

export default function InputField({
    value,
    label,
    onBlur,
    onFocus,
    onChangeText,
    errorMessage,
    placeholder,
    keyboardType,
    maxLength,
    secureTextEntry,
    multiline,
    autoCapitalize,
    autoComplete,
    inputStyle,
    hasDefaultValue,
    focused,
    withWarning,
    warningText,
    warningTitle,
}: Props) {
    return (
        <View
            style={[
                inputStyle,
                styles.container,
                multiline && { height: Dimensions.get('window').height / 5.5 },
                withWarning &&
                    multiline && {
                        height: Dimensions.get('window').height / 4.3,
                    },
            ]}
        >
            <View style={styles.textInputContainer}>
                <Text style={styles.label}>{capitalize(label)}</Text>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    autoCapitalize={autoCapitalize}
                    autoComplete={autoComplete}
                    secureTextEntry={secureTextEntry}
                    maxLength={maxLength}
                    blurOnSubmit
                    underlineColorAndroid="transparent"
                    style={[
                        styles.textValue,
                        hasDefaultValue && styles.hasDefaultValue,
                        focused && { opacity: 1 },
                        multiline && styles.multilineStyle,
                    ]}
                    onFocus={onFocus}
                ></TextInput>
            </View>
            {withWarning && (
                <Text style={styles.warning}>
                    <Text style={styles.warningTitle}>{warningTitle}</Text>
                    <Text style={styles.warningText}>{warningText}</Text>
                </Text>
            )}
            {/* Error message */}
            {errorMessage && errorMessage?.message !== '' ? (
                <View style={styles.errorContainer}>
                    <MaterialIcons
                        name="error"
                        size={17}
                        color="red"
                        style={styles.errorIcon}
                    />
                    <Text style={styles.errorMessage}>
                        {errorMessage?.message}
                    </Text>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // height: Dimensions.get('window').height / 10,
    },
    textInputContainer: {
        marginVertical: 20,
        marginBottom: 5,
        marginHorizontal: 18,
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: '#EFF2EE',

        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
    },
    label: {
        fontFamily: 'TT-Commons-DemiBold',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 1,
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
        ...generalStyles.paragraphText,
        fontSize: 15.5,
        marginTop: 1,
    },
    hasDefaultValue: { opacity: 0.2 },
    multilineStyle: {
        height: 85,
    },
    errorContainer: {
        flexDirection: 'row',

        alignContent: 'center',
        marginHorizontal: 30,
        marginBottom: 15,
        paddingHorizontal: 14,
    },
    errorMessage: {
<<<<<<< HEAD
        ...generalStyles.paragraphText,
        fontSize: 13,
=======
        fontFamily: 'TT-Commons-Regular',
        fontSize: 13,
        letterSpacing: 1,
>>>>>>> improvements
        color: '#FF0000',
    },
    errorIcon: {
        marginRight: 5,
    },
    warning: {
        alignSelf: 'center',
        paddingHorizontal: 20,
    },
    warningTitle: {
        ...generalStyles.mediumText,
        color: '#CBA51E',
    },
    warningText: {
        ...generalStyles.paragraphText,
        fontSize: 13,
        color: '#CBA51E',
    },
});
