import React from 'react';
import generalStyles from '../styles/General';
// Components
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    text: string;
    isWarning?: boolean;
    isConfirmation?: boolean;
}

const SystemMessageBanner = ({
    text,

    isWarning,
    isConfirmation,
}: Props) => {
    return (
        <View
            style={[
                styles.container,
                isWarning && styles.warning,
                isConfirmation && styles.confirmation,
            ]}
        >
            {isWarning && (
                <Ionicons
                    name="warning-outline"
                    size={15}
                    color="#EA6F2D"
                    style={styles.icon}
                />
            )}
            {isConfirmation && (
                <Ionicons
                    name="checkmark-circle-sharp"
                    size={15}
                    color="#9DB76E"
                    style={styles.icon}
                />
            )}
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default SystemMessageBanner;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 10,
        paddingVertical: 9.5,
        paddingHorizontal: 5,
        marginVertical: 5,
    },
    text: {
        ...generalStyles.paragraphText,
        fontSize: 13.5,
    },
    icon: { marginHorizontal: 5 },
    warning: {
        backgroundColor: '#F1DD2C',
    },
    confirmation: {
        backgroundColor: '#FFFFFF',
    },
});
