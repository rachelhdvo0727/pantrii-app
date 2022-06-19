import React from 'react';
import generalStyles from '../../../styles/General';
import { categoriesOptions } from '../../../utils/variables';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import dictionary from '../../../dictionary/general.json';
import productDictionary from '../../../dictionary/products.json';
// Component
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import Button from '../../../components/actions/Button';
import InputField from '../../../components/InputField';
import InputFieldSelect from '../../../components/InputFieldSelect';
import { Checkbox } from 'react-native-paper';
import BackIconButton from '../../../components/actions/BackIconButton';
import ThermoIcon from '../../../components/svgs/ThermoIcon';
import OrganicIcon from '../../../components/svgs/OrganicIcon';
import FrozenIcon from '../../../components/svgs/FrozenIcon';
import Spinner from '../../../components/Spinner';
// API & Redux
import { useDispatch, useSelector } from 'react-redux';
import { findProduct, updateProduct } from '../../../redux/slice/product';
import { getCategories } from '../../../redux/slice/categories';

const ProductEditScreen = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const content = dictionary;
    const productContent = productDictionary?.products;

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
        }
        if (informationSection === 'bottom') {
            delete dataDifferences?.tags;
            delete dataDifferences?.productTitle;
            delete dataDifferences?.producerTitle;
            delete dataDifferences?.productUnit;
            delete dataDifferences?.productDesc;
            delete dataDifferences?.singlePrice;
            delete dataDifferences?.bulkPrice;
        }

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
            headerTitle: `REDIGER PRODUKT`,
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
            {showLoading ? (
                <Spinner />
            ) : (
                <React.Fragment>
                    {informationSection === 'top' && (
                        <View style={{ paddingVertical: 10 }}>
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
                                        hasDefaultValue
                                        onFocus={onFocus}
                                        focused={focused}
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
                                    required:
                                        'Venligst angiv antal af produkt i én pakke/enhed',
                                }}
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error },
                                }) => (
                                    <InputField
                                        label="enhed"
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
                                        required: 'Pris/kolli er påkrævet',
                                    }}
                                    render={({
                                        field: { onChange, onBlur, value },
                                        fieldState: { error },
                                    }) => (
                                        <InputField
                                            label="pris /kolli"
                                            inputStyle={styles.fieldsetCell}
                                            placeholder="&emsp;&emsp;&emsp;&ensp;/kolli"
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
                                        label="produktbeskrivelse"
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
                                        status={
                                            isCold ? 'checked' : 'unchecked'
                                        }
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
                                        label={'    ' + content?.tags?.isFrozen}
                                        status={
                                            isFrozen ? 'checked' : 'unchecked'
                                        }
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
                                            '    ' + content?.tags?.isOrganic
                                        }
                                        status={
                                            isOrganic ? 'checked' : 'unchecked'
                                        }
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
                        </View>
                    )}
                    {informationSection === 'bottom' && (
                        <View style={{ paddingVertical: 10 }}>
                            <InputFieldSelect
                                label="kategorier"
                                placeholder="Vælge en kategorie"
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
                            />

                            <Controller
                                name="amountInStock"
                                control={control}
                                rules={{
                                    required:
                                        'Venligst angiv antal af produkt på lager',
                                }}
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error },
                                }) => (
                                    <InputField
                                        label="Antal på lager"
                                        placeholder="eks. 10"
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
                                        label="forventet holdbarhed"
                                        placeholder="x dage/måned/år"
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
                                        label="produkthistorie"
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
                                        hasDefaultValue
                                        onFocus={onFocus}
                                        focused={focused}
                                    />
                                )}
                            />
                        </View>
                    )}
                    <Button
                        primary
                        buttonStyle={styles.buttonStyle}
                        title="Gem"
                        disabled={hasProductInformation}
                        onPress={handleSubmit(onSubmit)}
                    ></Button>
                </React.Fragment>
            )}
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
    buttonStyle: { alignSelf: 'center', marginVertical: 10, width: '40%' },
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
    hasDefaultValue: {
        color: 'grey',
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
