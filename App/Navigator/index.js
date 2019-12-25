import React from 'react';
import {StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../Screens/Home';
import LoginSignupScreen from '../Screens/LoginSignupScreen';

import Assets from '../Assets/Assets';

const Home_StackNavigator = createStackNavigator(
  {
    //All the screen from the Screen1 will be indexed here
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        title: 'Remitano',
        headerTitleContainerStyle: {
          justifyContent: 'flex-start',
          width: '100%',
        },
        headerStyle: {
          backgroundColor: Assets.Colors.black,
        },
        headerTitleStyle: {
          color: Assets.Colors.white,
          fontStyle: 'italic',
        },
      }),
    },
    LoginSignup: {
      screen: LoginSignupScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Remitano',
        headerTitleContainerStyle: {
          justifyContent: 'flex-start',
          width: '100%',
          backgroundColor: Assets.Colors.black,
        },
        headerStyle: {
          backgroundColor: Assets.Colors.remitanoMainColor,
        },
        headerTitleStyle: {
          color: Assets.Colors.white,
          fontStyle: 'italic',
        },
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(Home_StackNavigator);

export {AppContainer};
