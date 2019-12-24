import {Dimensions} from 'react-native';
export const Height = Dimensions.get('window').height;
export const Width = Dimensions.get('window').width;
const Assets = {
  fonts: {
    Gilroy_Gallery: 'Gilroy Gallery',
    Gilroy_Regular: 'Gilroy-Regular',
    GilroyBlack: 'Gilroy-Black',
    GilroyLight: 'Gilroy-Light',
    GilroySemibold: 'Gilroy-Semibold',
    Gilroybold: 'Gilroy-Bold',
    GilroyExtrabold: 'Gilroy-Extrabold',
    GilroyMediumItalic: 'Gilroy-MediumItalic',
    GilroyMedium: 'Gilroy-Medium',
    avenir: 'avenir-Roman',
    ShadowsLight: 'ShadowsIntoLight',
  },

  calcHeight: height => {
    return Height * (height / 100);
  },
  calcWidth: width => {
    return Width * (width / 100);
  },

  Colors: {
    greyishBrown: '#555555',
    brownGrey: '#999999',
    brownGreyTwo: '#aaaaaa',
    veryLightPink: '#cccccc',
    veryLightPinkTwo: '#eaeaea',
    veryWhite: '#f6f6f6',
    whisper: '#ededed',
    allports: '#46829a',
    grey: '#7c7c7c',
    boulder: '#797979',
    whiteSmoke: '#f8f8f8',
    kimberly: '#8174aa',
    greySwan: '#b7b7b7',
    scooter: '#2f829c',
    silver: '#bcbcbc',
    aliceBlue: '#ebf4f8',
    matterhorn: '#4b4b4b',
    gray32: '#525252',
    gray59: '#969696',
    headlineDeepBlue: '#615195',

    // Primary Colors
    orangePink: '#ff6c58',
    flatBlue: '#2f839d',
    paleSkyBlue: '#cee8f0',
    twilight: '#615195',
    babyblue: '#58b0cb',
    // Seconday Colors
    fadedOrange: '#ff953c',
    pale: '#ffead8',
    mango: '#ffb12a',
    gray: '#e6e6e6',

    // Other Colors
    white: '#fff',
    black: '000',
    red: '#990000',
  },

  requires: {
    drawer: require('./images/drawer.png'),
    back: require('./images/Back.png'),
  },


};

export {Assets};
