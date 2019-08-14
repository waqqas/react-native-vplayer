import React, {Component} from 'react';
import {Dimensions, PanResponder, StyleSheet, View} from 'react-native';
import {Colors, Icon} from '../Themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 2,
    backgroundColor: Colors.primary,
  },
  rect: {
    alignSelf: 'stretch',
    height: 2,
    backgroundColor: Colors.white,
  },
});

class ProgressBar extends Component {
  state = {
    progressBarMoving: false,
  };

  static defaultProps = {
    currentTime: -0.01,
    duration: 0.0,
    onSeekStart: () => {
    },
    onSeekEnd: time => {
    },
    onSeekCancel: () => {},
  };

  componentWillMount() {
    // init panResponder
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderTerminate,
    });

    this._processStyle = {
      style: {
        width: 0,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.progressBarMoving) {
      this._processStyle.style.width =
        this.width *
        this._getProgressPercentage(nextProps.currentTime, nextProps.duration);
    }

    //update only if user select new time

    if (nextProps.currentTime !== this.props.currentTime) {
      this._updateProgress();
    }
  }

  componentDidMount() {
    this.width = Dimensions.get('screen').width;
    this._updateProgress();
  }

  _updateProgress() {
    //update progress bar position
    this.progress && this.progress.setNativeProps(this._processStyle);
  }

  onStartShouldSetPanResponder = (e, gestureState) => {
    return true;
  };

  onMoveShouldSetPanResponder = (e, gestureState) => {
    return true;
  };

  onPanResponderGrant = (e, gestureState) => {
    //users first press down on the progress-bar
    this.props.onSeekStart();
    this._processStyle.style.width = gestureState.x0;
    this._updateProgress();
  };

  onPanResponderMove = (e, gestureState) => {
    //users move over the process bar without release the press.
    this.setState({ progressBarMoving: true });
    this._processStyle.style.width = gestureState.moveX;
    this._updateProgress();
  };

  onPanResponderRelease = (e, gestureState) => {
    this.setState({ progressBarMoving: false });
    //users release the press from the active progress bar
    const _time =
      this._getProgressPercentage(this._processStyle.style.width, this.width) *
      this.props.duration;
    this.props.onSeekEnd(_time);
  };

  onPanResponderTerminate = (e, gestureState) => {
    //users release the press from other place instead of the active progress bar
    this.props.onSeekCancel();
  };

  _getProgressPercentage = (current, total) => {
    if (current > 0) {
      return parseFloat(current) / parseFloat(total);
    } else {
      return 0;
    }
  };

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <View
          onLayout={event => {
            const { width } = event.nativeEvent.layout;
            this.width = width;
          }}
          style={styles.progressContainer}
          {...this._panResponder.panHandlers}
        >
          <View
            ref={progress => {
              this.progress = progress;
            }}
            style={styles.rect}
            {...this._panResponder.panHandlers}
          />
          <View
            style={{
              position: 'absolute',
              left: this._processStyle.style.width - 8,
            }}
            {...this._panResponder.panHandlers}
          >
            <Icon name={'circle'} color={Colors.white} size={16} />
          </View>
        </View>
      </View>
    );
  }
}

export default ProgressBar;
