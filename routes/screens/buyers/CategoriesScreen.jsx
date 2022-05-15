import React from 'react';
import {
    StyleSheet,
    Text,
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
    const content = dictionary?.categories;
    const [categories, setCategories] = React.useState([]);
    React.useEffect(() => {
        axios(mongoDbConfig('post', 'categories'))
            .then(function (response) {
                setCategories(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <SafeAreaView style={[generalStyles.container, styles.listContainer]}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                    <CategoryCard
                        title={content.name[item?.name]}
                        imageSrc={categoryImages[item?.imageSrc]}
                        cardStyle={styles.cardContainer}
                        imageStyle={styles.image}
                    />
                )}
                scrollEnabled={true}
                style={generalStyles.homeContainer}
                numColumns={2}
            ></FlatList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        alignItems: 'center',
    },
    cardContainer: {
        marginHorizontal: 5,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
    },
});
