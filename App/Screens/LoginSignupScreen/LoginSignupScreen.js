import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  AsyncStorage,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Assets from '../../Assets/Assets';
import firebase from 'firebase';
import ActivityIndicatorView from '../../Components/ActivityIndicator';

const LoginSignupScreen = props => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  const {onPress, label} = props;

  const handleChange = text => {
    setEmail(text);
  };

  const isValidate = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.length < 1 || password.length < 1) {
      setError('Please fill all fields');
    } else if (password.length < 6) {
      setError('Password should be at least 6 characters');
    } else if (reg.test(email) === false) {
      setError('Please enter valid email');
    } else {
      setError(false);
      onSubmit();
    }
  };

  const onSubmit = () => {
    console.log('name', email);
    console.log('name', password);
    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        setLoading(false);
        AsyncStorage.setItem('email', email);

        props.navigation.replace('Home');
      })
      .catch(error => {
        console.log('erro1', error);

        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(response => {
            setLoading(false);
            AsyncStorage.setItem('email', email);
            props.navigation.replace('Home');
          })
          .catch(error => {
            setLoading(false);
            alert('Sorry, Please try again!');
            console.log('erro2', error);
          });
      });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={Keyboard.dismiss}>
      <Text style={styles.title}>Enter your email</Text>
      <TextInput
        style={styles.textStyle}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder={'E-mail'}
      />
      <TextInput
        style={styles.textStyle}
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder={'Password'}
      />
      {error && <Text style={styles.error}>*{error}</Text>}
      <TouchableOpacity style={{width: '60%'}} onPress={isValidate}>
        <Text style={styles.LoginRegisterText}>Login/Register</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicatorView />}
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textStyle: {
    height: 40,
    alignSelf: 'stretch',
    borderWidth: 0.5,
    borderRadius: 5,
    marginHorizontal: 30,
    marginTop: 10,
    paddingLeft: 10,
  },
  LoginRegisterText: {
    backgroundColor: '#713B87',
    height: 40,
    marginTop: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: Assets.Colors.white,
    fontSize: 18,
  },
  error: {
    color: Assets.Colors.red,
    fontSize: 10,
    alignSelf: 'flex-start',
    marginLeft: 35,
    marginTop: 5,
  },
};

export default LoginSignupScreen;
