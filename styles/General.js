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
        fontSize: 20,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: '#FFFFFF',
    },
    headerH2: {
        fontFamily: 'TT-Commons-Bold',
        fontSize: 18,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#000000',
    },
    headerLogo: {
        width: 80,
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    flexHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5,
    },
    line: {
        borderBottomWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.5)',
    },
    cardContainer: {
        width: 185,
        height: 120,
        borderRadius: 10,
    },
    imageBg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default generalStyles;
