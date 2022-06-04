import React from 'react';
import generalStyles from '../styles/General';
// Components
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    SafeAreaView,
    VirtualizedList,
    FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { capitalize } from '@material-ui/core';

export interface Option {
    label: string;
    value: string;
}

export interface Props {
    label: string;
    placeholder?: string;
    data: Array<Option>;
    onSelect(item: Option): void;
    selectedItem?: Option;
}

export default function InputFieldSelect({
    label,
    placeholder,
    data,
    onSelect,
    selectedItem,
}: Props) {
    const getItem = (data: Array<any>, index: number) => ({
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`,
    });

    const getItemCount = (data: Array<any>) => data?.length;

    const [visible, setVisible] = React.useState(false);
    const [seletedOption, setSelectedItem] = React.useState(selectedItem);

    const toggleDropdown = () => {
        setVisible(!visible);
    };
    const handleOnSelect = (item: Option) => {
        onSelect(item);
        setVisible(false);
        setSelectedItem(item);
    };

    const renderItem = (item: Option) => (
        <TouchableOpacity
            style={[
                styles.dropdownItem,
                item === data.slice(-1)[0] && styles.lastItem,
            ]}
            onPress={() => handleOnSelect(item)}
        >
            <Text
                style={[
                    styles.dropdownText,
                    seletedOption?.label === item?.label &&
                        styles.currentOption,
                ]}
            >
                {item?.label}&emsp;&emsp;
            </Text>
        </TouchableOpacity>
    );
    const renderDropdown = () => {
        if (visible) {
            return (
                <SafeAreaView style={styles.dropdown}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </SafeAreaView>
            );
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={toggleDropdown}>
            {renderDropdown()}
            <Text style={[styles.label]}>{capitalize(label)}</Text>
            <View style={styles.inputInnerWrapper}>
                <Text style={[styles.valueText]}>
                    {seletedOption?.label ? seletedOption?.label : placeholder}
                </Text>
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
        marginVertical: 10,
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
        marginTop: 2,
        opacity: 0.2,
    },
    inputInnerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dropdown: {
        zIndex: 9999,
        position: 'absolute',
        backgroundColor: '#FFFFFF',

        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,

        top: 28,
        right: 0,
    },
    dropdownItem: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        paddingVertical: 3.5,
        paddingHorizontal: 10,
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    dropdownText: { ...generalStyles.paragraphText, fontSize: 12 },
    currentOption: {
        opacity: 1,
    },
});
