import React from 'react';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import AppLoading from 'expo-app-loading';
import Navigation from './routes/Navigation';
import { Provider } from 'react-redux';
import store from './redux/store/store';

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
    const [loggedInUser, setLoggedInUser] = React.useState({});
    const [initialRoute, setInitialRoute] = React.useState(null || '');

    React.useEffect(() => {
        (async function () {
            try {
                const user = await SecureStore.getItemAsync('user');
                if (user?.length !== 0) {
                    const parsedUser = JSON.parse(user);
                    setLoggedInUser(parsedUser);
                    // console.log('found user', parsedUser);
                    parsedUser?.roleTitle === 'producer' &&
                        setInitialRoute('BottomTabSuppliers');
                    parsedUser?.roleTitle === 'buyer' &&
                        setInitialRoute('BottomTabBuyers');
                } else {
                    setLoggedInUser({});
                    setInitialRoute('LogInScreen');
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={loadFonts}
                onFinish={() => setFontLoaded(true)}
                onError={(error) => console.error(error)}
            />
        );
    }

    return (
        <Provider store={store}>
            <Navigation initialRoute={initialRoute} user={loggedInUser} />
        </Provider>
    );
}
