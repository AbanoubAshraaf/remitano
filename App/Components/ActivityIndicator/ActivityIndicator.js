import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './styles';
import Assets from '../../Assets/Assets';

const ActivityIndicatorView = props => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator color={Assets.Colors.babyblue} size="large" />
      </View>
    </View>
  );
};

export default ActivityIndicatorView;
