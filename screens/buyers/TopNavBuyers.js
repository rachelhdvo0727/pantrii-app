import { View, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Rowing } from '@material-ui/icons';
import { withThemeCreator } from '@material-ui/styles';

export default function TopNavBuyers() {
    return (
        <View style={styles.container}>
            <Ionicons
                name="search-outline"
                size="24"
                color="#FFFFFF"
                style={{ marginTop: 8 }}
            />

            <Image
                style={{ width: 125, height: 40 }}
                source={require('../../assets/logos/pantrii-primary-logo.png')}
            />

            <Ionicons
                name="cart-outline"
                size="24"
                color="#FFFFFF"
                style={{ marginTop: 8 }}
            />
        </View>
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
