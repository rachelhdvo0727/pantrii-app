import * as SecureStore from 'expo-secure-store';

export const objectToString = (object: Object) => JSON.stringify(object);

export async function saveData(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

// Capitalize 1st letter in a sentence/string
export const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Format string price to number
export const numberFormat = (total: string | any) =>
    new Intl.NumberFormat('en-DK', {
        style: 'currency',
        currency: 'DKK',
    }).format(total);
