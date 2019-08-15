import React from 'react';
import styled from 'styled-components';
import {Image, TouchableOpacity,} from 'react-native';
import {Colors, Icon} from '../Themes';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';


export const Processing = styled.ActivityIndicator``;

const AppImageButton = ({source, ...props}) => (
    <TouchableOpacity {...props}>
        <Image
            style={{height: 50, width: 50, resizeMode: 'contain'}}
            source={source}
        />
    </TouchableOpacity>
);

const PlayerGradient = Animatable.createAnimatableComponent(LinearGradient);

const VideoControlBar = ({top, showing, children, ...props}) => {
    const start = top ? {x: 0, y: 0} : {x: 0, y: 1};
    const end = top ? {x: 0, y: 1} : {x: 0, y: 0};
    const animation = top ? (showing ? 'fadeInDown' : 'fadeOutUp') : (showing ? 'fadeInUp' : 'fadeOutDown');

    return (
        <PlayerGradient
            animation={animation}
            {...props}
            start={start}
            end={end}
            colors={['rgba(98,98,98,1)', 'rgba(0,0,0,0)']}
        >
            {children}
        </PlayerGradient>

    );
};
export const ControlBar = styled(VideoControlBar)`
`;

export const ControlOverlay = styled.View`
position: absolute;
top: 0px;
left: 0px;
bottom: 0px;
right: 0px;
flex: 1;
justify-content: space-between;
`;

export const ControlContainer = styled.View`
flex-direction: row;
justify-content: space-between;
padding-horizontal: 10px;
`;

const VideoPlayerButton = ({icon, ...props}) => (
    <TouchableOpacity {...props}>
        <Icon name={icon} size={24} color={Colors.white}/>
    </TouchableOpacity>
);

export const PlayerButton = styled(VideoPlayerButton)`
padding-vertical: 10px;
padding-horizontal: 10px;
`;

export const ControlSet = styled.View`
align-items: center;
flex-direction: row;
justify-content: space-between;
margin-horizontal: 10px;
`;

export const VideoContainer = styled.View`
background-color: ${Colors.black};
justify-content: center;
align-items: center;
`;

export const PlayerTimer = styled.Text`
font-size: 14px;
font-family: Lato-Medium;
color: ${Colors.white};
`;

export const PlayImageButton = styled(AppImageButton)`
position: absolute;
`;

//////////////////// Progress Bar ////////////////////

export const ProgressBarContainer = styled.View`
flex: 1;
background-color: ${Colors.transparent}
padding-vertical: 15;
margin-horizontal: 20;
`;

export const ProgressBarSubContainer = styled.View`
justify-content: center;
align-items: center;
height: 2px;
background-color: ${Colors.primary},
`;

export const PastBar = styled.View`
align-self: stretch;
height: 2px;
background-color: ${Colors.white};
`;
