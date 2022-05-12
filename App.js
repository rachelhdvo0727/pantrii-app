import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigation from './routes/Navigation';

const loadFonts = () => {
    return Font.loadAsync({
        'TT-Commons-Bold': require('./assets/fonts/TT-Commons-Bold.otf'),
        'TT-Commons-DemiBold': require('./assets/fonts/TT-Commons-DemiBold.otf'),
        'TT-Commons-Medium': require('./assets/fonts/TT-Commons-Medium.otf'),
        'TT-Commons-Regular': require('./assets/fonts/TT-Commons-Regular.otf'),
    });
};
export default function App() {
    const [fontLoaded, setFontLoaded] = React.useState(false);
    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={loadFonts}
                onFinish={() => setFontLoaded(true)}
                onError={(error) => console.error(error)}
            />
        );
    }
    return <Navigation />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
