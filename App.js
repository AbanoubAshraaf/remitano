import React from 'react';
import PropTypes from 'prop-types';

import {AppContainer} from './App/Navigator';
import firebase from 'firebase';
import {StatusBar} from 'react-native';
import {Assets} from './App/Assets/Assets';

var config = {
  databaseURL: 'https://remitanotask.firebaseio.com',
  projectId: 'remitanotask',
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const App = () => {
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
