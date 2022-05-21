const CryptoJS = require('crypto-js');
import User from '../models/User';

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
