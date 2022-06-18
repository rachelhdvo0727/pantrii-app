import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ViewStyle,
    StyleProp,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export interface Props {
    style?: StyleProp<ViewStyle>;
    value: React.ComponentProps<typeof TextInput>['value'];
    onChangeText: React.ComponentProps<typeof TextInput>['onChangeText'];
}

const SearchBar = ({ style, value, onChangeText }: Props) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const onFocus = () => {
        setIsFocused(!isFocused);
    };

    return (
        <View style={[style, styles.container]}>
            <View
                style={[
                    styles.wrapper,
                    isFocused && {
                        justifyContent: 'flex-start',
                    },
                ]}
            >
                <FontAwesome
                    name="search"
                    size={16}
                    color="#A1A1A1"
                    style={styles.searchIcon}
                />

                <TextInput
                    onChangeText={onChangeText}
                    value={value}
                    underlineColorAndroid="transparent"
                    placeholder="Søg"
                    style={[styles.textInput, isFocused && { flex: 1 }]}
                    onFocus={onFocus}
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
    },
    searchIcon: {
        paddingRight: 8,
    },
    textInput: {
        //   width: '100%',
        paddingRight: 10,
    },
});
