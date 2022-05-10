import { StyleSheet } from 'react-native';

const generalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#EFF2EE',
    },
    homeContainer: {
        flex: 1,
        backgroundColor: '#EFF2EE',
        paddingVertical: 15,
    },
    headerH1: {
        fontFamily: 'TT-Commons-Bold',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#FFFFFF',
    },
    headerH2: {
        fontFamily: 'TT-Commons-Bold',
        fontSize: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#000000',
    },
    headerLogo: {
        width: 80,
    },
    line: {
        borderBottomWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.5)',
    },
});

export default generalStyles;
