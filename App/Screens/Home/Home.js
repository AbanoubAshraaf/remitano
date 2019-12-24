import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

class App extends Component {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
    };
  }

  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    //Handler for Replay
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const {isLoading, playerState} = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };

  onLoad = data => this.setState({duration: data.duration, isLoading: false});

  onLoadStart = data => this.setState({isLoading: true});

  onEnd = () => this.setState({playerState: PLAYER_STATES.ENDED});

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {
    alert('Exit full screen');
  };

  enterFullScreen = () => {};

  onFullScreen = () => {
    if (this.state.screenType == 'content') {
      this.setState({screenType: 'cover'});
    } else {
      this.setState({screenType: 'content'});
    }
  };
  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({currentTime});

  render() {
    return (
      <View style={styles.container}>
        <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={{
            uri:
              'https://r3---sn-4g5ednsy.googlevideo.com/videoplayback?expire=1577223502&ei=7jACXu6dE5j7kgbIy6eoDw&ip=2604%3A180%3A3%3A376%3A1041%3Ab55%3Adb8f%3A33bd&id=o-AGfHstoHjvZH-bt4R3bi8rX3SMXi6bz-X4MUG50busTT&itag=43&source=youtube&requiressl=yes&mime=video%2Fwebm&gir=yes&clen=4661256&ratebypass=yes&dur=0.000&lmt=1462969264548371&fvip=3&fexp=23842630&c=WEB&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRAIgUjg_a_MFPRQ3LsgE1sXy0z0BontFw5qiPuWrLAhZ6PQCIFPc5TmI9ZZRH8c6g6-_5ZejAMSbh-tImt3YdV_YS_8x&redirect_counter=1&cm2rm=sn-n4vle7s&req_id=fb460c6ae945a3ee&cms_redirect=yes&mip=41.44.48.176&mm=34&mn=sn-4g5ednsy&ms=ltu&mt=1577201908&mv=m&mvi=2&pl=20&lsparams=mip,mm,mn,ms,mv,mvi,pl&lsig=AHylml4wRQIhAKKLCib-8QUUBIspERqQ4iH0O0dKBcTAbZr5OHEk5NfQAiAf6g6Z6QP4Y3S9BzUygFpyPQ5sfrQQh0Dwd9NAs4jVGw==',
          }}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
          toolbar={this.renderToolbar()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '90%',
    height: 250,
    borderRadius: 20,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    backgroundColor: 'transparent',
    width: '90%',
    height: 250,
  },
});
export default App;
