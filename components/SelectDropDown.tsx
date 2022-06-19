import React from 'react';
import generalStyles from '../styles/General';
// Components
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { capitalize } from '../utils/functions';

export interface Option {
    label: string;
    value: string;
}

export interface Props {
    label: string;
    data: Array<Option>;
    onSelect(item: Option): void;
    selectedItem?: Option;
}

export default function SelectDropDown({
    label,
    data,
    onSelect,
    selectedItem,
}: Props) {
    const [visible, setVisible] = React.useState(false);
    const [selectedOption, setSelectedItem] = React.useState(selectedItem);

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
                    selectedOption?.label === item?.label && styles.currentSort,
                ]}
            >
                {capitalize(item?.label)}&emsp;&emsp;
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
            <Text style={[styles.buttonText]}>{capitalize(label)}</Text>
            {selectedItem ? (
                <Text
                    style={[
                        styles.buttonText,
                        selectedOption?.label !== '' && styles.currentSort,
                    ]}
                >
                    {selectedOption?.label ? ': ' + selectedOption?.label : ''}
                </Text>
            ) : null}

            <MaterialIcons
                name={visible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={17}
                color="black"
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 2,
        backgroundColor: '#EFF2EE',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 10,

        alignSelf: 'flex-end',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        ...generalStyles.paragraphText,
        fontSize: 12,
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',

        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,

        top: 38,
        right: 0,
    },
    dropdownItem: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    dropdownText: { ...generalStyles.paragraphText, fontSize: 12 },
    currentSort: {
        fontFamily: 'TT-Commons-DemiBold',
    },
});
