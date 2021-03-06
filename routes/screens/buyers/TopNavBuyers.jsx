import { Image, StyleSheet } from 'react-native';
import PantriiLogo from '../../../assets/logos/pantrii-primary-logo.png';

export default function TopNavBuyers() {
    return (
        <Image
            style={{ width: 125, height: 40, marginBottom: 8 }}
            source={PantriiLogo}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingBottom: 1,
        width: 370,
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
});
