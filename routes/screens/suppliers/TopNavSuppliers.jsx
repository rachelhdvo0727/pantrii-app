import { Image, StyleSheet } from 'react-native';

export default function TopNavSuppliers() {
    return (
        <Image
            style={{ width: 125, height: 40, marginBottom: 8 }}
            source={require('../../../assets/logos/pantrii-primary-logo.png')}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingBottom: 1,
        width: 370,
        // borderTopWidth: 1,
        // borderColor: 'white',
    },
    searchContainer: {
        width: 40,
        height: 45,
        borderRightWidth: 1,
        borderColor: 'white',
        paddingTop: 8,
    },
    cartContainer: {
        width: 40,
        height: 45,
        borderLeftWidth: 1,
        borderColor: 'white',
        paddingTop: 8,
        paddingLeft: 12,
    },
    headerH1: {
        fontFamily: 'TT-Commons-Bold',
    },
});
