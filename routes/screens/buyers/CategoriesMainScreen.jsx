import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import generalStyles from '../../../styles/General';
import CategoryCard from '../../../components/buyers/CategoryCard';
import dictionary from '../../../dictionary/categories';
import { categoryImages } from '../../../dictionary/images';
import { useNavigation } from '@react-navigation/native';
import Spinner from '../../../components/Spinner';
// API
import { getCategories } from '../../../redux/slice/categories';
import { useSelector, useDispatch } from 'react-redux';
// Translations
import { useTranslation } from 'react-i18next';

export default function CategoriesMainScreen() {
    const content = dictionary?.categories; // DA dictionary
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);

    React.useEffect(() => {
        // console.log(categories);
        // Fetch all categories
        dispatch(getCategories(true));
    }, [categories]);

    return (
        <SafeAreaView style={[generalStyles.container]}>
            {categories.length === 0 && <Spinner />}
            <FlatList
                data={categories}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                    <CategoryCard
                        title={t('categories:categories.name.' + item?.name)}
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
