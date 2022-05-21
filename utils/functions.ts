import * as SecureStore from 'expo-secure-store';

export const objectToString = (object: Object) => JSON.stringify(object);

export async function saveData(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}
