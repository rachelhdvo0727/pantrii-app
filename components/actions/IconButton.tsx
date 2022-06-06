import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    StyleProp,
    TextProps,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { capitalize } from '../../utils/functions';

export interface Props {
    onPress: () => void;
    onPressOut?: () => void;
    title: string;
    children?: React.ReactChild;
    iconButtonStyle?: StyleProp<TouchableOpacityProps>;
    titleStyle?: StyleProp<TextProps>;
    isActive?: boolean;
    disabled?: React.ComponentProps<typeof TouchableOpacity>['disabled'];
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
    isActive,
    disabled,
    onPress,
    onPressOut,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                outlined && styles.outlined,
                disabled && styles.disabled,
                iconButtonStyle,
            ]}
            onPressOut={onPressOut}
            disabled={disabled}
        >
            <View style={styles.wrapper}>
                <Text style={[styles.title, titleStyle]}>
                    {capitalize(title)}
                </Text>
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
        </TouchableOpacity>
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
    isActive: {
        backgroundColor: '#EFF2EE',
    },
    disabled: {
        opacity: 0.3,
    },
});
