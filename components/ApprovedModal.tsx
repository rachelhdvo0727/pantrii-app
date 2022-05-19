import React from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';
import generalStyles from '../styles/General';
// Components
import { Ionicons } from '@expo/vector-icons';
import Button from './actions/Button';

export interface Props {
    messageTitle: string;
    messageText: string;
    isModalVisible: boolean;
    hasConfirmedIcon?: boolean;
    buttonTitle?: React.ComponentProps<typeof Button>['title'];
    children?: React.ReactNode;
    hasButton?: boolean;
    onPress?: React.ComponentProps<typeof Button>['onPress'];
    onRequestClose?: React.ComponentProps<typeof Modal>['onRequestClose'];
}

export default function ApprovedModal({
    messageTitle,
    messageText,
    isModalVisible,
    hasConfirmedIcon,
    hasButton,
    onPress,
    onRequestClose,
}: Props) {
    return (
        <View style={styles.container}>
            <Modal
                visible={isModalVisible}
                onRequestClose={onRequestClose}
                animationType="slide"
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

                        <Text style={styles.messageTitle}>{messageTitle}</Text>
                        <Text style={styles.messageText}>{messageText}</Text>
                        {hasButton ? (
                            <React.Fragment>
                                <Button
                                    primary
                                    title="log ind"
                                    onPress={onPress}
                                ></Button>
                            </React.Fragment>
                        ) : null}
                    </View>
                </View>
            </Modal>
        </View>
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
    buttonStyle: {},
});
