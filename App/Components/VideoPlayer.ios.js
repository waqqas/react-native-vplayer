import React from 'react';
import {Dimensions, StatusBar, TouchableWithoutFeedback, View} from 'react-native';
import _ from 'lodash';
import {Colors, Images} from '../Themes';
import Video from 'react-native-video';
import CachedImage from 'react-native-image-cache-wrapper';
import moment from '../Libs/Moment';
import {
  ControlBar,
  ControlContainer,
  ControlOverlay,
  ControlSet,
  PlayerButton,
  PlayerTimer,
  PlayImageButton,
  Processing,
  VideoContainer,
} from '../Themes/ApplicationStyles';
import ProgressBar from './ProgressBar';
import SilentSwitch from 'react-native-silent-switch';
import {VolumeControlEvents} from 'react-native-volume-control';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default class VideoPlayer extends React.Component {
  state = {
    height: 180,
    width: SCREEN_WIDTH,
    paused: true,
    showControls: false,
    muted: false,
    currentTime: 0,
    duration: 0,
    loading: true,
    videoEnded: true,
    connected: this.props.connected,
    fullscreen: false,
    silentSwitch: false,
    hardwareSilent: false,
  };

  videoSize = {
    height: 1080,
    width: 1920,
  };


  player = React.createRef();

  controlTimer = null;

  componentDidMount() {
    const height = (this.videoSize.height / this.videoSize.width) * SCREEN_WIDTH;
    this.setState({ height, width: SCREEN_WIDTH });

    SilentSwitch.addEventListener(silentSwitch => {
      this.setState({ silentSwitch, muted: silentSwitch });
    });

    // Add and store event listener
    this.volEvent = VolumeControlEvents.addListener(
      'VolumeChanged',
      this.onVolumeChanged,
    );
  }

  componentWillUnmount(): void {
    if (this.controlTimer) {
      clearTimeout(this.controlTimer);
      this.controlTimer = null;
    }
    this.setState({ paused: true });
    SilentSwitch.removeEventListener();

    this.volEvent.remove();
  }

  onVolumeChanged = ({ volume }) => {
    this.setState({ hardwareSilent: (volume === 0), muted: (volume === 0) });
  };

  onLoad = ({ naturalSize, duration }) => {
    const height = (naturalSize.height / naturalSize.width) * SCREEN_WIDTH;
    this.setState({ height, width: SCREEN_WIDTH });

    this.setState({ duration, loading: false, paused: true });
  };

  onEnd = () => {
    this.player.current.seek(0);
  };

  onProgress = ({ currentTime }) => {
    this.setState({ currentTime });
  };

  onPlaybackRateChange = ({ playbackRate }) => {
    if (this.state.fullscreen === true) {
      this.setState({ paused: (playbackRate === 0) });
    }
  };

  onSeek = ({ seekTime }) => {
    if (seekTime === 0) {
      this.setState({ paused: true, videoEnded: true });
    }
  };

  onPressPlay = () => {
    this.setState({ paused: false, videoEnded: false });
    return true;
  };

  onPressToggleSound = () => {
    if (this.state.hardwareSilent === false) {
      this.setState({ muted: !this.state.muted });
    }
    this.startControlTimer();
  };

  onPressBack15 = () => {
    const currentTime = _.clamp(this.state.currentTime - 15, 0, this.state.duration);
    this.player.current.seek(currentTime);
    this.startControlTimer();
  };

  onPressTogglePause = () => {
    this.setState({ paused: !this.state.paused });
    this.startControlTimer();
  };

  onPressForward15 = () => {
    const currentTime = _.clamp(this.state.currentTime + 15, 0, this.state.duration);
    this.player.current.seek(currentTime);
    this.startControlTimer();
  };

  onPressFullScreen = () => {
    this.setState({ fullscreen: true });
  };

  hideControls = () => {
    this.setState({ showControls: false });
  };

  startControlTimer = () => {
    if (this.controlTimer) {
      clearTimeout(this.controlTimer);
      this.controlTimer = null;
    }
    this.controlTimer = setTimeout(this.hideControls, 5000);
  };

  onSeekStart = () => {
    clearTimeout(this.controlTimer);
  };

  onSeekEnd = (currentTime) => {
    this.startControlTimer();
    this.player.current.seek(currentTime);
  };

  onPressVideo = () => {
    this.setState({ showControls: !this.state.showControls }, () => {
      if (this.state.showControls === true) {
        this.startControlTimer();
      }
    });

  };

  render() {
    const { poster, loadPlayer, ...props } = this.props;
    const { height, width, paused, showControls, muted, hardwareSilent, currentTime, loading, videoEnded, fullscreen, duration } = this.state;

    const mute = muted || hardwareSilent;

    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black,
      }}>
        <TouchableWithoutFeedback onPress={this.onPressVideo}>
          <VideoContainer style={{ height, width }}>
            {loadPlayer && <Video
              ref={this.player}
              paused={paused}
              muted={mute}
              onLoad={this.onLoad}
              onEnd={this.onEnd}
              onSeek={this.onSeek}
              onProgress={this.onProgress}
              onPlaybackRateChange={this.onPlaybackRateChange}
              resizeMode='contain'
              ignoreSilentSwitch={'ignore'}
              fullscreen={fullscreen}
              fullscreenOrientation={'landscape'}
              onFullscreenPlayerDidDismiss={() => {
                StatusBar.setHidden(false);
                this.setState({ fullscreen: false });
              }}
              style={{
                flex: 1,
                height: '100%',
                width: '100%',
                position: 'absolute',
              }}
              {...props}
            />}
            {videoEnded &&
            <CachedImage style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
                         source={{ uri: poster }} resizeMode={'cover'}>
              {loading ? <Processing color={Colors.white} animating={true}/> : null}
            </CachedImage>}
            {!loading && paused && (
              <PlayImageButton
                source={Images.playButton}
                onPress={this.onPressPlay}
              />
            )}
            {!paused && <ControlOverlay>
              <ControlBar top showing={showControls}>
                <ControlContainer>
                  <View/>
                  <ControlSet>
                    <PlayerButton icon={mute ? 'volume-off' : 'volume-on'} onPress={this.onPressToggleSound}/>
                  </ControlSet>
                </ControlContainer>
              </ControlBar>
              <ControlBar showing={showControls}>
                <ProgressBar onSeekStart={this.onSeekStart} onSeekEnd={this.onSeekEnd} currentTime={currentTime}
                             duration={duration}/>
                <ControlContainer>
                  <ControlSet style={{ width: 170 }}>
                    <PlayerButton icon={'back-15'} onPress={this.onPressBack15}/>
                    <PlayerButton icon={paused ? 'play' : 'pause'} onPress={this.onPressTogglePause}/>
                    <PlayerButton icon={'forward-15'} onPress={this.onPressForward15}/>
                  </ControlSet>
                  <ControlSet>
                    <PlayerTimer>{moment.duration(currentTime, 'seconds').format('hh:mm:ss', { trim: false })}</PlayerTimer>
                    <PlayerButton icon={'resize-full'} onPress={this.onPressFullScreen}/>
                  </ControlSet>
                </ControlContainer>
              </ControlBar>
            </ControlOverlay>}
          </VideoContainer>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
