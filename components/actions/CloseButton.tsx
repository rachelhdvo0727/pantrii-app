import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CloseIcon from '../svgs/CloseIcon';

interface Props {
    style: React.ComponentProps<typeof Pressable>['style'];
    onPress: () => void;
}

function CloseButton({ style, onPress }: Props) {
    return (
        <Pressable style={[styles.container, style]} onPress={onPress}>
            <CloseIcon />
        </Pressable>
    );
}

export default CloseButton;

const styles = StyleSheet.create({
    container: {},
});
