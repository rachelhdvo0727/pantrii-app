import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ViewStyle,
    StyleProp,
    Pressable,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// Translations
import { useTranslation } from 'react-i18next';

export interface Props {
    style?: StyleProp<ViewStyle>;
    value: React.ComponentProps<typeof TextInput>['value'];
    onChangeText: React.ComponentProps<typeof TextInput>['onChangeText'];
    onPressIn?: React.ComponentProps<typeof TextInput>['onPressIn'];
    onPressOut?: React.ComponentProps<typeof TextInput>['onPressOut'];
    onPress?: React.ComponentProps<typeof Pressable>['onPress'];
    autoFocus?: React.ComponentProps<typeof TextInput>['autoFocus'];
    focusedNewScreen?: boolean;
}

const SearchBar = ({
    style,
    value,
    onChangeText,
    onPressOut,
    onPressIn,
    autoFocus,
    onPress,
    focusedNewScreen,
}: Props) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const onFocus = () => {
        setIsFocused(!isFocused);
    };

    const { t } = useTranslation();

    return (
        <View style={[style, styles.container]}>
            <View
                style={[
                    styles.wrapper,
                    (isFocused || autoFocus) && {
                        justifyContent: 'flex-start',
                    },
                ]}
            >
                <Pressable onPress={onPress}>
                    <FontAwesome
                        name="search"
                        size={16}
                        color="#A1A1A1"
                        style={styles.searchIcon}
                    />
                </Pressable>

                <TextInput
                    onChangeText={onChangeText}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder={t('common:labels.search')}
                    style={[
                        styles.textInput,
                        (isFocused || autoFocus) && { flex: 1 },
                    ]}
                    onFocus={onFocus}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    autoFocus={autoFocus}
                />
            </View>
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    wrapper: {
        borderColor: '#A1A1A1',
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 15,
    },
    searchIcon: {
        paddingRight: 8,
    },
    textInput: {
        //   width: '100%',
        paddingRight: 10,
    },
});
