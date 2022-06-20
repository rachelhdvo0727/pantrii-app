import React from 'react';
import generalStyles from '../../styles/General';
import { useTranslation } from 'react-i18next';
// Components
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ViewStyle,
    StyleProp,
} from 'react-native';

export interface Props {
    quickDisplay: boolean;
    style?: StyleProp<ViewStyle>;
    defaultLang?: string | any;
}
const languages = [
    { code: 'en', label: 'English' },
    { code: 'dk', label: 'Dansk' },
];

const LanguageSelector = ({ quickDisplay, style }: Props) => {
    const { t, i18n } = useTranslation('en');
    const selectedLanguageCode = i18n.language;

    const setLanguage = (code: string | any) => {
        return i18n.changeLanguage(code);
    };

    return (
        <View style={[styles.container, style]}>
            {!quickDisplay ? (
                <Text style={styles.title}>
                    {t('common:settings.languageSelector')}:&emsp;
                </Text>
            ) : null}
            <View
                style={[
                    styles.options,
                    // { alignItems: quickDisplay ? 'center' : 'flex-start' },
                ]}
            >
                {languages.map((language) => {
                    const selectedLanguage =
                        language.code === selectedLanguageCode;

                    return (
                        <Pressable
                            key={language.code}
                            style={styles.buttonContainer}
                            disabled={selectedLanguage}
                            onPress={() => setLanguage(language.code)}
                        >
                            <Text
                                style={[
                                    selectedLanguage
                                        ? styles.selectedText
                                        : styles.text,
                                    quickDisplay && {
                                        textTransform: 'uppercase',
                                    },
                                ]}
                            >
                                {quickDisplay ? language.code : language.label}
                                &emsp;
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

export default LanguageSelector;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
    },
    options: {
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'flex-start',
    },
    title: {
        ...generalStyles.mediumText,
        marginVertical: 10,
    },
    buttonContainer: {},
    text: {
        ...generalStyles.boldText,
    },
    selectedText: {
        ...generalStyles.boldText,
        color: 'tomato',
        paddingVertical: 4,
    },
});
