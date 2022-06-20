import React from 'react';
import generalStyles from '../../../styles/General';
import { categoriesOptions } from '../../../utils/variables';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import dictionary from '../../../dictionary/general.json';
import productDictionary from '../../../dictionary/products.json';
// Component
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import Button from '../../../components/actions/Button';
import InputField from '../../../components/InputField';
import InputFieldSelect from '../../../components/InputFieldSelect';
import { Checkbox } from 'react-native-paper';
import BackIconButton from '../../../components/actions/BackIconButton';
import ThermoIcon from '../../../components/svgs/ThermoIcon';
import OrganicIcon from '../../../components/svgs/OrganicIcon';
import FrozenIcon from '../../../components/svgs/FrozenIcon';
import Spinner from '../../../components/Spinner';
import { Feather } from '@expo/vector-icons';
// API & Redux
import { useDispatch, useSelector } from 'react-redux';
import { findProduct, updateProduct } from '../../../redux/slice/product';
import { getCategories } from '../../../redux/slice/categories';
//Translations
import { useTranslation } from 'react-i18next';

const ProductEditScreen = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const content = dictionary;
    const productContent = productDictionary?.products;
    const { t } = useTranslation();

    const informationSection = props?.route?.params?.informationSection;
    const { categories } = useSelector((state) => state?.categories);
    const productId = props?.route?.params?.productId;
    const { product } = useSelector((state) => state?.product);
    const category = useSelector((state) => state?.categories?.category);

    const [hasProductInformation, setHasProductInformation] =
        React.useState(false);
    const [focused, setFocused] = React.useState(false);

    const currentCategory = categoriesOptions.find(
        (item) => item?.value === category?.name,
    );

    const [selectedCategory, setSelectedCategory] =
        React.useState(currentCategory);
    const onSelectCategory = (item) => {
        setSelectedCategory(item);
        setHasProductInformation(false);
    };

    const [checkedCold, setCheckedCold] = React.useState(
        product?.tags?.includes('cold') ? 'cold' : '',
    );
    const [isCold, setIsCold] = React.useState(false);

    const [checkedFrozen, setCheckedFrozen] = React.useState(
        product?.tags?.includes('frozen') ? 'frozen' : '',
    );
    const [isFrozen, setIsFrozen] = React.useState(false);

    const [checkedOrganic, setCheckOrganic] = React.useState(
        product?.tags?.includes('organic') ? 'organic' : '',
    );
    const [isOrganic, setIsOrganic] = React.useState(false);

    const { control, handleSubmit, reset } = useForm({});

    const onSubmit = (data) => {
        parseInt(data.amountInStock, 10); // change back to Number for POST
        data.tags = [
            isCold ? checkedCold : '',
            isFrozen ? checkedFrozen : '',
            isOrganic ? checkedOrganic : '',
        ];

        const categoryId = categories?.find(
            (item) => item?.name === selectedCategory.value,
        );
        data.categoryId = categoryId?._id;
        data.dateTime = new Date();

        // Find differences between input value and local data
        const dataDifferences = Object.keys(data).reduce((diff, key) => {
            if (product[key] === data[key]) return diff;

            return {
                ...diff,
                [key]: data[key],
            };
        }, {});

        if (informationSection === 'top') {
            delete dataDifferences?.amountInStock;
            delete dataDifferences?.productStory;
            delete dataDifferences?.productUnique;
            delete dataDifferences?.expiryDuration;
            delete dataDifferences?.categoryId;
            delete dataDifferences?.producerId;
            delete dataDifferences?.isFeatured;

            dataDifferences.hasOwnProperty('productTitle')
                ? (dataDifferences.status = 'pending')
                : null;
            dataDifferences.hasOwnProperty('productDesc')
                ? (dataDifferences.status = 'pending')
                : null;
        }
        if (informationSection === 'bottom') {
            delete dataDifferences?.tags;
            delete dataDifferences?.productTitle;
            delete dataDifferences?.producerTitle;
            delete dataDifferences?.productUnit;
            delete dataDifferences?.productDesc;
            delete dataDifferences?.singlePrice;
            delete dataDifferences?.bulkPrice;

            dataDifferences.hasOwnProperty('productStory')
                ? (dataDifferences.status = 'pending')
                : null;
            dataDifferences.hasOwnProperty('productUnique')
                ? (dataDifferences.status = 'pending')
                : null;
        }
        console.log(dataDifferences);

        Object.keys(dataDifferences).length === 0
            ? null
            : dispatch(
                  updateProduct({
                      product: data,
                      information: dataDifferences,
                  }),
              );

        navigation.goBack();
    };

    React.useEffect(() => {
        // Update Screen's headerTitle
        props.navigation?.setOptions({
            headerTitle: t('navigate:editProduct'),
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });

        // Fetch data of the current product
        dispatch(findProduct(productId));
        // Fetch categories
        dispatch(getCategories(false));

        if (product) {
            reset(product);
            setHasProductInformation(true);

            product?.tags?.includes('cold') && setIsCold(true);
            product?.tags?.includes('frozen') && setIsFrozen(true);
            product?.tags?.includes('organic') && setIsOrganic(true);
        }

        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 890);

        showLoading && timer;
        return () => clearTimeout(timer);
    }, [informationSection]);

    const onFocus = () => {
        setFocused(true);
        setHasProductInformation(false);
    };
    const [showLoading, setShowLoading] = React.useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingVertical: 10 }}>
                <Text style={styles.formHeaderText}>
                    <Feather name="edit-2" size={13} color="black" />
                    {'  '}
                    {t('common:labels.showEnglishContent')}
                </Text>
                {informationSection === 'top' && (
                    <React.Fragment>
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
                                    label={t('common:products.productName')}
                                    placeholder={t(
                                        'common:placeholders.example',
                                    )}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                    errorMessage={error}
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
                                    withWarning
                                    warningText={
                                        <React.Fragment>
                                            <Text style={styles.warningTitle}>
                                                {t('common:labels.warning')}
                                            </Text>
                                            <Text>
                                                {t(
                                                    'common:labels.editLongText',
                                                )}
                                            </Text>
                                        </React.Fragment>
                                    }
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
                                    label={t('common:products.brandName')}
                                    placeholder="Eksempel"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    errorMessage={error}
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
                                />
                            )}
                        />
                        <Controller
                            name="productUnit"
                            control={control}
                            rules={{
                                required: t('common:products.unitRequirement'),
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label={t('common:products.unit')}
                                    placeholder="eks. 10"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                    errorMessage={error}
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
                                />
                            )}
                        />

                        <View style={styles.fieldset}>
                            <Controller
                                name="bulkPrice"
                                control={control}
                                rules={{
                                    required:
                                        t('common:products.bulkPrice') +
                                        t('common:labels.isRequired'),
                                }}
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error },
                                }) => (
                                    <InputField
                                        label={t('common:products.bulkPrice')}
                                        inputStyle={styles.fieldsetCell}
                                        placeholder={
                                            '                 /' +
                                            t('common:labels.bulk')
                                        }
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        autoComplete={false}
                                        autoCapitalize="words"
                                        errorMessage={error}
                                        hasDefaultValue
                                        onFocus={onFocus}
                                        focused={focused}
                                    />
                                )}
                            />
                            <Controller
                                name="singlePrice"
                                control={control}
                                rules={{
                                    required:
                                        t('common:products.unitPrice') +
                                        t('common:labels.isRequired'),
                                }}
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error },
                                }) => (
                                    <InputField
                                        label={
                                            t('common:products.unitPrice') + '*'
                                        }
                                        inputStyle={styles.fieldsetCell}
                                        placeholder={
                                            '                 /' +
                                            t('common:labels.unit')
                                        }
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        autoComplete={false}
                                        autoCapitalize="words"
                                        errorMessage={error}
                                        hasDefaultValue
                                        onFocus={onFocus}
                                        focused={focused}
                                    />
                                )}
                            />
                        </View>

                        <Controller
                            name="productDesc"
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    label={t('common:products.productDesc')}
                                    placeholder="Eksempel"
                                    multiline
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                    errorMessage={error}
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
                                    withWarning
                                    warningText={
                                        <React.Fragment>
                                            <Text style={styles.warningTitle}>
                                                {t('common:labels.warning')}
                                            </Text>
                                            <Text>
                                                {t(
                                                    'common:labels.editLongText',
                                                )}
                                            </Text>
                                        </React.Fragment>
                                    }
                                />
                            )}
                        />

                        <Text style={[styles.fieldLabel, { marginTop: 10 }]}>
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
                                        setHasProductInformation(false);
                                    }}
                                    color="#000000"
                                    mode="android"
                                    position="leading"
                                    labelStyle={[styles.checkBoxLabel]}
                                />
                            </View>
                            <View style={styles.tagOption}>
                                <FrozenIcon style={styles.icon} />
                                <Checkbox.Item
                                    label={'    ' + t('common:products.frozen')}
                                    status={isFrozen ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setIsFrozen(!isFrozen);
                                        setCheckedFrozen('frozen');
                                        setHasProductInformation(false);
                                    }}
                                    value="frozen"
                                    color="#000000"
                                    labelStyle={[styles.checkBoxLabel]}
                                    mode="android"
                                    position="leading"
                                />
                            </View>
                            <View style={styles.tagOption}>
                                <OrganicIcon style={styles.icon} />
                                <Checkbox.Item
                                    label={
                                        '    ' + t('common:products.organic')
                                    }
                                    status={isOrganic ? 'checked' : 'unchecked'}
                                    value="organic"
                                    onPress={() => {
                                        setIsOrganic(!isOrganic);
                                        setCheckOrganic('organic');
                                        setHasProductInformation(false);
                                    }}
                                    color="#000000"
                                    labelStyle={[styles.checkBoxLabel]}
                                    mode="android"
                                    position="leading"
                                    onFocus={onFocus}
                                />
                            </View>
                        </View>
                    </React.Fragment>
                )}
                {informationSection === 'bottom' && (
                    <React.Fragment>
                        <InputFieldSelect
                            label={t('common:categories.categories')}
                            placeholder={t(
                                'common:placeholders.chooseCategory',
                            )}
                            data={categoriesOptions?.sort((a, b) =>
                                a.label
                                    .normalize()
                                    .localeCompare(b.label.normalize()),
                            )}
                            onSelect={onSelectCategory}
                            selectedItem={selectedCategory}
                            hasDefaultValue
                            onFocus={onFocus}
                            focused={focused}
                            style={styles.categoriesOptions}
                        />

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
                                    label={t('common:products.quantityStock')}
                                    placeholder={t(
                                        'common:placeholders.amountInStock',
                                    )}
                                    value={value?.toString()}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    errorMessage={error}
                                    keyboardType="numeric"
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
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
                                    label={t('common:products.expiryDuration')}
                                    placeholder={t(
                                        'common:placeholders.expiryDuration',
                                    )}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    errorMessage={error}
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
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
                                    label={t('common:products.productStory')}
                                    placeholder={t(
                                        'common:placeholders.example',
                                    )}
                                    multiline
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                    errorMessage={error}
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
                                    withWarning
                                    warningText={
                                        <React.Fragment>
                                            <Text style={styles.warningTitle}>
                                                {t('common:labels.warning')}
                                            </Text>
                                            <Text>
                                                {t(
                                                    'common:labels.editLongText',
                                                )}
                                            </Text>
                                        </React.Fragment>
                                    }
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
                                    label={t('common:products.productUnique')}
                                    placeholder={t(
                                        'common:placeholders.example',
                                    )}
                                    multiline
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    autoComplete={false}
                                    autoCapitalize="words"
                                    errorMessage={error}
                                    hasDefaultValue
                                    onFocus={onFocus}
                                    focused={focused}
                                    withWarning
                                    warningText={
                                        <React.Fragment>
                                            <Text style={styles.warningTitle}>
                                                {t('common:labels.warning')}
                                            </Text>
                                            <Text>
                                                {t(
                                                    'common:labels.editLongText',
                                                )}
                                            </Text>
                                        </React.Fragment>
                                    }
                                />
                            )}
                        />
                    </React.Fragment>
                )}
                <Button
                    primary
                    buttonStyle={styles.buttonStyle}
                    title={t('common:labels.save')}
                    disabled={hasProductInformation}
                    onPress={handleSubmit(onSubmit)}
                ></Button>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductEditScreen;

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,
        alignSelf: 'center',
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
    buttonStyle: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        width: '40%',
    },
    checkboxGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    checkBoxLabel: {
        fontFamily: 'TT-Commons-DemiBold',
        fontSize: 14,
        letterSpacing: 1,
        textTransform: 'capitalize',
    },
    tagOption: { flexDirection: 'row', alignItems: 'center', width: '50%' },
    icon: { position: 'absolute', left: 50 },
    hasDefaultValue: {
        color: 'grey',
    },
    formHeaderText: {
        ...generalStyles.headerH3,
        marginTop: 10,
        marginBottom: 3,
        marginLeft: 20,
    },
    warningTitle: {
        ...generalStyles.mediumText,
        color: '#CBA51E',
    },
    categoriesOptions: {
        marginBottom: 5,
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: Dimensions.get('window').width - 100,
        height: 140,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        justifyContent: 'space-between',
    },
});
