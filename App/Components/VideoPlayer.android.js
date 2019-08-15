import React from 'react';
import _ from 'lodash';
import {Dimensions, StatusBar, TouchableWithoutFeedback, View} from 'react-native';
import {Colors, Images} from '../Themes';
import Video from 'react-native-video';
import CachedImage from 'react-native-image-cache-wrapper';
import {moment} from '../Libs';
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
import Orientation from 'react-native-orientation-locker';
import VolumeControl, {VolumeControlEvents} from 'react-native-volume-control';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default class VideoPlayer extends React.Component {
  state = {
    height: 200,
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
    hardwareSilent: false,
  };

  player = React.createRef();

  videoSize = {
    height: 1080,
    width: 1920,
  };

  isFirstTime = true;

  controlTimer = null;

  componentDidMount() {
    this.updatePlayerDimensions('PORTRAIT');
    // Add and store event listener
    this.volEvent = VolumeControlEvents.addListener(
      'VolumeChanged',
      this.onVolumeChanged,
    );

    VolumeControl.getVolume().then((volume) => {
      this.setState({ hardwareSilent: (volume === 0) });

    });
  }

  componentWillUnmount() {
    if (this.controlTimer) {
      clearTimeout(this.controlTimer);
      this.controlTimer = null;
    }

    this.setState({ paused: true });
    this.volEvent.remove();
  }

  onVolumeChanged = ({ volume }) => {
    this.setState({ hardwareSilent: (volume === 0), muted: (volume === 0) });
  };

  updatePlayerDimensions(orientation) {
    // set container height based on video dimensions
    if (orientation === 'PORTRAIT') {
      // calculate height based on screen width
      const height = (this.videoSize.height / this.videoSize.width) * SCREEN_WIDTH;
      this.setState({ height, width: SCREEN_WIDTH });

    } else if (orientation.substring(0, 9) === 'LANDSCAPE') {
      // calculate width based on screen height
      const width = (this.videoSize.width / this.videoSize.height) * SCREEN_WIDTH;
      this.setState({ height: SCREEN_WIDTH, width });

    }
  }

  onLoad = ({ naturalSize, duration }) => {
    this.videoSize = naturalSize;
    const height = (this.videoSize.height / this.videoSize.width) * SCREEN_WIDTH;
    this.setState({ height, width: SCREEN_WIDTH });
    this.setState({ duration, loading: false, paused: true });
  };

  onEnd = () => {
    this.setState({ paused: true, videoEnded: true });
    this.player.current.seek(0);
  };

  onProgress = ({ currentTime }) => {
    this.setState({ currentTime });

  };

  onPressPlay = () => {
    if (this.isFirstTime === true) {
      this.player.current.seek(0);
      this.isFirstTime = false;
    }
    this.setState({ paused: false, videoEnded: false });
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
    if (this.state.fullscreen === false) {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true);
    } else {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    }
    this.setState({ fullscreen: !this.state.fullscreen }, () => {
      this.props.onFullScreen(this.state.fullscreen);
    });

    Orientation.getOrientation(orientation => {
      this.updatePlayerDimensions(orientation);
    });
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
              onProgress={this.onProgress}
              ignoreSilentSwitch={'obey'}
              resizeMode='contain'
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
              {loading && <Processing color={Colors.white} animating={true}/>}
            </CachedImage>}
            {!loading && paused && (
              <React.Fragment>
                <PlayImageButton
                  source={Images.playButton}
                  onPress={this.onPressPlay}
                />
                {fullscreen && <View style={{ position: 'absolute', left: 20, top: 20 }}>
                  <PlayerButton icon={'cancel'} onPress={this.onPressFullScreen}/>
                </View>}
              </React.Fragment>
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
                    <PlayerButton icon={fullscreen ? 'resize-small' : 'resize-full'} onPress={this.onPressFullScreen}/>
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


