import React from 'react';
import generalStyles from '../styles/General';
// Components
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type option = { label: string; value: string };

export interface Props {
    label: string;
    data: Array<option>;
    onSelect(item: option): void;
    selectedItem?: option;
}

export default function SelectDropDown({
    label,
    data,
    onSelect,
    selectedItem,
}: Props) {
    const [visible, setVisible] = React.useState(false);
    const [seletedItem, setSelectedItem] = React.useState(selectedItem);

    const toggleDropdown = () => {
        setVisible(!visible);
    };
    const handleOnSelect = (item: option) => {
        onSelect(item);
        setVisible(false);
        setSelectedItem(item);
    };

    const renderItem = (item: option) => (
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
                    seletedItem?.label === item?.label && styles.currentSort,
                ]}
            >
                {item?.label}&emsp;&emsp;
            </Text>
        </TouchableOpacity>
    );
    const renderDropdown = () => {
        if (visible) {
            return (
                <View style={styles.dropdown}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            );
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={toggleDropdown}>
            {renderDropdown()}
            <Text style={[styles.buttonText]}>{label}</Text>
            {selectedItem ? (
                <Text
                    style={[
                        styles.buttonText,
                        seletedItem?.label !== '' && styles.currentSort,
                    ]}
                >
                    : {seletedItem?.label}
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
        backgroundColor: '#EFF2EE',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 3,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        zIndex: 1,

        alignSelf: 'flex-end',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        ...generalStyles.paragraphText,
        textTransform: 'capitalize',
        fontSize: 12,
    },
    dropdown: {
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
    currentSort: {
        fontFamily: 'TT-Commons-DemiBold',
    },
});
