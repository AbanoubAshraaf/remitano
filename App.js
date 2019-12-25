import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {AppContainer} from './App/Navigator';
import firebase from 'firebase';
import {StatusBar, YellowBox, AsyncStorage} from 'react-native';
import Assets from './App/Assets/Assets';

var config = {
  apiKey: 'AIzaSyBkYkzcwINKCAV4A5UljUSeMHsjUe49z0s',
  databaseURL: 'https://remitanotask.firebaseio.com',
  projectId: 'remitanotask',
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const App = () => {
  useEffect(() => {
    AsyncStorage.removeItem('email');
    console.disableYellowBox = true;
  }, []);
  return (
    <>
      <StatusBar
        backgroundColor={Assets.Colors.white}
        barStyle="dark-content"
      />
      <AppContainer />
    </>
  );
};
export default App;
