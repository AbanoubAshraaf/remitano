import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const LoginSignupScreen = props => {
  let [email, setEmail] = useState();
  const {buttonStyle, textStyle} = styles;
  const {onPress, label} = props;

  const handleChange = text => {
    setEmail(text);
  };
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <TextInput style={textStyle} value={label} onChange={handleChange} />
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonStyle: {
    height: 45,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#38ba7d',
    borderBottomWidth: 6,
    borderBottomColor: '#1e6343',
    borderWidth: 1,
    marginLeft: 15,
    marginRight: 15,
  },
};

export default LoginSignupScreen;
