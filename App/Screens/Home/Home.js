import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import Assets, {Width, Height} from '../../Assets/Assets';
import {readData} from '../../FirebaseHelper/firebaseHelper';
import VideoItemView from '../../Components/VideoItemView';
import {ScrollView} from 'react-native-gesture-handler';
import Share, {ShareSheet, Button} from 'react-native-share';
import ShareView from '../../Components/ShareView';

const Home = props => {
  let [data, setData] = useState();
  let [itemUrl, setItemUrl] = useState();
  let [selectedItem, setSelectedItem] = useState();
  let [userName, setUserName] = useState();
  let [navigate, setNavigate] = useState(false);

  let [error, setError] = useState();

  useEffect(() => {
    readData(setData, setError, 'Videos');
  }, []);
  useEffect(() => {
    retrieveData();
    if (data) {
      setSelectedItem(data[0]);
    }
  }, [data]);
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        console.log(value);
        setUserName(value);
      }
    } catch (error) {}
  };
  let renderItem = item => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setSelectedItem(item);
          }}>
          <VideoItemView
            item={item}
            setItemUrl={setItemUrl}
            containScreen={true}
            setSelectedItem={setSelectedItem}
          />
        </TouchableOpacity>
      </>
    );
  };

  const LoginState = () => {
    return userName ? (
      <Text style={styles.userNameText}>  {userName}</Text>
    ) : (
      <TouchableOpacity
        style={styles.loginTextContainer}
        onPress={() => {
          setNavigate(true);
          props.navigation.navigate('LoginSignup');
        }}>
        <Text style={styles.loginText}> Login -></Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {LoginState()}
        {data ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedItem && (
              <VideoItemView
                item={selectedItem}
                setItemUrl={setItemUrl}
                fullScreen={true}
                navigate={navigate}
              />
            )}
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => renderItem(item)}
            />
          </ScrollView>
        ) : (
          <View style={styles.indicator}>
            {!error ? (
              <ActivityIndicator color={Assets.Colors.babyblue} size="large" />
            ) : (
              <Text>{error}</Text>
            )}
          </View>
        )}
        <ShareView url={itemUrl} setItemUrl={setItemUrl} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Assets.calcWidth(99),
    alignSelf: 'center',
    marginTop: 5,
  },
  userNameText: {
    alignSelf: 'flex-end',
    marginRight: 5,
    color: Assets.Colors.remitanoMainColor,
    marginBottom:5
  },
  loginTextContainer: {
    backgroundColor: Assets.Colors.remitanoMainColor,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    color: Assets.Colors.white,
    fontSize: 18,
    width: '20%',
    alignSelf: 'flex-end',
  },
  loginText: {
    color: Assets.Colors.white,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  itemContainer: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: Assets.Colors.brownGrey,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: '100%',
    borderRadius: 20,
    resizeMode: 'stretch',
  },
  indicator: {
    width: Width,
    height: Height,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default Home;
