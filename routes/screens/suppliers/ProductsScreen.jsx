import React from 'react';
import generalStyles from '../../../styles/General';
import { sortOptions } from '../../../utils/variables';
import dictionary from '../../../dictionary/general.json';
// Components
import { ScrollView, StyleSheet, View } from 'react-native';
import SelectDropDown from '../../../components/SelectDropDown';
import IconButton from '../../../components/actions/IconButton';

export default function ProductsSuppliersScreen() {
    const content = dictionary?.inventoryStatus;
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
            <View style={styles.filtersContainer}>
                <IconButton
                    outlined
                    title={content?.inStock}
                    iconButtonStyle={
                        (styles.filterButtons, { borderColor: '#9DB76E' })
                    }
                    titleStyle={{ color: '#9DB76E' }}
                />
                <IconButton
                    outlined
                    title={content?.lowOnStock}
                    iconButtonStyle={{ borderColor: '#EA6F2D' }}
                    titleStyle={{ color: '#EA6F2D' }}
                />
                <IconButton
                    outlined
                    title={content?.soldOut}
                    iconButtonStyle={{ borderColor: '#FF0000' }}
                    titleStyle={{ color: '#FF0000' }}
                />
            </View>
            <ScrollView></ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,
    },
    filtersContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
    },
    filterButtons: {
        // marginVertical: 0,
    },
});
