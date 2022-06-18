import User from '../models/User';
import Product from '../models/Product';
const CryptoJS = require('crypto-js');
import * as Crypto from 'expo-crypto';

// GENERAL
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key':
        '2GZQT0hpTykckgCnk5ajds55663JisDpmQg3r9gy94YhgO9rDay9NeEzClKm6jcc',
};

const mongoDbData = (collection: string) => {
    return JSON.stringify({
        collection: collection,
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        filter: {status: collection === 'products' ? 'approved': null}
    });
};

export const mongoDbConfig = (collection: string) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/v1/action/find',
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
            password: document?.password,
            phone: document?.phone,
            address: {
                line1: document?.address.line1,
                line2: document?.address.line2,
                zipCode: document?.address.zipCode,
                city: document?.address.city,
                country: document?.address.country,
            },
            roleId: {
                $oid: document?.roleId,
            },
        },
    });
};

export const createUserAccount = (document: User) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/v1/insertOne',
        headers: headers,
        data: newUserAccountData(document),
    };
};

// LOG IN
const userData = (data: User, byId?: boolean) => {
    // Fetch by using ID or by email and password
    return byId === false
        ? JSON.stringify({
              collection: 'users',
              dataSource: 'PantriiApp',
              database: 'pantriiapp',
              filter: {
                  email: data?.email,
                  password: data?.password,
              },
              projection: {
                  password: 0,
              },
          })
        : JSON.stringify({
              collection: 'users',
              dataSource: 'PantriiApp',
              database: 'pantriiapp',
              filter: {
                  _id: { $oid: data },
              },
              projection: {
                  password: 0,
              },
          });
};

export const findUser = (data: User, byId?: boolean) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/v1/action/findOne',
        headers: headers,
        data: userData(data, byId),
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
        filter: { status: 'approved' }
    });
};

export const fetchLatestProducts = (collection: string) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/v1/action/find',
        headers: headers,
        data: fetchLatestData(collection),
    };
};

// FEATURED DATA
const fetchFeaturedData = (collection: string) => {
    return JSON.stringify({
        collection: collection,
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        filter: { isFeatured: true, status: 'approved' },
    });
};

export const fetchFeaturedProducts = (collection: string) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/v1/action/find',
        headers: headers,
        data: fetchFeaturedData(collection),
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
            status: 'approved',
        },
        sort: { completedAt: sort },
    });
};

export const fetchCategoryProducts = (categoryId: string, sort?: number) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/v1/action/find',
        headers: headers,
        data: categoryProductsData(categoryId, sort),
    };
};

// EDITING USER INFORMATION
const currentUser = (data: User, information: Object) => {
    return JSON.stringify({
        collection: 'users',
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        filter: {
            _id: { $oid: data?._id },
        },
        update: {
            $set: information,
        },
    });
};

export const updateUserInformation = (data: User, information: Object) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/v1/action/updateOne',
        headers: headers,
        data: currentUser(data, information),
    };
};

const findUserRoleConfig = (data: User) => {
    return JSON.stringify({
        collection: 'roles',
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        filter: {
            roleId: data?.roleId,
        },
    });
};

export const findUserRole = (data: User) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/v1/action/findOne',
        headers: headers,
        data: findUserRoleConfig(data),
    };
};

const producerProductConfig = (config?: any) => {
    return JSON.stringify({
        collection: 'products',
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        filter: {
            producerId: {
                $oid: config?.producerId,
            },
        },
        limit: config?.limit,
    });
};

export const findProducerProducts = (config?: Object) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/v1/action/find',
        headers: headers,
        data: producerProductConfig(config),
    };
};

// Upload & Create a product

const productDataConfig = (data: Product) => {
    return JSON.stringify({
        collection: 'products',
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        document: {
            productTitle: data.productTitle,
            producerTitle: data.producerTitle,
            imageSrc: '',
            productDesc: data.productDesc,
            expiryDuration: data.expiryDuration,
            productStory: data.productStory,
            productUnique: data.productUnique,
            bulkPrice: data.bulkPrice,
            singlePrice: data.singlePrice,
            categoryId: {
                $oid: data.categoryId,
            },
            dateTime: {
                $date: data.dateTime,
            },
            productUnit: data.productUnit,
            amountInStock: data.amountInStock,
            producerId: {
                $oid: data.producerId,
            },
            tags: data.tags,
        },
    });
};

export const createProduct = (data: Product) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/v1/action/insertOne',
        headers: headers,
        data: productDataConfig(data),
    };
};

// FILTERING CAMPAIGNS

const fetchFilteredData = (collection: string, campaign: string) => {
    return JSON.stringify({
        collection: collection,
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        filter: {
            tags: {
                $all: [campaign] 
            },
            status: 'approved'
        },
    });
};

export const fetchFilteredProducts = (collection: string, campaign: string) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/v1/action/find',
        headers: headers,
        data: fetchFilteredData(collection, campaign),
    };
};

// FILTERING ADVERTISEMENTS

const fetchAdvertData = (collection: string, producerTitle: string) => {
    return JSON.stringify({
        collection: collection,
        dataSource: 'PantriiApp',
        database: 'pantriiapp',
        filter: {
           producerTitle: producerTitle,
           status: 'approved'
        },
    });
};

export const fetchAdvertProducts = (collection: string, producerTitle: string) => {
    return {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-oxvtw/endpoint/data/v1/action/find',
        headers: headers,
        data: fetchAdvertData(collection, producerTitle),
    };
};