import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import generalStyles from '../../../styles/General';
import axios from 'axios';

export default function CategoriesScreen() {
    const data = JSON.stringify({
        collection: 'categories',
        database: 'pantriiapp',
        dataSource: 'PantriiApp',
    });
    const config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/beta/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'Api-key':
                '2GZQT0hpTykckgCnk5ajds55663JisDpmQg3r9gy94YhgO9rDay9NeEzClKm6jcc',
        },
        data: data,
    };
    const [categories, setCategories] = React.useState(null);
    React.useEffect(() => {
        axios(config)
            .then(function (response) {
                setCategories(response.data?.documents);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    React.useEffect(() => {
        console?.log(categories);
    }, []);
    return (
        <View style={generalStyles.container}>
            <FlatList
                data={categories?.length > 0 ? categories : null}
                keyExtractor={(item) => item?._id?.$oid}
                renderItem={({ item }) => (
                    <View key={item?._id?.$oid}>
                    <Text>{item.name}</Text>
                    </View>
                )}
                scrollEnabled={true}
            ></FlatList>
        </View>
    );
}
