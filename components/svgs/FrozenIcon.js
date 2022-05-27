import * as React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { ClipPath, Path, Defs, G, Circle } from 'react-native-svg';

function FrozenIcon(props) {
    return (
        <Svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z"
                fill="#53BDCA"
            />
            <Path
                d="M7.5 13C7.38083 13 7.28229 12.961 7.20437 12.8831C7.12646 12.8052 7.0875 12.7067 7.0875 12.5875V10.3188L5.3275 12.0788C5.245 12.1613 5.14875 12.2002 5.03875 12.1956C4.92875 12.191 4.8325 12.1521 4.75 12.0788C4.6675 11.9963 4.62625 11.8977 4.62625 11.7831C4.62625 11.6685 4.6675 11.57 4.75 11.4875L7.0875 9.15V7.9125H5.85L3.54 10.2225C3.46667 10.2958 3.375 10.3325 3.265 10.3325C3.155 10.3325 3.05875 10.2958 2.97625 10.2225C2.89375 10.14 2.85021 10.0415 2.84562 9.92688C2.84104 9.81229 2.88 9.71375 2.9625 9.63125L4.68125 7.9125H2.4125C2.29333 7.9125 2.19479 7.87354 2.11688 7.79563C2.03896 7.71771 2 7.61917 2 7.5C2 7.38083 2.03896 7.28229 2.11688 7.20437C2.19479 7.12646 2.29333 7.0875 2.4125 7.0875H4.68125L2.9075 5.31375C2.825 5.23125 2.78375 5.135 2.78375 5.025C2.78375 4.915 2.825 4.81875 2.9075 4.73625C2.99 4.65375 3.08854 4.6125 3.20313 4.6125C3.31771 4.6125 3.41625 4.65375 3.49875 4.73625L5.85 7.0875H7.0875V5.83625L4.79125 3.54C4.70875 3.4575 4.6675 3.36125 4.6675 3.25125C4.6675 3.14125 4.70417 3.045 4.7775 2.9625C4.86 2.88 4.96083 2.83646 5.08 2.83188C5.19917 2.82729 5.3 2.86625 5.3825 2.94875L7.0875 4.6675V2.4125C7.0875 2.29333 7.12646 2.19479 7.20437 2.11688C7.28229 2.03896 7.38083 2 7.5 2C7.61917 2 7.71771 2.03896 7.79563 2.11688C7.87354 2.19479 7.9125 2.29333 7.9125 2.4125V4.6675L9.68625 2.89375C9.76875 2.81125 9.865 2.77229 9.975 2.77687C10.085 2.78146 10.1812 2.825 10.2637 2.9075C10.3462 2.99 10.3875 3.08625 10.3875 3.19625C10.3875 3.30625 10.3462 3.4025 10.2637 3.485L7.9125 5.83625V7.0875H9.16375L11.4738 4.7775C11.5563 4.695 11.6525 4.65604 11.7625 4.66063C11.8725 4.66521 11.9688 4.70417 12.0513 4.7775C12.1338 4.86 12.175 4.95854 12.175 5.07313C12.175 5.18771 12.1338 5.28625 12.0513 5.36875L10.3325 7.0875H12.5875C12.7067 7.0875 12.8052 7.12646 12.8831 7.20437C12.961 7.28229 13 7.38083 13 7.5C13 7.61917 12.961 7.71771 12.8831 7.79563C12.8052 7.87354 12.7067 7.9125 12.5875 7.9125H10.3325L12.0925 9.68625C12.1658 9.75958 12.2025 9.85125 12.2025 9.96125C12.2025 10.0713 12.1658 10.1675 12.0925 10.25C12.01 10.3325 11.9115 10.3738 11.7969 10.3738C11.6823 10.3738 11.5838 10.3325 11.5012 10.25L9.16375 7.9125H7.9125V9.15L10.2775 11.5288C10.3508 11.6021 10.3875 11.6938 10.3875 11.8038C10.3875 11.9138 10.3508 12.01 10.2775 12.0925C10.195 12.175 10.0965 12.2163 9.98188 12.2163C9.86729 12.2163 9.76875 12.175 9.68625 12.0925L7.9125 10.3188V12.5875C7.9125 12.7067 7.87354 12.8052 7.79563 12.8831C7.71771 12.961 7.61917 13 7.5 13Z"
                fill="white"
            />
        </Svg>
    );
}

const styles = StyleSheet.create({
    general: {},
});

export default FrozenIcon;