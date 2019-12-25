import React from 'react';
import {StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../Screens/Home';
import LoginSignupScreen from '../Screens/LoginSignupScreen';

import {Assets} from '../Assets/Assets';

const Home_StackNavigator = createStackNavigator(
  {
    //All the screen from the Screen1 will be indexed here
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        title: 'Home',
        headerTitleContainerStyle: {
          justifyContent: 'center',
          width: '100%',
        },
      }),
    },
    LoginSignup: {
      screen: LoginSignupScreen,
    },
  },
  {
    initialRouteName: 'LoginSignup',
  },
);

const AppContainer = createAppContainer(Home_StackNavigator);

export {AppContainer};
