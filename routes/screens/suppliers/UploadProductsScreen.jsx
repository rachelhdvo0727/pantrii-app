import React from 'react';
import generalStyles from '../../../styles/General';
// Components
import { StyleSheet, Text, View } from 'react-native';
import InputField from '../../../components/InputField';
import Button from '../../../components/actions/Button';
import SelectDropDown from '../../../components/SelectDropDown';
import { MaterialIcons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
// API
import axios from 'axios';

export default function UploadProductsScreen() {
    const [value, setValue] = React.useState('');

    const { control, handleSubmit } = useForm({
        defaultValues: {
            productTitle: '',
            productDesc: '',
            amount: '',
            weight: '',
            bulkPrice: '',
            singlePrice: '',
            category: '',
        },
    });
    const onSubmit = (data) => {};

    return (
        <View style={styles.container}>
            <Controller
                name="productTitle"
                control={control}
                rules={{
                    required: 'Produktnavn er påkrævet',
                }}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => (
                    <InputField
                        label="produktnavn"
                        placeholder="Eksempel"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoComplete={false}
                        autoCapitalize="words"
                        errorMessage={error}
                    />
                )}
            />
            <View style={styles.fieldset}>
                <Controller
                    name="amount"
                    control={control}
                    rules={{
                        required: 'Produktnavn er påkrævet',
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="antal"
                            inputStyle={styles.fieldsetCell}
                            placeholder="Eksempel"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoComplete={false}
                            autoCapitalize="words"
                            errorMessage={error}
                        />
                    )}
                />
                <Controller
                    name="weight"
                    control={control}
                    rules={{
                        required: 'Produktnavn er påkrævet',
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="vægt"
                            inputStyle={styles.fieldsetCell}
                            placeholder="Eksempel"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoComplete={false}
                            autoCapitalize="words"
                            errorMessage={error}
                        />
                    )}
                />
                <Controller
                    name="unitOption"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => <SelectDropDown label="Enhed" />}
                />
            </View>
            <View style={styles.fieldset}>
                <Controller
                    name="bulkPrice"
                    control={control}
                    rules={{
                        required: 'Produktnavn er påkrævet',
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="pris /kolli"
                            inputStyle={styles.fieldsetCell}
                            placeholder="Eksempel"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoComplete={false}
                            autoCapitalize="words"
                            errorMessage={error}
                        />
                    )}
                />
                <Controller
                    name="singlePrice"
                    control={control}
                    rules={{
                        required: 'Produktnavn er påkrævet',
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="pris /stk."
                            inputStyle={styles.fieldsetCell}
                            placeholder="Eksempel"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoComplete={false}
                            autoCapitalize="words"
                            errorMessage={error}
                        />
                    )}
                />
            </View>
            <Button
                title="Upload billeder fra arkiv"
                secondary
                buttonStyle={[styles.buttons, styles.uploadButton]}
                children={
                    <MaterialIcons
                        name="photo-library"
                        size={18}
                        color="#FFFFFF"
                    />
                }
            />
            <Controller
                name="productDesc"
                control={control}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => (
                    <InputField
                        label="Beskrivelse"
                        placeholder="Eksempel"
                        multiline
                        numberOfLines={10}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoComplete={false}
                        autoCapitalize="words"
                        errorMessage={error}
                        inputStyle={styles.productDesc}
                    />
                )}
            />
            <Button
                title="Opret"
                primary
                buttonStyle={[styles.buttons, styles.createButton]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,
        flexDirection: 'column',
        marginVertical: 20,
    },
    fieldset: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    fieldsetCell: { flex: 1 },
    productDesc: {},
    buttons: { alignSelf: 'center', marginVertical: 10 },
    uploadButton: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%',
    },
    createButton: { width: '50%' },
});
