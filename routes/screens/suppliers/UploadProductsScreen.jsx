import React from 'react';
import generalStyles from '../../../styles/General';
import { unitOptions } from '../../../utils/variables';
import dictionary from '../../../dictionary/general.json';
// Components
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Virtuali,
} from 'react-native';
import InputField from '../../../components/InputField';
import InputFieldSelect from '../../../components/InputFieldSelect';
import SelectDropDown from '../../../components/SelectDropDown';
import Button from '../../../components/actions/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { RadioButton } from 'react-native-paper';
import ThermoIcon from '../../../components/svgs/ThermoIcon';
import OrganicIcon from '../../../components/svgs/OrganicIcon';
import FrozenIcon from '../../../components/svgs/FrozenIcon';
// API
import axios from 'axios';

export default function UploadProductsScreen(props) {
    const content = dictionary?.tags;
    const userId = props.route?.params?.loggedInUser?._id;
    const [selectedUnit, setSelectedUnit] = React.useState(unitOptions);
    const onSelectedUnit = (item) => {
        setSelectedUnit(item);
    };
    const [value, setValue] = React.useState('');

    const { control, handleSubmit } = useForm({
        defaultValues: {
            productTitle: '',
            producerId: '',
            productDesc: '',
            amount: '',
            weight: '',
            bulkPrice: '',
            singlePrice: '',
            category: '',
        },
    });
    const onSubmit = (data) => {};

    React.useEffect(() => {
        console.log('create screen', userId);
    });

    return (
        <SafeAreaView style={styles.container}>
            {/* <ScrollView> */}
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
                    }) => (
                        <SelectDropDown
                            label="Enhed"
                            data={unitOptions}
                            onSelect={onSelectedUnit}
                            selectedItem={selectedUnit}
                        />
                    )}
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
                            label="pris /enhed"
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
            <Controller
                name="categoryOption"
                control={control}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => (
                    <InputFieldSelect
                        label="Kategorie"
                        placeholder="Vælge en kategorie"
                    />
                )}
            />
            <RadioButton.Group
                onValueChange={(newValue) => setValue(newValue)}
                value={value}
            >
                <Text style={styles.fieldLabel}>Tags</Text>
                <View style={styles.radioButtonGroup}>
                    <View style={styles.tagOption}>
                        <ThermoIcon style={styles.icon} />
                        <RadioButton.Item
                            label={'    ' + content.isCold}
                            value="isCold"
                            status={
                                value === content?.customer
                                    ? 'checked'
                                    : 'unchecked'
                            }
                            color="#000000"
                            mode="android"
                            position="leading"
                            labelStyle={styles.radioButtonLabel}
                        />
                    </View>
                    <View style={styles.tagOption}>
                        <FrozenIcon style={styles.icon} />
                        <RadioButton.Item
                            label={'    ' + content.isFrozen}
                            status={
                                value === content?.producer
                                    ? 'checked'
                                    : 'unchecked'
                            }
                            value="isFrozen"
                            color="#000000"
                            labelStyle={styles.radioButtonLabel}
                            mode="android"
                            position="leading"
                        />
                    </View>
                    <View style={styles.tagOption}>
                        <OrganicIcon style={styles.icon} />
                        <RadioButton.Item
                            label={'    ' + content.isOrganic}
                            status={
                                value === content?.producer
                                    ? 'checked'
                                    : 'unchecked'
                            }
                            value="isOrganic"
                            color="#000000"
                            labelStyle={styles.radioButtonLabel}
                            mode="android"
                            position="leading"
                        />
                    </View>
                </View>
            </RadioButton.Group>

            <Button
                title="Opret"
                primary
                buttonStyle={[styles.buttons, styles.createButton]}
            />
            {/* </ScrollView> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        ...generalStyles.container,
        flexDirection: 'column',
        marginTop: 20,
        width: '95%',
        overflow: 'scroll',
    },
    fieldset: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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
    uploadButton: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%',
    },
    radioButtonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        // flex: 1,
    },
    radioButtonLabel: {
        fontFamily: 'TT-Commons-DemiBold',
        fontSize: 14,
        letterSpacing: 1,
        textTransform: 'capitalize',
    },
    tagOption: { flexDirection: 'row', alignItems: 'center', width: '50%' },
    icon: { position: 'absolute', left: 50 },
    createButton: { width: '50%' },
});
