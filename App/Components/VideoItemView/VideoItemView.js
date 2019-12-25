import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Assets from '../../Assets/Assets';

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
      playerState: this.props.fullScreen
        ? PLAYER_STATES.PLAYING
        : PLAYER_STATES.PAUSED,
      screenType: 'stretch',
      width: this.props.fullScreen ? '99%' : 150,
      height: this.props.fullScreen ? 200 : 150,
      rendered: this.props.fullScreen ? true : false,
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.item.url != this.props.item.url) {
      this.setState({
        paused: false,
        playerState: PLAYER_STATES.PLAYING,
        width: '99%',
        height: 200,
      });
    }
  };

  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    if (this.props.fullScreen) {
      this.setState({
        paused: !this.state.paused,
        playerState,
      });
    } else {
      this.props.setSelectedItem(this.props.item);
    }
  };

  onPausedFirstTime = playerState => {
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
        this.onPausedFirstTime(PLAYER_STATES.PAUSED);
        this.setState({mute: false, rendered: true});
      }
    } else {
      const {isLoading, playerState} = this.state;
      // Video Player will continue progress even if the video already ended
      if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
        this.setState({currentTime: data.currentTime});
      }
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
    <View style={styles.toolbarContainer}>
      <Text
        style={[
          styles.toolbarText,
          {fontSize: this.state.width == 150 ? 5 : 10},
        ]}>
        {this.props.item.title}
      </Text>
      <TouchableOpacity
        onPress={() => this.props.setItemUrl(this.props.item.shareurl)}>
        <Image
          source={Assets.requires.share}
          resizeMode="contain"
          style={[
            styles.shareICon,
            {
              width: this.state.width == 150 ? 12 : 25,
              height: this.state.width == 150 ? 12 : 25,
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
  onSeeking = currentTime => {
    this.setState({currentTime});
  };

  detailsView = fullScreen => {
    return (
      <View
        style={[styles.detailsViewContainer, {marginTop: fullScreen ? 10 : 0}]}>
        <Text style={styles.title}>{this.props.item.title}</Text>
        <Text style={styles.sharedby}>{this.props.item.sharedby}</Text>
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.description}>{this.props.item.description}</Text>
        </ScrollView>
      </View>
    );
  };

  render() {
    return (
      <View>
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
                uri: this.props.item.url,
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
          {this.state.width == 150 && this.detailsView()}
        </View>
        {this.state.width != 150 && this.detailsView(true)}
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
  },
  sharedby: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flex: 1,
    height: 100,
    marginTop: 10,
    backgroundColor: Assets.Colors.white,
  },
  detailsViewContainer: {
    marginLeft: 10,
    flex: 1,
  },
  toolbarText: {color: '#ffffff', fontWeight: 'bold', flex: 1},
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  shareICon: {
    tintColor: '#ffffff',
  },
});
export default VideoItemView;
