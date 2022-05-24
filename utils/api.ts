import User from '../models/User';
const CryptoJS = require('crypto-js');
import * as Crypto from 'expo-crypto';

// GENERAL
const mongoDbData = (collection: string) => {
    return JSON.stringify({
        collection: collection,
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
    });
};

export const mongoDbConfig = (collection: string) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/beta/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'Api-key':
                '2GZQT0hpTykckgCnk5ajds55663JisDpmQg3r9gy94YhgO9rDay9NeEzClKm6jcc',
        },
        data: mongoDbData(collection),
    };
};

// SIGN UP
const newUserAccountData = (document: User) => {
    return JSON.stringify({
        collection: 'users',
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        document: {
            firstName: document?.firstName,
            lastName: document?.lastName,
            email: document?.email,
            password: CryptoJS.SHA3(document?.password).toString(
                CryptoJS.enc.Hex,
            ),
            phone: document?.phone,
            address: {
                line1: document?.address.line1,
                line2: document?.address.line2,
                zipCode: document?.address.zipCode,
                city: document?.address.city,
                country: document?.address.country,
            },
        },
    });
};

export const createUserAccount = (document: User) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/beta/action/insertOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'Api-key':
                '2GZQT0hpTykckgCnk5ajds55663JisDpmQg3r9gy94YhgO9rDay9NeEzClKm6jcc',
        },
        data: newUserAccountData(document),
    };
};

// LOG IN
const userData = (data: User) => {
    return JSON.stringify({
        collection: 'users',
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        filter: {
            email: data?.email,
            password: data?.password,
        },
    });
};

export const findUser = (data: User) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/beta/action/findOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'Api-key':
                '2GZQT0hpTykckgCnk5ajds55663JisDpmQg3r9gy94YhgO9rDay9NeEzClKm6jcc',
        },
        data: userData(data),
    };
};

// LATEST PRODUCTS - limit 10
const fetchLastestData = (collection: string) => {
    return JSON.stringify({
        collection: collection,
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        limit: 10,
        sort: {
            dateTime: -1,
        },
    });
};

export const fetchLastestProducts = (method: string, collection: string) => {
    return {
        method: method,
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/beta/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'Api-key':
                '2GZQT0hpTykckgCnk5ajds55663JisDpmQg3r9gy94YhgO9rDay9NeEzClKm6jcc',
        },
        data: fetchLastestData(collection),
    };
};

// FEATURED DATA
const fetchFeaturedData = (collection: string, isFiltered: boolean) => {
    return JSON.stringify({
        collection: collection,
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        filter: { isFeatured: isFiltered },
    });
};

export const fetchFeaturedProducts = (
    method: string,
    collection: string,
    isFiltered: boolean,
) => {
    return {
        method: method,
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/beta/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'Api-key':
                '2GZQT0hpTykckgCnk5ajds55663JisDpmQg3r9gy94YhgO9rDay9NeEzClKm6jcc',
        },
        data: fetchFeaturedData(collection, isFiltered),
    };
};
