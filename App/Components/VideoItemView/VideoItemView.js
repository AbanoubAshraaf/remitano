import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {TextInput, ScrollView} from 'react-native-gesture-handler';

class VideoItemView extends Component {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      mute: true,
      playerState: PLAYER_STATES.PAUSED,
      screenType: 'stretch',
      width: 150,
      height: 150,
      rendered: false,
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
    if (!this.state.rendered) {
      if (data.currentTime > 0.09) {
        this.setState({mute: false, rendered: true});
        this.onPaused(PLAYER_STATES.PAUSED);
      }
    } else {
      const {isLoading, playerState} = this.state;
      // Video Player will continue progress even if the video already ended
      if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
        this.setState({currentTime: data.currentTime});
      }
      console.log('dataTime', data.currentTime);
      console.log('mute', this.state.mute);
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
    if (this.state.width == 150) {
      this.setState({width: '99%', height: 200});
    } else {
      this.setState({width: 150, height: 150});
    }
  };
  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => {
    this.setState({currentTime});
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.VideoContainer,
            {
              height: this.state.height,
              width: this.state.width,
            },
          ]}>
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
                'https://r5---sn-4g5ednsz.googlevideo.com/videoplayback?expire=1577233683&ei=s1gCXp7XM5nlkgaCoKLQDA&ip=2604%3A180%3A3%3A376%3A1041%3Ab55%3Adb8f%3A33bd&id=o-AM-yeTZhja_M1uqgSQmNEtuTc8y0IB0gUDsL4Iq0Xc-J&itag=18&source=youtube&requiressl=yes&mime=video%2Fmp4&gir=yes&clen=5301951&ratebypass=yes&dur=66.501&lmt=1558113611533227&fvip=5&fexp=23842630&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRgIhAI0tSn_FrYZzUgOUH1ajeiJKUCx8U831sk9phQR-RPhUAiEAoA9Qt8Of5Ie1vjqLvmfBgQdQVDntqTQMLo68IGbD5oI%3D&redirect_counter=1&cm2rm=sn-n4ve676&req_id=d3f401a0f8f6a3ee&cms_redirect=yes&mip=41.44.48.176&mm=34&mn=sn-4g5ednsz&ms=ltu&mt=1577212049&mv=m&mvi=4&pl=19&lsparams=mip,mm,mn,ms,mv,mvi,pl&lsig=AHylml4wRQIgOXQz80MGz5Ok8e_wFjZ_YsRl49Mzl2vSPdBLyUdhIrgCIQCOa6EpKdzW8eYZzEgGChqs-un4POPsfqw6Y1gdEHotgg==',
            }}
            style={styles.mediaPlayer}
            volume={this.state.rendered ? 1 : 0}
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
        {this.state.width == 150 && (
          <View style={{marginLeft: 10}}>
            <Text style={styles.title}>{this.props.item.title}</Text>
            <Text style={styles.sharedby}>{this.props.item.sharedby}</Text>
            <ScrollView style={{flex: 1, height: 100}}>
              <Text style={styles.description}>
                {this.props.item.description}
              </Text>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  VideoContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    borderWidth: 0.5,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  mediaPlayer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  description: {
    fontSize: 12,
    width: 150,
    marginTop: 10,
  },
  sharedby: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 11,
    fontWeight: 'bold',
  },
});
export default VideoItemView;
