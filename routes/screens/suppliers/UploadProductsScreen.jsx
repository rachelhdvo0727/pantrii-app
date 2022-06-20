import React from 'react';
import generalStyles from '../../../styles/General';
import { categoriesOptions } from '../../../utils/variables';
import dictionary from '../../../dictionary/general.json';
// Components
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import InputField from '../../../components/InputField';
import InputFieldSelect from '../../../components/InputFieldSelect';
import Button from '../../../components/actions/Button';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox } from 'react-native-paper';
import ThermoIcon from '../../../components/svgs/ThermoIcon';
import OrganicIcon from '../../../components/svgs/OrganicIcon';
import FrozenIcon from '../../../components/svgs/FrozenIcon';
import ApprovedModal from '../../../components/ApprovedModal';
// API & Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/slice/categories';
import { createProductForProducer } from '../../../redux/slice/product';
//Translations
import { useTranslation } from 'react-i18next';

export default function UploadProductsScreen(props) {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state?.categories);
    const { user } = useSelector((state) => state.user);
    const loggedInUser = props?.route?.params.loggedInUser;
    const { t, i18n } = useTranslation();
    const selectedLanguageCode = i18n.language;

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

    const [isModalVisible, setModalVisible] = React.useState(false);

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
            expiryDuration: '',
            status: '',
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
        data.status = 'pending';
        delete data.amountPerPack;
        delete data.weight;

        dispatch(createProductForProducer(data));
        reset();
        setModalVisible(!isModalVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            {isModalVisible && (
                <ApprovedModal
                    isModalVisible={isModalVisible}
                    waitingIcon
                    messageTitle={t('common:labels.waitingApproval')}
                    messageText={t('common:labels.waitingApprovalMsg')}
                    buttonTitle={t('common:labels.proceed')}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            )}
            <ScrollView style={{ paddingVertical: 10 }}>
                <Controller
                    name="productTitle"
                    control={control}
                    rules={{
                        required:
                            t('common:products.productName') +
                            t('common:labels.isRequired'),
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label={t('common:products.productName') + '*'}
                            placeholder={t('common:placeholders.example')}
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
                    rules={{
                        required:
                            t('common:products.brandName') +
                            t('common:labels.isRequired'),
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label={t('common:products.brandName') + '*'}
                            placeholder={t('common:placeholders.example')}
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
                                t('common:products.unit') +
                                t('common:labels.isRequired'),
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { error },
                        }) => (
                            <InputField
                                label={t('common:products.unit') + '*'}
                                inputStyle={styles.fieldsetCell}
                                placeholder={t(
                                    'common:placeholders.amountInStock',
                                )}
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
                            required:
                                t('common:products.weight') +
                                t('common:labels.isRequired'),
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { error },
                        }) => (
                            <InputField
                                label={t('common:products.weight') + '*'}
                                inputStyle={styles.fieldsetCell}
                                placeholder={t(
                                    'common:placeholders.amountInStock',
                                )}
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
                            required:
                                t('common:products.bulkPrice') +
                                ' ' +
                                t('common:labels.isRequired'),
                            pattern: {
                                value: /^\d+$/,
                                message: t('common:labels.onlyNumber'),
                            },
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { error },
                        }) => (
                            <InputField
                                label={t('common:products.bulkPrice') + ' *'}
                                inputStyle={styles.fieldsetCell}
                                placeholder={
                                    '              /' + t('common:labels.bulk')
                                }
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
                            required:
                                t('common:products.unitPrice') +
                                ' ' +
                                t('common:labels.isRequired'),
                        }}
                        render={({
                            field: { onChange, onBlur, value },
                            fieldState: { error },
                        }) => (
                            <InputField
                                label={t('common:products.unitPrice') + ' *'}
                                inputStyle={styles.fieldsetCell}
                                placeholder={
                                    '              /' + t('common:labels.unit')
                                }
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
                        required:
                            t('common:products.quantityStock') +
                            ' ' +
                            t('common:labels.isRequired'),
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label={t('common:products.quantityStock') + ' *'}
                            placeholder={t('common:placeholders.amountInStock')}
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
                <Controller
                    name="expiryDuration"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label={t('common:products.expiryDuration') + ' *'}
                            placeholder={t(
                                'common:placeholders.expiryDuration',
                            )}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoComplete={false}
                            errorMessage={error}
                        />
                    )}
                />
                <InputFieldSelect
                    label={t('common:categories.categories') + ' *'}
                    placeholder={t('common:placeholders.chooseCategory')}
                    data={categoriesOptions?.sort((a, b) => {
                        return selectedLanguageCode === 'dk'
                            ? a.label.dk
                                  .normalize()
                                  .localeCompare(b.label.dk.normalize())
                            : a.label.en
                                  .normalize()
                                  .localeCompare(b.label.en.normalize());
                    })}
                    onSelect={onSelectCategory}
                    selectedItem={selectedCategory}
                    style={styles.selectDropdown}
                />
                <Controller
                    name="productDesc"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label={t('common:products.productDesc') + ' *'}
                            placeholder={t('common:placeholders.example')}
                            multiline
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
                    name="productStory"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label={t('common:products.productStory') + ' *'}
                            placeholder={t('common:placeholders.example')}
                            multiline
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
                    name="productUnique"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label={t('common:products.productUnique') + ' *'}
                            placeholder={t('common:placeholders.example')}
                            multiline
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoComplete={false}
                            autoCapitalize="words"
                            errorMessage={error}
                        />
                    )}
                />
                <Text style={styles.fieldLabel}>
                    {t('common:products.tags')}
                </Text>
                <View style={styles.checkboxGroup}>
                    <View style={styles.tagOption}>
                        <ThermoIcon style={styles.icon} />
                        <Checkbox.Item
                            label={'    ' + t('common:products.cold')}
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
                            label={'    ' + t('common:products.frozen')}
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
                            label={'    ' + t('common:products.organic')}
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
                    title={t('common:labels.upload')}
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
        alignItems: 'center',
        paddingBottom: 5,
        paddingTop: 5,
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
    multiplySign: {
        ...generalStyles.boldText,
        fontSize: 20,
    },
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
    createButton: { width: '50%', marginBottom: 25 },
    selectDropdown: {
        // ma: 30,
    },
});
