import React from 'react';
import generalStyles from '../../../styles/General';
import { categoriesOptions } from '../../../utils/variables';
import dictionary from '../../../dictionary/general.json';
// Components
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import InputField from '../../../components/InputField';
import InputFieldSelect from '../../../components/InputFieldSelect';
import Button from '../../../components/actions/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { RadioButton, Checkbox } from 'react-native-paper';
import ThermoIcon from '../../../components/svgs/ThermoIcon';
import OrganicIcon from '../../../components/svgs/OrganicIcon';
import FrozenIcon from '../../../components/svgs/FrozenIcon';
// API & Redux
import axios from 'axios';
import { createProduct } from '../../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/slice/categories';
import { createProductForProducer } from '../../../redux/slice/product';

export default function UploadProductsScreen(props) {
    const dispatch = useDispatch();
    const content = dictionary;
    const { categories } = useSelector((state) => state?.categories);
    const { user } = useSelector((state) => state.user);
    const loggedInUser = props?.route?.params.loggedInUser;

    const [selectedCategory, setSelectedCategory] = React.useState();
    const onSelectCategory = (item) => {
        setSelectedCategory(item);
    };

    const [checkedCold, setCheckedCold] = React.useState('');
    const [isCold, setIsCold] = React.useState(false);

    const [checkedFrozen, setCheckedFrozen] = React.useState('');
    const [isFrozen, setIsFrozen] = React.useState(false);

    const [checkedOrganic, setCheckOrganic] = React.useState('');
    const [isOrganic, setIsOrganic] = React.useState(false);

    React.useEffect(() => {
        dispatch(getCategories(false));
    }, []);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            productTitle: '',
            producerId: '',
            producerTitle: '',
            productDesc: '',
            productUnique: '',
            productStory: '',
            amountPerPack: '',
            amountInStock: '',
            weight: '',
            bulkPrice: '',
            singlePrice: '',
            categoryId: '',
            dateTime: new Date(),
            tags: ['', '', ''],
        },
    });

    const onSubmit = (data) => {
        // Find matched categoryId
        const category = categories?.find(
            (item) => item?.name === selectedCategory.value,
        );
        data.categoryId = category?._id;
        // Attach producerId
        data.producerId = loggedInUser?._id || user?._id;
        // Find productUnit
        data.productUnit = data.amountPerPack + ' x ' + data.weight;
        data.amountInStock = parseInt(data.amountInStock); // Change amountInStock to number
        data.tags = [checkedCold, checkedFrozen, checkedOrganic];
        delete data.amountPerPack;
        delete data.weight;

        dispatch(createProductForProducer(data));
        reset();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingVertical: 10 }}>
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
                            label="produktnavn *"
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
                    name="producerTitle"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="navn på brand"
                            placeholder="Eksempel"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoComplete={false}
                            errorMessage={error}
                        />
                    )}
                />
                <View style={styles.fieldset}>
                    <Controller
                        name="amountPerPack"
                        control={control}
                        rules={{
                            required:
                                'Venligst angiv antal af produkt i én pakke/enhed',
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { error },
                        }) => (
                            <InputField
                                label="antal *"
                                inputStyle={styles.fieldsetCell}
                                placeholder="eks. 10"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                autoComplete={false}
                                autoCapitalize="words"
                                errorMessage={error}
                            />
                        )}
                    />
                    <Text style={styles.multiplySign}>x</Text>
                    <Controller
                        name="weight"
                        control={control}
                        rules={{
                            required: 'Produktvægt er påkrævet',
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { error },
                        }) => (
                            <InputField
                                label="vægt *"
                                inputStyle={styles.fieldsetCell}
                                placeholder="eks. 10g"
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
                <View style={styles.fieldset}>
                    <Controller
                        name="bulkPrice"
                        control={control}
                        rules={{
                            required: 'Pris/kolli er påkrævet',
                            pattern: {
                                value: /^\d+$/,
                                message: 'Kun nummer',
                            },
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { error },
                        }) => (
                            <InputField
                                label="pris /kolli *"
                                inputStyle={styles.fieldsetCell}
                                placeholder="&emsp;&emsp;&emsp;&ensp;/kolli"
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
                            required: 'Pris/ enhed er påkrævet',
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { error },
                        }) => (
                            <InputField
                                label="pris /enhed *"
                                inputStyle={styles.fieldsetCell}
                                placeholder="&emsp;&emsp;&ensp;/enhed"
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
                <Controller
                    name="amountInStock"
                    control={control}
                    rules={{
                        required: 'Venligst angiv antal af produkt på lager',
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="hvor mange på lager? *"
                            inputStyle={styles.fieldsetCell}
                            placeholder="eks. 10"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoComplete={false}
                            autoCapitalize="words"
                            errorMessage={error}
                            keyboardType="numeric"
                        />
                    )}
                />
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
                <InputFieldSelect
                    label="kategorie *"
                    placeholder="Vælge en kategorie"
                    data={categoriesOptions?.sort((a, b) =>
                        a.label.normalize().localeCompare(b.label.normalize()),
                    )}
                    onSelect={onSelectCategory}
                    selectedItem={selectedCategory}
                />
                <Controller
                    name="productDesc"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="produktbeskrivelse"
                            placeholder="Eksempel"
                            multiline
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
                <Controller
                    name="productStory"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="produkthistorie"
                            placeholder="Eksempel"
                            multiline
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
                <Controller
                    name="productUnique"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="produktkendetegnelse"
                            placeholder="Eksempel"
                            multiline
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
                <Text style={styles.fieldLabel}>Tags</Text>
                <View style={styles.checkboxGroup}>
                    <View style={styles.tagOption}>
                        <ThermoIcon style={styles.icon} />
                        <Checkbox.Item
                            label={'    ' + content?.tags?.isCold}
                            value="cold"
                            status={isCold ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setIsCold(!isCold);
                                setCheckedCold('cold');
                            }}
                            color="#000000"
                            mode="android"
                            position="leading"
                            labelStyle={styles.checkBoxLabel}
                        />
                    </View>
                    <View style={styles.tagOption}>
                        <FrozenIcon style={styles.icon} />
                        <Checkbox.Item
                            label={'    ' + content?.tags?.isFrozen}
                            status={isFrozen ? 'checked' : 'unchecked'}
                            onPress={(value) => {
                                setIsFrozen(!isFrozen);
                                setCheckedFrozen('frozen');
                            }}
                            value="frozen"
                            color="#000000"
                            labelStyle={styles.checkBoxLabel}
                            mode="android"
                            position="leading"
                        />
                    </View>
                    <View style={styles.tagOption}>
                        <OrganicIcon style={styles.icon} />
                        <Checkbox.Item
                            label={'    ' + content?.tags?.isOrganic}
                            status={isOrganic ? 'checked' : 'unchecked'}
                            value="organic"
                            onPress={() => {
                                setIsOrganic(!isOrganic);
                                setCheckOrganic('organic');
                            }}
                            color="#000000"
                            labelStyle={styles.checkBoxLabel}
                            mode="android"
                            position="leading"
                        />
                    </View>
                </View>
                <Button
                    title="Opret"
                    primary
                    buttonStyle={[styles.buttons, styles.createButton]}
                    onPress={handleSubmit(onSubmit)}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        ...generalStyles.container,
        flexDirection: 'column',
        paddingTop: 20,
        width: '95%',
    },
    fieldset: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    fieldsetCell: { flex: 1 },
    fieldLabel: {
        paddingHorizontal: 20,
        fontFamily: 'TT-Commons-DemiBold',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 1,
    },
    buttons: { alignSelf: 'center', marginVertical: 10 },
    multiplySign: { ...generalStyles.boldText },
    uploadButton: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%',
    },
    checkboxGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        // flex: 1,
    },
    checkBoxLabel: {
        fontFamily: 'TT-Commons-DemiBold',
        fontSize: 14,
        letterSpacing: 1,
        textTransform: 'capitalize',
    },
    tagOption: { flexDirection: 'row', alignItems: 'center', width: '50%' },
    icon: { position: 'absolute', left: 50 },
    createButton: { width: '50%' },
});
