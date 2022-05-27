import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import generalStyles from '../../../styles/General';
import { mongoDbConfig } from '../../../utils/api';
import CategoryCard from '../../../components/buyers/CategoryCard';
import dictionary from '../../../dictionary/categories';
import { categoryImages } from '../../../dictionary/images';
import { useNavigation } from '@react-navigation/native';
// API
import axios from 'axios';

export default function CategoriesScreen() {
    const content = dictionary?.categories; // DA dictionary
    const navigation = useNavigation();

    const [categories, setCategories] = React.useState([]);
    React.useEffect(() => {
        // Fetch all categories from MongoDB api
        axios(mongoDbConfig('categories'))
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
                        onPress={() => {
                            navigation.navigate('CategoryScreen', {
                                categories: categories,
                                category: item,
                            });
                        }}
                    />
                )}
                numColumns={2}
                scrollEnabled={true}
                contentContainerStyle={[styles.contentContainerStyle]}
                columnWrapperStyle={styles.columnWrapperStyle}
            ></FlatList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 15,
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
    },
    cardContainer: {
        paddingHorizontal: 8,
        width: Dimensions.get('window').width / 2,
    },
});
