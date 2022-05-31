import User from '../models/User';
const CryptoJS = require('crypto-js');
import * as Crypto from 'expo-crypto';

// GENERAL
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'Api-key':
        '2GZQT0hpTykckgCnk5ajds55663JisDpmQg3r9gy94YhgO9rDay9NeEzClKm6jcc',
};

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
        headers: headers,
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
        headers: headers,
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
        headers: headers,
        data: userData(data),
    };
};

// LATEST PRODUCTS - limit 10
const fetchLatestData = (collection: string) => {
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

export const fetchLatestProducts = (collection: string) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/beta/action/find',
        headers: headers,
        data: fetchLatestData(collection),
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
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/beta/action/find',
        headers: headers,
        data: fetchFeaturedData(collection, isFiltered),
    };
};

// PRODUCTS IN ONE CATEGORY
const categoryProductsData = (categoryId: string, sort?: number) => {
    return JSON.stringify({
        collection: 'products',
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        filter: {
            categoryId: {
                $oid: categoryId,
            },
        },
        sort: { completedAt: sort },
    });
};

export const fetchCategoryProducts = (categoryId: string, sort?: number) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/beta/action/find',
        headers: headers,
        data: categoryProductsData(categoryId, sort),
    };
};

// EDITING USER INFORMATION
const currentUser = (data: User, information: Object) => {
    console.log(information);
    return JSON.stringify({
        collection: 'users',
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        filter: {
            _id: { $oid: data._id },
        },
        update: {
            $set: {
                status: 'complete',
                completedAt: information,
            },
        },
    });
};

export const updateUserInformation = (data: User, information: Object) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/beta/action/updateOne',
        headers: headers,
        data: currentUser(data, information),
    };
};


