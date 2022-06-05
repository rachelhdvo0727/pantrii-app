import React from 'react';
import {
    StyleSheet,
    Pressable,
    View,
    Text,
    PressableProps,
    StyleProp,
} from 'react-native';

export interface Props {
    onPress: React.ComponentProps<typeof Pressable>['onPress'];
    title: React.ComponentProps<typeof Text>['children'];
    buttonStyle?: StyleProp<PressableProps>;
    primary?: boolean;
    secondary?: boolean;
    outlined?: boolean;
    confirmed?: boolean;
    children?: React.ReactChild;
    disabled?: React.ComponentProps<typeof Pressable>['disabled'];
    onPressOut?: React.ComponentProps<typeof Pressable>['onPressOut'];
    onPressIn?: React.ComponentProps<typeof Pressable>['onPressIn'];
}

const Button: React.FC<Props> = ({
    title,
    children,
    primary,
    secondary,
    outlined,
    confirmed,
    buttonStyle,
    onPress,
    disabled,
    onPressOut,
    onPressIn,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={[
                buttonStyle,
                styles.container,
                primary && styles.primary,
                secondary && styles.secondary,
                outlined && styles.outlined,
                disabled && styles.disabled,
                confirmed && styles.confirmed,
            ]}
            disabled={disabled}
            onPressOut={onPressOut}
            onPressIn={onPressIn}
        >
            <View>
                <Text
                    style={[
                        styles.title,
                        {
                            color:
                                primary || secondary || confirmed
                                    ? '#FFFFFF'
                                    : '#1B463C',
                        },
                        {
                            textTransform:
                                primary || outlined
                                    ? 'uppercase'
                                    : 'capitalize',
                        },
                    ]}
                >
                    {title}
                </Text>
            </View>
            {children}
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        borderRadius: 1000,
        paddingVertical: 15,
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'TT-Commons-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        fontSize: 14,
    },
    primary: {
        backgroundColor: '#EA6F2D',
    },
    secondary: { backgroundColor: '#1B463C' },
    outlined: {
        backgroundColor: '#EFF2EE',
        borderColor: '#1B463C',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    disabled: {
        opacity: 0.5,
    },
    confirmed: {
        backgroundColor: '#9DB76E',
    },
});
