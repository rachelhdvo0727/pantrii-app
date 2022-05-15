import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Dimensions,
} from 'react-native';
import generalStyles from '../../../styles/General';
import axios from 'axios';
import { mongoDbConfig } from '../../../utils/api';
import CategoryCard from '../../../components/buyers/CategoryCard';
import dictionary from '../../../dummy-data/dictionary';
import { categoryImages } from '../../../dummy-data/images';

export default function CategoriesScreen() {
    const content = dictionary?.categories; // DA dictionary

    const [categories, setCategories] = React.useState([]);
    React.useEffect(() => {
        // Fetch all categories from MongoDB api
        axios(mongoDbConfig('post', 'categories'))
            .then(function (response) {
                setCategories(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // Added allProduct object at the start of array
    const allProducts = {
        _id: '0',
        name: 'allProducts',
        imageSrc: 'all-products.png',
    };
    if (categories?.length > 0)
        categories
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .unshift(allProducts);

    return (
        <SafeAreaView style={[generalStyles.container]}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                    <CategoryCard
                        title={content.name[item?.name]}
                        imageSrc={categoryImages[item?.imageSrc]}
                        cardStyle={styles.cardContainer}
                    />
                )}
                numColumns={2}
                scrollEnabled={true}
                contentContainerStyle={[
                    generalStyles.homeContainer,
                    styles.listContainer,
                ]}
                columnWrapperStyle={styles.columnWrapperStyle}
            ></FlatList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        alignContent: 'center',
        alignItems: 'center',
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
    },
    cardContainer: {
        paddingHorizontal: 8,
        width: Dimensions.get('window').width / 2,
    },
});
