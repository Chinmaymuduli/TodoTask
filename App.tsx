// App.tsx
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import AppContextProvider from './src/contexts/AppContextProvider';
import {HomeScreen} from './src/screens';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppContextProvider>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <HomeScreen />
      </SafeAreaView>
    </AppContextProvider>
  );
};

export default App;
