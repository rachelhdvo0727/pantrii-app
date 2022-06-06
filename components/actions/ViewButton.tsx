import React from 'react';
import {
    StyleSheet,
    Pressable,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    Text,
    StyleProp,
    PressableProps,
} from 'react-native';

export interface Props {
    onPress: React.ComponentProps<typeof TouchableOpacity>['onPress'];
    style?: StyleProp<TouchableOpacityProps>;
}

const ViewButton: React.FC<Props> = ({ style, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <Text style={styles.title}>Se alle</Text>
        </TouchableOpacity>
    );
};

export default ViewButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AEC0AB',
        borderRadius: 3,
        margin: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: 'TT-Commons-Regular',
        color: '#1B463C',
        letterSpacing: 1,
        fontSize: 10,
    },
});
