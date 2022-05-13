import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import generalStyles from '../../styles/General.js';
import CategoryCard from '../../components/buyers/CategoryCard';
import CategoryData from '../../dummy-data/CategoriesData.js';

export default function CategoriesScreen() {
    return (
        <View style={generalStyles.container}>
            <FlatList
                columnWrapperStyle={generalStyles.spaceBetween}
                numColumns={2}
                data={CategoryData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CategoryCard title={item.title} imageSrc={item.imgUrl} />
                )}
            ></FlatList>
        </View>
    );
}
