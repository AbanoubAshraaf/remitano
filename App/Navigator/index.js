import React from 'react';
import {StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../Screens/Home';
import {Assets} from '../Assets/Assets';

const Home_StackNavigator = createStackNavigator({
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
});

const AppContainer = createAppContainer(Home_StackNavigator);

export {AppContainer};
