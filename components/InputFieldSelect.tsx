import React from 'react';
import generalStyles from '../styles/General';
import categoryDic from '../dictionary/categories.json';
import { capitalize } from '../utils/functions';
// Components
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export interface Option {
    // _id: string;
    // name: string;
    // imageSrc?: string;
    label: string;
    value: string;
}

export interface Props {
    style?: React.ComponentProps<typeof TouchableOpacity>['style'];
    label: string;
    neutralLabel: string;
    placeholder?: string;
    data: Array<Option>;
    onSelect(item: Option): void;
    onFocus?: React.ComponentProps<typeof TouchableOpacity>['onFocus'];
    focused?: boolean;
    selectedItem?: Option;
    hasDefaultValue?: boolean;
}

export default function InputFieldSelect({
    label,
    placeholder,
    data,
    onSelect,
    onFocus,
    focused,
    hasDefaultValue,
    selectedItem,
    style,
}: Props) {
    const [visible, setVisible] = React.useState(false);
    const [selectedOption, setSelectedItem] = React.useState(selectedItem);
    const [isValueChanged, setIsValueChanged] = React.useState(false);

    const toggleDropdown = () => {
        setVisible(!visible);
        setIsValueChanged(true);
    };
    const handleOnSelect = (item: Option) => {
        onSelect(item);
        setVisible(false);
        setSelectedItem(item);
        setIsValueChanged(true);
    };

    const renderItem = (item: Option, index: number | string) => (
        <TouchableOpacity
            key={index}
            style={[
                styles.dropdownItem,
                item === data.slice(-1)[0] && styles.lastItem,
            ]}
            onPress={() => handleOnSelect(item)}
        >
            <Text
                style={[
                    styles.dropdownText,
                    selectedOption?.label === item?.label &&
                        styles.currentOption,
                ]}
            >
                {capitalize(item?.label)}
            </Text>
        </TouchableOpacity>
    );
    const renderDropdown = () => {
        if (visible) {
            return (
                <SafeAreaView>
                    <ScrollView style={styles.dropdown}>
                        {data?.map((item, index) => renderItem(item, index))}
                    </ScrollView>
                </SafeAreaView>
            );
        }
    };

    return (
        <TouchableOpacity
            style={[styles.container, focused && { opacity: 1 }, style]}
            onPress={toggleDropdown}
            onFocus={onFocus}
        >
            {renderDropdown()}
            <Text style={[styles.label]}>{capitalize(label)}</Text>
            <View style={styles.inputInnerWrapper}>
                {selectedOption?.label ? (
                    <Text
                        style={[
                            styles.valueText,
                            hasDefaultValue && styles.hasDefaultValue,
                            selectedOption?.label === selectedOption?.label &&
                                isValueChanged &&
                                styles.currentOption,
                        ]}
                    >
                        {capitalize(selectedOption?.label)}
                    </Text>
                ) : (
                    <Text
                        style={[
                            styles.placeholder,
                            hasDefaultValue && styles.hasDefaultValue,
                        ]}
                    >
                        {placeholder}
                    </Text>
                )}

                <MaterialIcons
                    name={visible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={20}
                    color="black"
                    style={styles.arrowIcon}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginHorizontal: 18,
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: '#EFF2EE',

        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        zIndex: 2,
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
    arrowIcon: { alignSelf: 'flex-end', position: 'relative', right: -5 },
    valueText: {
        fontFamily: 'TT-Commons-Regular',
        fontSize: 16,
        letterSpacing: 1,
        marginTop: 2.5,
    },
    placeholder: {
        fontFamily: 'TT-Commons-Regular',
        fontSize: 16,
        letterSpacing: 1,
        marginTop: 2,
        opacity: 0.2,
    },
    inputInnerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dropdown: {
        position: 'absolute',
        top: 35,
        right: 0,
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
    },
    dropdownItem: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    dropdownText: { ...generalStyles.paragraphText, fontSize: 16 },
    currentOption: {
        fontFamily: 'TT-Commons-DemiBold',
        opacity: 1,
    },
    hasDefaultValue: { opacity: 0.2 },
});
