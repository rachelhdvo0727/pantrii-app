import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

interface Props {
    onPress: () => void;
    title: string;
    children: React.ReactChild;
    isActive: boolean;
    outlined?: boolean;
    arrowRight?: boolean;
    arrowDown?: boolean;
}

function IconButton({
    title,
    children,
    outlined,
    arrowRight,
    arrowDown,
    onPress,
}: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, outlined && styles.outlined]}
        >
            <View style={styles.wrapper}>
                <Text style={styles.title}>{title}</Text>
                {children}
                {arrowRight ? (
                    <AntDesign
                        name="arrowright"
                        size={15}
                        color="#1B463C"
                        style={styles.iconSpacing}
                    />
                ) : null}
                {arrowDown ? (
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={15}
                        color="#1B463C"
                        style={styles.iconSpacing}
                    />
                ) : null}
            </View>
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    container: {
        borderColor: '#1B463C',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#FFFFFF',
        borderRadius: 1000,
        margin: 10,
    },
    wrapper: {
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 17,
    },
    title: {
        fontFamily: 'TT-Commons-Regular',
        fontSize: 14,
        color: '#1B463C',
        textTransform: 'capitalize',
        lineHeight: 14,
        letterSpacing: 1.3,
    },
    iconSpacing: {
        marginLeft: 4,
    },
    outlined: {
        backgroundColor: '#EFF2EE',
    },
});
