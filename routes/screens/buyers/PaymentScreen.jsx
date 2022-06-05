import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import generalStyles from '../../../styles/General';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
// Component
import Button from '../../../components/actions/Button';
import BackIconButton from '../../../components/actions/BackIconButton';
import InputField from '../../../components/InputField';
import Modal from 'react-native-modal';
// Redux
import { cartTotalPriceSelector } from '../../../redux/reducer/selector';
import { clear } from '../../../redux/reducer/CartReducer';
import { useSelector, useDispatch } from 'react-redux';

export default function PaymentScreen(props) {
    const navigation = useNavigation();
    const user = props?.route?.params?.user;
    const [focused, setFocused] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        props?.navigation?.setOptions({
            headerLeft: () => (
                <BackIconButton onPress={() => navigation.goBack()} />
            ),
        });
    });

    const { control, handleSubmit } = useForm({
        defaultValues: {
            cardHolderName: '',
            cardNumber: '',
            expiryDate: '',
            CVC: '',
        },
    });

    const onSubmit = (data) => {
        setModalVisible(true);
    };

    // Modal
    const [modalVisible, setModalVisible] = React.useState(false);
    const onPaymentSuccess = () => {
        setModalVisible(!modalVisible);
        navigation?.navigate('');
    };

    return (
        <View style={generalStyles.container}>
            <View style={styles.formWrapper}>
                <View style={styles.flex}>
                    <Text style={styles.header}>Kredit/ Debit kort</Text>
                    <Image
                        style={styles.image}
                        source={require('../../../assets/kort/kreditkort-logo.png')}
                    />
                </View>
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: 'Navn er påkrævet',
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="Navn på kortet *"
                            placeholder="Hans Hansen"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoComplete={false}
                            autoCapitalize="words"
                            errorMessage={error}
                        ></InputField>
                    )}
                ></Controller>
                <Controller
                    name="number"
                    control={control}
                    rules={{
                        required: 'Kortnummer er påkrævet',
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="Kortnummer *"
                            placeholder="1234-1234-1234-1234"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="number-pad"
                            onBlur={onBlur}
                            autoComplete={false}
                            errorMessage={error}
                        ></InputField>
                    )}
                ></Controller>
                <Controller
                    name="expiryDate"
                    control={control}
                    rules={{
                        required: 'Gyldigt til er påkrævet',
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="Gyldigt til *"
                            placeholder="MM/YY"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="number-pad"
                            onBlur={onBlur}
                            autoComplete={false}
                            errorMessage={error}
                        ></InputField>
                    )}
                ></Controller>
                <Controller
                    name="CVC"
                    control={control}
                    rules={{
                        required: 'Kontrolcifre er påkrævet',
                    }}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <InputField
                            label="Kontrolcifre *"
                            placeholder="123"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="number-pad"
                            onBlur={onBlur}
                            autoComplete={false}
                            errorMessage={error}
                        ></InputField>
                    )}
                ></Controller>
                <Button
                    title="Betal"
                    primary
                    buttonStyle={styles.buttonStyle}
                    onPress={handleSubmit(onSubmit)}
                ></Button>
            </View>

            {/* Success payment modal */}
            <Modal
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                animationType="slide"
                backdropOpacity={0.4}
                animationOutTiming={600}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Ionicons
                            name="checkmark-circle-sharp"
                            size={80}
                            color="#9DB76E"
                            style={styles.icon}
                        />
                        <Text style={styles.messageTitle}>godkendt</Text>
                        <Text style={styles.messageText}>
                            Din ordre er blevet bekræftet
                        </Text>
                        <Button
                            primary
                            title="TIL HJEM"
                            onPress={() => {
                                dispatch(clear());
                                navigation.navigate('HomeScreen');
                            }}
                            onPressOut={() => {
                                setModalVisible(!modalVisible);
                            }}
                        ></Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#EFF2EE',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 10,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 75,
    },
    informationCard: {
        marginVertical: 20,
    },
    highlightText: {
        ...generalStyles.boldText,
    },
    text: { ...generalStyles.paragraphText },
    flex: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        fontSize: 14,
        color: 'black',
        fontFamily: 'TT-Commons-Regular',
        letterSpacing: 0.5,
        paddingVertical: 3,
        alignContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    formWrapper: {
        width: '95%',
        marginVertical: 20,
    },
    header: {
        ...generalStyles.mediumText,
        paddingLeft: 11,
    },
    image: {
        width: 150,
        height: 25,
    },
    buttonStyle: {
        alignSelf: 'center',
        marginVertical: 15,
        width: '50%',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#FFFFFF',
        width: '80%',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
    icon: {
        position: 'absolute',
        top: -56,
    },
    messageTitle: {
        ...generalStyles.headerH1,
        color: '#000000',
        paddingVertical: 10,
    },
    messageText: {
        ...generalStyles.paragraphText,
        paddingTop: 10,
        paddingBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
    },
});
