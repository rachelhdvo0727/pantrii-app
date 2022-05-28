import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import BackIcon from '../svgs/BackIcon';

interface Props {
    style: React.ComponentProps<typeof Pressable>['style'];
    onPress: () => void;
}

function BackIconButton({ style, onPress }: Props) {
    return (
        <Pressable style={[styles.container, style]} onPress={onPress}>
            <BackIcon />
        </Pressable>
    );
}

export default BackIconButton;

const styles = StyleSheet.create({
    container: {},
});
