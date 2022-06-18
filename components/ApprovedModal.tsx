import React from 'react';
import generalStyles from '../styles/General';
import { capitalize } from '../utils/functions';
// Components
import {
    StyleSheet,
    View,
    Modal as ModalNative,
    Text,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './actions/Button';
import Modal from 'react-native-modal';
import CheckmarkIcon from './svgs/CheckmarkIcon';
import HourglassIcon from './svgs/HourglassIcon';

export interface Props {
    messageTitle: string;
    messageText: string;
    isModalVisible: boolean;
    hasConfirmedIcon?: boolean;
    waitingIcon?: boolean;
    buttonTitle?: React.ComponentProps<typeof Button>['title'];
    children?: React.ReactNode;
    hasButton?: boolean;
    modalAsScreen?: boolean;
    onPress?: React.ComponentProps<typeof Button>['onPress'];
    onRequestClose?: React.ComponentProps<typeof ModalNative>['onRequestClose'];
    swipeDirection?: React.ComponentProps<typeof Modal>['swipeDirection'];
    animationInTiming?: React.ComponentProps<typeof Modal>['animationInTiming'];
    animationOutTiming?: React.ComponentProps<
        typeof Modal
    >['animationOutTiming'];
}

export default function ApprovedModal({
    messageTitle,
    messageText,
    isModalVisible,
    hasConfirmedIcon,
    hasButton,
    onPress,
    onRequestClose,
    modalAsScreen,
    buttonTitle,
    swipeDirection,
    animationInTiming,
    animationOutTiming,
    waitingIcon,
}: Props) {
    const [isBackdropPressed, setIsBackdropPressed] = React.useState(false);
    const onBackdropPress = () => {
        setIsBackdropPressed(!isBackdropPressed);
    };
    return (
        <React.Fragment>
            {modalAsScreen ? (
                <View style={styles.container}>
                    <ModalNative
                        visible={isModalVisible}
                        onRequestClose={onRequestClose}
                        animationType="fade"
                        transparent={true}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {hasConfirmedIcon ? (
                                    <Ionicons
                                        name="checkmark-circle-sharp"
                                        size={80}
                                        color="#9DB76E"
                                        style={styles.icon}
                                    />
                                ) : null}
                                {waitingIcon && <HourglassIcon />}

                                <Text style={styles.messageTitle}>
                                    {messageTitle}
                                </Text>
                                <Text style={styles.messageText}>
                                    {capitalize(messageText)}
                                </Text>
                                {hasButton ? (
                                    <Button
                                        primary
                                        title={buttonTitle}
                                        onPress={onPress}
                                    ></Button>
                                ) : null}
                            </View>
                        </View>
                    </ModalNative>
                </View>
            ) : (
                <Modal
                    isVisible={isModalVisible}
                    coverScreen={true}
                    onBackdropPress={onBackdropPress}
                    swipeDirection={swipeDirection}
                    backdropOpacity={0.3}
                    animationOutTiming={animationOutTiming}
                    animationInTiming={animationInTiming}
                >
                    <View style={styles.floatModalWrapper}>
                        <View style={styles.modalView}>
                            {hasConfirmedIcon ? (
                                <CheckmarkIcon style={styles.icon} />
                            ) : null}

                            <Text style={styles.messageTitle}>
                                {messageTitle}
                            </Text>
                            <Text style={styles.messageText}>
                                {capitalize(messageText)}
                            </Text>
                            {hasButton ? (
                                <Button
                                    primary
                                    title={buttonTitle}
                                    onPress={onPress}
                                ></Button>
                            ) : null}
                        </View>
                    </View>
                </Modal>
            )}
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        ...generalStyles.container,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: '#EFF2EE',
    },
    floatModalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('window').width - 100,
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
    buttonStyle: {},
});
