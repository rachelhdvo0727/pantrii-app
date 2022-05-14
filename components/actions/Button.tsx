import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';

export interface Props {
    onPress: () => void;
    title: string;
    primary?: boolean;
    secondary?: boolean;
    outlined?: boolean;
    children?: React.ReactChild;
}

const Button: React.FC<Props> = ({
    title,
    children,
    primary,
    secondary,
    outlined,
    onPress,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.container,
                primary && styles.primary,
                secondary && styles.secondary,
                outlined && styles.outlined,
            ]}
        >
            <View>
                <Text
                    style={[
                        styles.title,
                        { color: primary || secondary ? '#FFFFFF' : '#1B463C' },
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
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 15,
        paddingHorizontal: 50,
    },
    title: {
        fontFamily: 'TT-Commons-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
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
});
