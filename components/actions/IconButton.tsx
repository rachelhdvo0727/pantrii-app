import React from 'react';
import {
    StyleSheet,
    Pressable,
    View,
    Text,
    StyleProp,
    PressableProps,
    TextProps,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export interface Props {
    onPress: () => void;
    onPressOut?: () => void;
    title: string;
    children?: React.ReactChild;
    iconButtonStyle?: StyleProp<PressableProps>;
    titleStyle?: StyleProp<TextProps>;
    isActive?: boolean;
    outlined?: boolean;
    arrowRight?: boolean;
    arrowDown?: boolean;
}

const IconButton: React.FC<Props> = ({
    iconButtonStyle,
    titleStyle,
    title,
    children,
    outlined,
    arrowRight,
    arrowDown,
    onPress,
    onPressOut,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.container,
                outlined && styles.outlined,
                iconButtonStyle,
            ]}
            onPressOut={onPressOut}
        >
            <View style={styles.wrapper}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
                {children}
                {arrowRight ? (
                    <AntDesign
                        name="arrowright"
                        size={12}
                        color="#1B463C"
                        style={styles.iconSpacing}
                    />
                ) : null}
                {arrowDown ? (
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={12}
                        color="#1B463C"
                        style={styles.iconSpacing}
                    />
                ) : null}
            </View>
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    container: {
        borderColor: '#1B463C',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#FFFFFF',
        borderRadius: 1000,
        margin: 10,
        justifyContent: 'center',
    },
    wrapper: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: 'TT-Commons-Regular',
        fontSize: 12,
        color: '#1B463C',
        textTransform: 'capitalize',
        lineHeight: 14,
        letterSpacing: 1.2,
    },
    iconSpacing: {
        marginLeft: 4,
        marginTop: 1.2,
    },
    outlined: {
        backgroundColor: '#EFF2EE',
    },
});
