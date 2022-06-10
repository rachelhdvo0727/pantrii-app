import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import generalStyles from '../../../styles/General';
import CategoryCard from '../../../components/buyers/CategoryCard';
import dictionary from '../../../dictionary/categories';
import { categoryImages } from '../../../dictionary/images';
import { useNavigation } from '@react-navigation/native';
// API
import { getCategories } from '../../../redux/slice/categories';
import { useSelector, useDispatch } from 'react-redux';

export default function CategoriesMainScreen() {
    const content = dictionary?.categories; // DA dictionary
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);

    React.useEffect(() => {
        // Fetch all categories
        dispatch(getCategories(true));
    }, []);

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
