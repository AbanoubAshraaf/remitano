import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import Assets, {Width, Height} from '../../Assets/Assets';

import Share, {ShareSheet, Button} from 'react-native-share';

const ShareView = props => {
  useEffect(() => {}, []);

  let shareOptions = {
    url: props.url,
    subject: 'Share Link', //  for email
  };
  return (
    <ShareSheet
      visible={props.url}
      onCancel={() => {
        props.setItemUrl(false);
      }}>
      <Button
        iconSrc={Assets.requires.twitter}
        onPress={() => {
          props.setItemUrl(false);
          setTimeout(() => {
            Share.shareSingle(
              Object.assign(shareOptions, {
                social: 'twitter',
              }),
            );
          }, 300);
        }}>
        Twitter
      </Button>
      <Button
        iconSrc={Assets.requires.facebook}
        onPress={() => {
          props.setItemUrl(false);
          setTimeout(() => {
            Share.shareSingle(
              Object.assign(shareOptions, {
                social: 'facebook',
              }),
            );
          }, 300);
        }}>
        Facebook
      </Button>

      <Button
        iconSrc={Assets.requires.google}
        onPress={() => {
          props.setItemUrl(false);
          setTimeout(() => {
            Share.shareSingle(
              Object.assign(shareOptions, {
                social: 'googleplus',
              }),
            );
          }, 300);
        }}>
        Google +
      </Button>
    </ShareSheet>
  );
};



export default ShareView;
