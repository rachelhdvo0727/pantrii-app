import * as React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

function BackIcon(props) {
    return (
        <Svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Rect width="24" height="24" rx="12" fill="#992947" />
            <Path
                d="M13.4328 17.7419L8.26119 12.6323C8.17413 12.529 8.10883 12.4301 8.0653 12.3355C8.02177 12.2409 8 12.1333 8 12.0129C8 11.8925 8.02177 11.7849 8.0653 11.6903C8.10883 11.5957 8.17413 11.4968 8.26119 11.3935L13.459 6.25806C13.6331 6.08602 13.8464 6 14.0989 6C14.3514 6 14.5647 6.08602 14.7388 6.25806C14.9129 6.43011 14.9956 6.64516 14.9869 6.90323C14.9782 7.16129 14.8868 7.37634 14.7127 7.54839L10.194 12.0129L14.7388 16.5032C14.9129 16.6753 15 16.8817 15 17.1226C15 17.3634 14.9129 17.5699 14.7388 17.7419C14.5647 17.914 14.347 18 14.0858 18C13.8246 18 13.607 17.914 13.4328 17.7419Z"
                fill="white"
            />
        </Svg>
    );
}

const styles = StyleSheet.create({
    general: {},
});

export default BackIcon;
