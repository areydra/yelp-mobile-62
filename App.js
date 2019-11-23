import React from 'react';
import {SafeAreaView} from 'react-native';
import Router from './navigation/BusinessNavigator';
import {Provider} from 'react-redux';

import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <Router />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
