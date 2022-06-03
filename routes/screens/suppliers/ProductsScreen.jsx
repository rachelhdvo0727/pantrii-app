import React from 'react';
import generalStyles from '../../../styles/General';
import { sortOptions } from '../../../utils/variables';
// Components
import { StyleSheet, Text, View } from 'react-native';
import SelectDropDown from '../../../components/SelectDropDown';

export default function ProductsSuppliersScreen() {
    const [selectedSort, setSelectedSort] = React.useState(sortOptions[0]);
    const onSelectedSort = (item) => {
        setSelectedSort(item);
    };
    return (
        <View style={generalStyles.container}>
            <SelectDropDown
                label="Sortér efter"
                data={sortOptions}
                onSelect={onSelectedSort}
                selectedItem={selectedSort}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,
    },
});
