import React from 'react';
import styled from 'styled-components';
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import Video from 'react-native-video';
import { Colors, Icon, Images } from '../Themes';
import i18n from '../I18n';
import CachedImage from 'react-native-image-cache-wrapper';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
import WebView from 'react-native-webview';
import CacheableImage from '../Libs/Image';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export const StyledStatusBar = ({ style, ...props }) => {
  return (
    <StatusBar
      backgroundColor={Colors.transparent}
      translucent={true}
      barStyle={'light-content'}
      {...props}
    />
  );
};

export const AppStatusBar = styled(StyledStatusBar)``;

export const Screen = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

export const AppView = ({ fixed, cornerImage, children, style, ...props }) => {
  if (fixed) {
    return (
      <View
        style={[{ flex: 1, backgroundColor: Colors.backgroundColor }, style]}
        {...props}
      >
        {cornerImage && (
          <Image
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: 230,
              resizeMode: 'contain',
            }}
            source={Images.logoTreeCorner}
          />
        )}
        {children}
      </View>
    );
  } else {
    return (
      <View
        style={[{
          flex: 1,
          backgroundColor: Colors.backgroundColor,
          position: 'relative',
        }]}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1, backgroundColor: Colors.backgroundColor }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style}
          keyboardShouldPersistTaps={'handled'}
          automaticallyAdjustContentInsets={false}
          extraScrollHeight={120}
          enableOnAndroid={true}
        >
          {children}
        </KeyboardAwareScrollView>
        {cornerImage && (
          <Image
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: 230,
              resizeMode: 'contain',
            }}
            source={Images.logoTreeCorner}
          />
        )}
      </View>
    );
  }
};

export const Content = styled(AppView)`
  padding-horizontal: ${props => props.padding || 0}px;
  padding-vertical: ${props => props.paddingVertical || 0}px;
`;

const BackgroundImage = ({ children, ...props }) => (
  <CachedImage {...props}>{children}</CachedImage>
);

export const BackgroundImageView = styled(BackgroundImage)`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: grey;
`;

const QuoteTitle = styled.Text`
  font-family: Lato-Regular;
  font-size: ${Platform.OS === 'ios' ? 18 : 14}px;
  color: ${Colors.white};
`;

const QuoteText = styled.Text`
  font-family: Lato-Regular;
  font-size: ${Platform.OS === 'ios' ? 22 : 18}px;
  color: ${Colors.white};
  line-height: 29.6;
  text-align: center;
`;

const QuoteAuthor = styled.Text`
  font-family: Lato-Regular;
  font-size: ${Platform.OS === 'ios' ? 18 : 14}px;
  color: ${Colors.white};
  line-height: 24.3;
`;

const QuoteDivider = styled.View`
  height: 1.5;
  width: ${SCREEN_WIDTH * 0.5};
  background-color: ${Colors.quoteDivider};
  margin-vertical: 15px;
`;

export const QuoteOfTheDay = ({ quote, author, ...props }) => (
  <TouchableOpacity {...props}>
    <QuoteTitle>{i18n.t('qotd.title')}</QuoteTitle>
    <QuoteDivider/>
    <QuoteText>{quote}</QuoteText>
    <QuoteDivider/>
    <QuoteAuthor>{author}</QuoteAuthor>
  </TouchableOpacity>
);

export const QuoteOfTheDayText = styled(QuoteOfTheDay)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-horizontal: 36px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-family: Lato-Regular;
  color: ${props =>
  props.active ? Colors.primary : props.color || Colors.white};
  text-align: center;
`;

export const Processing = styled.ActivityIndicator``;

export const AppButton = ({
                            active,
                            spinner,
                            disabled,
                            children,
                            textProps,
                            onPress,
                            hideUnderlayColor,
                            ...props
                          }) => (
  <TouchableHighlight
    underlayColor={Boolean(hideUnderlayColor) ? Colors.white : Colors.pressed}
    disabled={Boolean(disabled)}
    onPress={disabled ? () => {
    } : () => {
      setTimeout(onPress);
    }}
    {...props}
  >
    <React.Fragment>
      {!spinner && (
        <ButtonText active={active} {...textProps}>
          {children}
        </ButtonText>
      )}
      {spinner && (
        <Processing
          color={props.backgroundColor || Colors.primary}
          animating={spinner}
        />
      )}
    </React.Fragment>
  </TouchableHighlight>
);

export const LogoImage = styled.Image`
  width: 100%;
  height: 125px;
  margin-bottom: 50px;
  resize-mode: contain;
`;

const AppBanner = ({ height, ...props }) => (
  <LinearGradient
    start={{ x: 1, y: 0 }}
    end={{ x: 0, y: 1 }}
    colors={['rgb(144,114,152)', 'rgb(80,47,89)']}
    height={height}
    style={{
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 27,
      paddingTop: 90,
    }}
  >
    <LogoImage {...props} />
  </LinearGradient>
);

export const Banner = styled(AppBanner)``;

export const Button = styled(AppButton)`
  margin-horizontal: ${props =>
  props.marginHorizontal ? props.marginHorizontal : '0px'};
  align-self: stretch;
  padding-vertical: 12px;
  margin-top: 12px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '23px')};
  border-radius: 8px;
  height: 45px;
  border-right-color: ${Colors.transparent};
  border-left-color: ${Colors.transparent};
  background-color: ${props =>
  props.disabled ? Colors.disabled : Colors.active};
  z-index: 100;
`;

const SkipButtonText = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
  font-family: Lato-Regular;
`;

const AppSkipButton = ({ onPress, ...props }) => (
  <TouchableOpacity onPress={onPress} {...props}>
    <SkipButtonText>{i18n.t('button.skip')}</SkipButtonText>
  </TouchableOpacity>
);

export const SkipButton = styled(AppSkipButton)`
  position: absolute;
  width: 100px;
  height: 50px;
  top: 20;
  right: 0;
  justify-content: center;
  align-items: center;
  z-index: 101;
  background-color: ${Colors.transparent};
`;

const IntroVideoBack = ({ onPress, ...props }) => (
  <TouchableOpacity onPress={onPress} {...props}>
    <Icon name='back' size={24} color={Colors.white}/>
  </TouchableOpacity>
);

export const IntroVideoBackButton = styled(IntroVideoBack)`
  height: 66px;
  width: 50px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 8;
  left: 0;
`;

export const SignUpTryForFreeButtons = ({
                                          spinner,
                                          disabled,
                                          children,
                                          textProps,
                                          signUpText,
                                          tryForFreeText,
                                          onSignUpPress,
                                          onTryForFreePress,
                                          ...props
                                        }) => (
  <View {...props}>
    <TouchableOpacity
      onPress={!disabled ? onSignUpPress : null}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: `${Colors.primary}`,
      }}
    >
      <ButtonText color={Colors.text}>{signUpText}</ButtonText>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={!disabled ? onTryForFreePress : null}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!spinner && (
        <ButtonText color={Colors.text}>{tryForFreeText}</ButtonText>
      )}
      {spinner && (
        <Processing
          color={props.backgroundColor || Colors.primary}
          animating={spinner}
        />
      )}
    </TouchableOpacity>
  </View>
);

export const SignUpTryFree = styled(SignUpTryForFreeButtons)`
  margin-horizontal: ${props =>
  props.marginHorizontal ? props.marginHorizontal : '0px'};
  align-self: stretch;
  flex-direction: row;
  height: 38px;
  margin-bottom: 45px;
`;

export const ForgotYourPasswordButton = ({ children, onPress, ...props }) => (
  <TouchableOpacity onPress={onPress} {...props}>
    <ButtonText color={Colors.text}>{i18n.t('button.forgotPassword')}</ButtonText>
  </TouchableOpacity>
);

export const ForgotPasswordButton = styled(ForgotYourPasswordButton)`
  margin-bottom: 30px;
  align-self: stretch;
  margin-horizontal: 40px;
`;

export const ErrorText = styled.Text`
  margin-bottom: ${props =>
  props.marginBottom ? `${props.marginBottom}px` : '0px'};
  margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : '0px')};
  font-size: 12px;
  font-family: Lato-Regular;
  color: ${props => props.color || Colors.white};
  text-align: center;
`;

export const Form = styled.View`
  height: ${props => (props.height ? `${props.height}px` : '135px')};
  justify-content: center;
  background-color: ${Colors.white};
  margin-top: ${props => (props.marginTop ? props.marginTop : '-75px')};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '7px')};
  margin-horizontal: ${props =>
  props.marginHorizontal ? props.marginHorizontal : '0px'};
  z-index: 100;
  border-width: ${props => (props.error ? '1.5px' : '0px')};
  border-color: ${props => (props.error ? Colors.error : Colors.transparent)};
  align-self: stretch;
  border-radius: 8px;
  box-shadow: 2px 0px 10px ${Colors.thumbnailShadow};
  shadow-opacity: 0.3;
  elevation: 10;
`;

export const InfoText = styled.Text`
  font-family: Lato-Light;
  margin-top: 25px;
  font-size: ${Platform.OS === 'android' ? 16 : 18}px;
  color: ${Colors.text};
  text-align: center;
`;

const AppEmptyList = ({ source, children, ...props }) => (
  <View {...props}>
    <InfoImage source={source}/>
    <InfoTitle>{children}</InfoTitle>
  </View>
);
export const EmptyList = styled(AppEmptyList)`
  padding-horizontal: 45px;
  flex: 1;
  align-items: center;
`;
export const InfoImage = styled.Image`
  height: 110px;
  resize-mode: contain;
  margin-top: 52px;
  margin-bottom: 45px;
`;

export const InfoTitle = styled.Text`
  font-family: Lato-Regular;
  font-size: 22px;
  text-align: center;
  color: ${Colors.text};
`;

export const BoldImage = styled.Image`
  align-self: center;
  margin-top: 52px;
`;

export const SuccessText = styled.Text`
  font-family: Lato-Light;
  font-size: 22px;
  margin-top: 45px;
  margin-bottom: 31px;
  text-align: center;
  color: ${Colors.text};
`;

export const FormInputBorder = styled.View`
  align-self: stretch;
  margin-horizontal: 15;
  height: 1.5;
  margin-vertical: ${Platform.OS === 'ios' ? 7 : 5}px;
  background-color: ${Colors.formInputBorder};
`;

export const TextButton = styled(AppButton)``;

const IconHeaderButton = props => (
  <HeaderButton
    {...props}
    IconComponent={Icon}
    style={{ color: Colors.white }}
  />
);

const AppNavButton = ({ size, ...props }) => (
  <HeaderButtons HeaderButtonComponent={IconHeaderButton}>
    <Item {...props} iconSize={size || 24} color={Colors.white} title={'i1'}/>
  </HeaderButtons>
);
export const NavButton = styled(AppNavButton)``;

const ThumbnailImage = styled(CacheableImage)`
  width: 100%;
  height: 100%;
`;

const AppVideoThumbnail = ({ source, locked, ...props }) => (
  <View {...props}>
    <ThumbnailImage source={source}/>
    {locked && <LockedView/>}
  </View>
);

const VideoThumbnail = styled(AppVideoThumbnail)`
  height: 100px;
  width: 100px;
  overflow: hidden;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: ${Colors.white};
  box-shadow: 2px 0px 10px ${Colors.thumbnailShadow};
  border-radius: 8px;
  shadow-opacity: 0.2;
  elevation: 10;
`;

const AppVideoTitle = ({ children, ...props }) => (
  <Text ellipsizeMode={'tail'} numberOfLines={2} {...props}>
    {children}
  </Text>
);

const VideoTitle = styled(AppVideoTitle)`
  font-size: ${Platform.OS === 'android' ? 13 : 16}px;;
  font-family: Lato-Regular;
  padding-right: 25px;
  padding-right: 25px;
  color: ${Colors.text};
`;

const VideoTimeText = styled.Text`
  margin-left: 7px;
  color: ${Colors.subtitle};
  font-size: ${Platform.OS === 'android' ? 13 : 16}px;;
`;

const VideoTime = ({ time, ...props }) => (
  <View {...props}>
    <Icon name={'clock'} size={20} color={Colors.subtitle}/>
    <VideoTimeText>{time}</VideoTimeText>
  </View>
);

export const VideoTimeView = styled(VideoTime)`
  flex-direction: row;
  margin-top: 9px;
  margin-bottom: 4px;
  margin-horizontal: ${props => (props.margin ? props.margin : 0)}px;
`;

const VideoDetail = ({ videoTitle, videoTime, ...props }) => (
  <View {...props}>
    <VideoTitle>{videoTitle}</VideoTitle>
    <VideoTimeView time={videoTime}/>
  </View>
);

const VideoDetailView = styled(VideoDetail)`
  background-color: ${Colors.white};
  flex: 1;
  padding-left: 100px;
  padding-vertical: 12px;
  margin-bottom: 15px;
  margin-left: 15px;
  box-shadow: 2px 0px 20px ${Colors.thumbnailShadow};
  shadow-opacity: 0.2;
  elevation: 10;
  border-radius: 8px;
`;

const AppImageButton = ({ source, ...props }) => (
  <TouchableOpacity {...props}>
    <Image
      style={{ height: 50, width: 50, resizeMode: 'contain' }}
      source={source}
    />
  </TouchableOpacity>
);

const ImageButton = styled(AppImageButton)`
  position: absolute;
  top: 25;
  right: -20;
  justify-content: center;
  margin-left: -25px;
  margin-bottom: 15px;
  elevation: 10;
`;

const VideoItem = ({ source, videoTitle, videoTime, onPress, locked, ...props }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View {...props}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <VideoDetailView videoTitle={videoTitle} videoTime={videoTime}/>
        <ImageButton
          source={Images.videoListPlayIcon}
          onPress={onPress}
          activeOpacity={1}
        />
      </View>
      <VideoThumbnail source={source} locked={locked}/>
    </View>
  </TouchableWithoutFeedback>
);

export const VideoRow = styled(VideoItem)`
  height: 110px;
  background-color: ${Colors.transparent};
  flex-direction: row;
  margin-vertical: 15px;
  margin-horizontal: 20px;
`;

const PlayerGradient = Animatable.createAnimatableComponent(LinearGradient);

const VideoControlBar = ({ top, showing, children, ...props }) => {
  const start = top ? { x: 0, y: 0 } : { x: 0, y: 1 };
  const end = top ? { x: 0, y: 1 } : { x: 0, y: 0 };
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

const VideoPlayerButton = ({ icon, ...props }) => (
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


export const FullScreenVideo = styled(Video)`
position: absolute;
top: 0px;
left: 0px;
bottom: 0px;
right: 0px;
`;

const AppCategoryImage = ({ ...props }) => (
  <View
    style={{
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      height: 95,
      width: '100%',
      overflow: 'hidden',
    }}
  >
    <CacheableImage {...props} />
  </View>
);

const CategoryImage = styled(AppCategoryImage)`
height: 100%;
`;

const CategoryTitleText = styled.Text`
font-size: ${Platform.OS === 'android' ? 13 : 16}px;
font-family: Lato-Regular;
color: ${Colors.white};
`;

const CategoryTitleView = ({ title, ...props }) => (
  <View {...props}>
    <CategoryTitleText>{title}</CategoryTitleText>
  </View>
);

const CategoryTitle = styled(CategoryTitleView)`
align-self: stretch;
background-color: ${Colors.primary};
height: 30px;
justify-content: center;
align-items: center;
flex: 1;
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
`;

const LockedIcon = ({ ...props }) => (
  <Icon name={'login'} size={24} color={Colors.white} {...props} />
);

const AppLockedView = ({ ...props }) => (
  <View {...props}>
    <LockedIcon/>
  </View>
);
const LockedView = styled(AppLockedView)`
position: absolute;
align-items: center;
justify-content: center;
flex: 1;
border-radius: 8px;
top: 0;
right: 0;
height: 100%;
width: 100%;
background-color: ${Colors.categoryOverlay};
opacity: 0.35;
`;

const CategoryItemView = ({ imageSrc, title, ...props }) => (
  <TouchableOpacity {...props}>
    <CategoryImage source={imageSrc}/>
    <CategoryTitle title={title}/>
  </TouchableOpacity>
);

const CategoriesText = styled.Text`
font-family: Lato-Regular;
font-size: 14px;
color: ${Colors.text};
`;

const CategoriesTextView = ({ text, ...props }) => (
  <View {...props}>
    <CategoriesText>{text}</CategoriesText>
  </View>
);


export const CategorySectionHeader = styled(CategoriesTextView)`
height: 30px;
width: 100%;
padding-horizontal: 20px;
justify-content: center;
`;

export const CategoryView = styled.View`
width: 100%;
background-color: ${Colors.almostWhite}
box-shadow: 2px 0px 10px ${Colors.sectionShadow};
border-color: ${Colors.almostWhite};
border-width: 1px;
shadow-opacity: 0.3;
border-width: 1px;
elevation: 20px;
`;

export const CategorySectionFooter = styled.View`
width: 100%;
`;

export const CategoryItem = styled(CategoryItemView)`
height: 125px;
border-radius: 8px;
width: ${props => (props.width ? props.width : '27%')};
margin: 10px;
justify-content: center;
align-items: center;
elevation: 10;
`;

const FreeUserTitle = styled.Text`
font-family: Lato-SemiBold;
font-size: 18px;
color: ${Colors.anonymousUserText};
text-align: center;
margin-bottom: 10px;
`;

const FreeUserListText = styled.Text`
margin-left: 10px;
font-family: Lato-Regular;
font-size: 16px;
color: ${Colors.anonymousUserText};
text-align: center;
`;

const FreeUserListContent = ({ listItem, ...props }) => (
  <View {...props}>
    <FreeUserListText>• {listItem}</FreeUserListText>
  </View>
);

const FreeUserList = styled(FreeUserListContent)`
flex-direction: row;
align-items: center;
margin-vertical: 3px;
justify-content: center;
`;

const AnonymousView = ({
                         heading,
                         listItem1,
                         listItem2,
                         listItem3,
                         ...props
                       }) => (
  <View {...props}>
    <FreeUserTitle>{heading}</FreeUserTitle>
    <FreeUserList listItem={listItem1}/>
    <FreeUserList listItem={listItem2}/>
    <FreeUserList listItem={listItem3}/>
  </View>
);

export const InfoBlock = styled(AnonymousView)`
margin-bottom: 20px;
margin-horizontal: 20px;
margin-top: ${props => (props.marginTop ? props.marginTop : 0)}px;
`;


export const InfoBlockTitle = styled.Text`
font-family: Lato-SemiBold;
font-size: 18px;
color: ${Colors.text};
text-align: center;
margin-bottom: 10px;
`;

export const InfoListText = styled.Text`
margin-left: 10px;
font-family: Lato-Regular;
font-size: 16px;
color: ${Colors.text};
text-align: center;
`;


export const InfoBlock2 = styled.View`
margin-bottom: 20px;
margin-horizontal: 20px;
`;

export const Heading3 = styled.Text`
              font-family: Lato-Bold;
              font-size: 23px;
              margin-top: 25px;
              margin-bottom: 15px;
              color: ${Colors.greyishBrown};
              `;

export const Heading4 = styled.Text`
              font-family: Lato-Medium;
              font-size: 18px;
              margin-top: 15px;
              color: ${Colors.greyishBrown};
              `;

export const Heading5 = styled.Text`
              font-family: Lato-Medium;
              font-size: 16px;
              margin-top: 15px;
              color: ${Colors.greyishBrown};
              `;

export const RowText = styled.Text`
              flex: 1;
              font-family: Lato-Regular;
              font-size: 16px;
              color: ${props => props.color || Colors.charcoalGrey};
              margin-left: 15px;
              `;

export const TabBarView = styled.View`
height: ${DeviceInfo.hasNotch() === true ? 66 : 56}px;
flex-direction: row;
box-shadow: -2px 0px 20px ${Colors.sectionShadow};
shadow-opacity: 0.15;
background-color: ${Colors.white};
border-color: ${Colors.white};
border-width: 1px;
elevation: 20;
`;

export const RowIcon = styled(Icon)`
font-size: ${props => props.size || 24}px;
color: grey;
`;

export const TabIcon = styled.Image`
height: 35px;
width: 35px;
`;

// prettier-ignore
export const TabLabel = styled.Text`
font-family: Lato-Regular;
font-size: 10px;
align-self: center;
color: ${Colors.text};
`;

////////////////********************** Video Player ******************************* */
const TagsText = styled.Text`
              font-family: Lato-Regular;
              font-size: ${Platform.OS === 'android' ? 11 : 14}px;
              color: ${Colors.white};
              `;

const TagsButton = ({ tag, ...props }) => (
  <View {...props}>
    <TagsText>{tag}</TagsText>
  </View>
);

export const TagButton = styled(TagsButton)`
              height: 25px;
              border-radius: 15px;
              background-color: ${Colors.tagColor};
              justify-content: center;
              align-items: center;
              margin-horizontal: 10px;
              margin-vertical: 5px;
              padding-horizontal: 8px;
              `;

export const TagsContainer = styled.View`
              flex-direction: row;
              margin-horizontal: 13px;
              flex-wrap: wrap;
              margin-vertical: 10px;
              `;

const VideoTitleText = styled.Text`
              font-family: Lato-Regular;
              font-size: ${Platform.OS === 'android' ? 18 : 22}px;
              color: ${Colors.text};
              `;

const VideoTitleView = ({ title, ...props }) => (
  <View {...props}>
    <VideoTitleText>{title}</VideoTitleText>
  </View>
);

export const VideoPlayerTitle = styled(VideoTitleView)`
margin-horizontal: 23px;
`;

export const VideoDescriptionContainer = styled.View`
flex: 1;
margin-bottom: 10px;
`;

const AppVideoDescriptionPara = ({ children, ...props }) => (
  <Text {...props}>{children}</Text>
);

export const VideoDescriptionPara = styled(AppVideoDescriptionPara)`
              font-family: Lato-Light;
              font-size: ${Platform.OS === 'android' ? 15 : 18}px;
              line-height: 24;
              color: ${Colors.videoDescriptionText};
              margin-horizontal: 23px;
              `;

const VideoPlayerButtonText = styled.Text`
font-family: Lato-Regular;
font-size: ${Platform.OS === 'android' ? 13 : 16}px;
color: ${Colors.primary};
margin-left: 8px;
`;

const AppIconButton = ({ icon, text, onPress, ...props }) => (
  <TouchableOpacity onPress={onPress} {...props}>
    <Icon name={icon} size={24} color={Colors.primary}/>
    <VideoPlayerButtonText>{text}</VideoPlayerButtonText>
  </TouchableOpacity>
);

export const IconButton = styled(AppIconButton)`
flex: 1;
flex-direction: row;
align-items: center;
justify-content: center;
`;

const VideoPlayerFooterView = ({
                                 onPressWebshop,
                                 onPressFood,
                                 onPressShare,
                                 webshopText,
                                 foodText,
                                 shareText,
                                 ...props
                               }) => (
  <View {...props}>
    <IconButton
      icon='webshop'
      text={webshopText}
      onPress={onPressWebshop}
    />
    <IconButton
      icon='food'
      text={foodText}
      onPress={onPressFood}
    />
    <IconButton
      icon='share'
      text={shareText}
      onPress={onPressShare}
    />
  </View>
);

export const VideoPlayerFooter = styled(VideoPlayerFooterView)`
flex-direction: row;
padding-horizontal: 23px;
justify-content: space-between;
padding-top: 15px;
padding-bottom: ${DeviceInfo.hasNotch() === true ? 25 : 15}px;
box-shadow: -2px 0px 20px ${Colors.sectionShadow};
shadow-opacity: 0.15;
background-color: ${Colors.white};
border-color: ${Colors.white};
border-width: 1px;
elevation: 20;
`;

/********************************Subscriptions******************************* */

const SubscriptionButton = styled(AppButton)`
              margin-horizontal: ${props =>
  props.marginHorizontal ? props.marginHorizontal : '0px'};
              align-self: stretch;
              padding-vertical: 12px;
              margin-top: 12px;
              margin-bottom: ${props => (props.marginBottom ? '0px' : '23px')};
              border-radius: 8px;
              height: 45px;
              border-right-color: ${Colors.transparent};
              border-left-color: ${Colors.transparent};
              background-color: ${props => (props.active ? Colors.white : Colors.primary)};
              z-index: 100;
              `;

const SubscriptionAmountText = styled.Text`
font-family: Lato-SemiBold;
font-size: 20;
color: ${props => props.color || Colors.text};
text-align: center;
`;

const SubscriptionCurrencyText = styled.Text`
font-family: Lato-SemiBold;
font-size: 14;
color: ${props => props.color || Colors.text};
text-align: right;
`;

const SubscriptionNameText = styled.Text`
font-family: Lato-SemiBold;
font-size: 16px;
color: ${props => (props.active ? Colors.white : (props.color || Colors.subscriptionTitle))};
`;

const SubscriptionSubText = styled.Text`
font-family: Lato-Regular;
font-size: 14px;
color: ${props => (props.active ? Colors.white : Colors.subscriptionSubText)};
max-width: 155px;
`;

const AmountCircle = ({ amount, currency, color, ...props }) => (
  <View color={color} {...props}>
    <SubscriptionAmountText color={color}>{amount}</SubscriptionAmountText>
    <SubscriptionCurrencyText color={color}>{currency}</SubscriptionCurrencyText>
  </View>
);

const CircularAmount = styled(AmountCircle)`
width: 72px;
height: 72px;
border-width: 2.5px;
border-color: ${props => props.color};
justify-content: center;
align-items: center;
border-radius: 36px;
margin-horizontal: 10px;
padding-horizontal: 5px;
background-color: ${props => props.active ? Colors.white : Colors.transparent};
box-shadow: 4px 0px 12px ${props => props.color};
shadow-opacity: 0.15;
background-color: ${Colors.white};
elevation: 12;
`;

const TextContainer = styled.View`
flex: 1;
margin-top: 5px;
margin-right: 15px;
`;

const SubscriptionTopView = ({
                               active,
                               amount,
                               currency,
                               subTitle,
                               subText,
                               color,
                               ...props
                             }) => (
  <View {...props}>
    <CircularAmount active={active} amount={amount} currency={currency} color={color}/>
    <TextContainer>
      <SubscriptionNameText
        numberOfLines={1}
        ellipsizeMode={'tail'}
        active={active}
        color={color}
      >
        {subTitle}
      </SubscriptionNameText>
      <SubscriptionSubText active={active}>{subText}</SubscriptionSubText>
    </TextContainer>
  </View>
);

const SubscriptionTop = styled(SubscriptionTopView)`
flex-direction: row;
margin-horizontal: 15px;
`;

const BestTagText = styled.Text`
font-family: Lato-Regular;
font-size: 18px;
margin-vertical: 3px;
color: ${Colors.white};
`;

const BestTagView = ({ active, color, ...props }) => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      height: 90,
      width: 90,
      paddingTop: 10,
      overflow: 'hidden',
    }}
  >
    <View {...props}>
      <BestTagText color={color} active={active}>{i18n.t('subscription.best')}</BestTagText>
    </View>
  </View>
);

const BestTag = styled(BestTagView)`
width: 140px;
background-color: ${props => props.color};
align-items: center;
transform: rotate(45deg);
`;

const SubscriptionCardView = ({
                                active,
                                isBest,
                                buttonText,
                                amount,
                                currency,
                                subTitle,
                                subText,
                                onPress,
                                disabled,
                                color,
                                ...props
                              }) => (
  <View {...props}>
    {isBest && <BestTag color={color} active={active}/>}
    <SubscriptionTop
      active={active}
      amount={amount}
      currency={currency}
      subTitle={subTitle}
      subText={subText}
      color={color}
    />
    <SubscriptionButton
      onPress={onPress}
      active={active}
      disabled={disabled}
      marginBottom={true}
      marginHorizontal={12}
    >
      {buttonText}
    </SubscriptionButton>
  </View>
);

export const SubscriptionCard = styled(SubscriptionCardView)`
border-radius: 8px;
box-shadow: 2px 0px 5px ${Colors.thumbnailShadow};
shadow-opacity: 0.3;
elevation: 5;
padding-vertical: 15px;
justify-content: space-between;
align-self: stretch;
margin-vertical: 10px;
margin-horizontal: 20px;
border-width: 1px;
border-color: ${props => props.active ? Colors.activeSub : Colors.almostWhite};
background-color: ${props => props.active ? Colors.activeSub : Colors.almostWhite};
`;

export const SubscriptionDetailText = styled.Text`
font-family: Lato-Regular;
font-size: 14px;
color: ${Colors.subscriptionDetail};
text-align: justify;
`;

export const SubscriptionDetailLink = styled.Text`
font-family: Lato-Regular;
font-size: 14px;
color: ${Colors.primary};
text-decoration-line: underline;
text-align: justify;
`;

export const SubscriptionDetailTextTitle = styled.Text`
font-family: Lato-Medium;
font-size: 18px;
color: ${Colors.text};
text-align: center;
margin-bottom: 10px;
`;

const SubscriptionDetailView = ({ children, ...props }) => (
  <View {...props}>
    {children}
  </View>
);

export const SubscriptionDetail = styled(SubscriptionDetailView)`
align-self: stretch;
margin-top: 25px;
margin-horizontal: 33px;
margin-bottom: 30px;
`;

/********************************Third Party Licences ************************************ */
const HeadingText = styled.Text`
              font-family: Lato-Light;
              font-size: 18px;
              color: ${Colors.text};
              `;

const HeadingView = ({ heading, ...props }) => (
  <View {...props}>
    <HeadingText>{heading}</HeadingText>
  </View>
);

export const LicenseHeading = styled(HeadingView)`
              height: 49px;
              align-self: stretch;
              align-items: center;
              margin-top: 25px;
              `;

const LicenseText = styled.Text`
              font-family: Lato-Regular;
              font-size: 16px;
              color: ${Colors.subtitle};
              `;

const PacakageText = styled.Text`
              font-family: Lato-Regular;
              font-size: 16px;
              color: ${Colors.text};
              `;

const LicenseTouchable = styled.TouchableOpacity`
              padding-horizontal: 15px;
              padding-vertical: 16px;
              justify-content: space-between;
              `;

const LicenseItemView = ({ license, packageName, ...props }) => (
  <LicenseTouchable {...props}>
    <LicenseText>{license}</LicenseText>
    <PacakageText>{packageName}</PacakageText>
  </LicenseTouchable>
);

export const LicenseItem = styled(LicenseItemView)`
              align-self: stretch;
              margin-horizontal: 35px;
              height: 84px;
              margin-vertical: 5px;
              border-radius: 8px;
              border-width: 1px;
              border-color: ${Colors.subtitle};
              background-color: ${Colors.almostWhite};
              `;

/*****************************SEARCH TAGS*********************************** */

export const ShadowView = styled.View`
height: 1px;
background-color: ${Colors.white};
width: 100%;
`;


export const SearchTags = styled.View`
              flex-direction: row;
              align-self: stretch;
              padding-horizontal: 12px;
              flex-wrap: wrap;
              background-color: ${Colors.transparent};
              margin-bottom: ${props => props.marginBottom ? props.marginBottom : 10}px;
              justify-content: ${props => (props.justify ? 'space-between' : 'undefined')};
              `;

const SearchTitleText = styled.Text`
              font-family: Lato-Regular;
              font-size: 22px;
              color: ${Colors.text};
              text-align: center;
              margin-bottom: 15px;
              `;

const SearchSubTitleText = styled.Text`
              font-family: Lato-Light;
              font-size: 18px;
              color: ${Colors.text};
              text-align: center;
              `;

const SearchTagDetailView = ({ title, subtitle, ...props }) => (
  <View {...props}>
    <SearchTitleText>{title}</SearchTitleText>
    <SearchSubTitleText>{subtitle}</SearchSubTitleText>
  </View>
);

export const SearchTagDetail = styled(SearchTagDetailView)`
              align-self: stretch;
              margin-horizontal: 20px;
              margin-vertical: 20px;
              `;

export const RowImageIcon = styled.Image`
              height: 25px;
              width: 25px;
              `;

const FormInput = styled.View`
              flex-direction: row;
              padding-vertical: 10px;
              background: ${Colors.white};
              align-items: center;
              `;

class AppTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.el = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.focusToggle != nextProps.focusToggle) {
      this.el.current.focus();
    }
  }

  render() {
    return <TextInput ref={this.el} {...this.props} />;
  }
}

const TitleTextInput = ({ error, ...props }) => (
  <FormInput error={error}>
    <Icon
      name={'login'}
      size={24}
      color={error ? Colors.error : Colors.blueGrey}
      style={{ marginLeft: 15 }}
    />
    <AppTextInput
      underlineColorAndroid={Colors.transparent}
      autoCorrent={false}
      returnKeyType={'done'}
      keyboardType={'email-address'}
      autoCapitalize={'none'}
      {...props}
    />
  </FormInput>
);

export const TitleInput = styled(TitleTextInput)`
flex: 1;
margin-horizontal: 8px;
font-family: Lato-Light;
font-size: 16px;
color: ${Colors.text};
padding-vertical: 2px;
`;

class PasswordTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidePassword: true,
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { error, ...props } = this.props;
    const { hidePassword } = this.state;

    return (
      <FormInput error={error}>
        <Icon
          name={'password'}
          size={24}
          color={error ? Colors.error : Colors.blueGrey}
          style={{ marginLeft: 15 }}
        />
        <AppTextInput
          underlineColorAndroid={Colors.transparent}
          returnKeyType={'done'}
          keyboardType={'default'}
          autoCorrect={false}
          autoCapatilize={'none'}
          secureTextEntry={hidePassword}
          {...props}
        />
        <TextButton
          style={{ paddingHorizontal: 13 }}
          textProps={{
            style: {
              color: Colors.blueGrey,
              fontSize: 14,
              fontFamily: 'Lato-Light',
            },
          }}
          hideUnderlayColor={true}
          onPress={() => this.setState({ hidePassword: !hidePassword })}
        >
          {hidePassword ? i18n.t('button.show') : i18n.t('button.hide')}
        </TextButton>
      </FormInput>
    );
  }
}

export const PasswordInput = styled(PasswordTextInput)`
              flex: 1;
              margin-horizontal: 8px;
              font-family: Lato-Light;
              font-size: 16px;
              color: ${Colors.textInput};
              padding-vertical: 2px;
              `;

/////////////////////// SETTINGS ///////////////////////////

const SettingsIcon = ({
                        onFacebookPress,
                        onInstaPress,
                        onManaYogaPress,
                        ...props
                      }) => (
  <View {...props}>
    <TouchableOpacity onPress={onFacebookPress}>
      <Image source={Images.facebook}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={onInstaPress}>
      <Image source={Images.instagram}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={onManaYogaPress}>
      <Image source={Images.getWellButton}/>
    </TouchableOpacity>
  </View>
);

export const SettingIconGroup = styled(SettingsIcon)`
align-self: stretch;
justify-content: space-between;
flex-direction: row;
margin-vertical: 30px;
padding-horizontal: 22px;
margin-horizontal: 45px;
`;

const SettingBottomImage = ({ ...props }) => (
  <Image {...props} source={Images.manaYogaLogo} resizeMode={'contain'}/>
);

export const SettingBottomLogo = styled(SettingBottomImage)`
align-self: center;
margin-top: 13px;
margin-bottom: 25px;
width: 240px;
`;

const SettingText = styled.Text`
flex: 1;
margin-left: 20px;
font-family: Lato-Regular;
font-size: 16px;
margin-bottom: 3px;
color: ${Colors.text};
`;

const SettingButton = ({ name, onPress, title, ...props }) => (
  <View style={{ marginHorizontal: 15, marginTop: 10 }}>
    <TouchableOpacity onPress={onPress} {...props}>
      <Icon name={name} size={22} color={Colors.text}/>
      <SettingText>{title}</SettingText>
      <Icon name={'chevron-right'} size={18} color={Colors.settingChevron}/>
    </TouchableOpacity>
  </View>
);

export const SettingItem = styled(SettingButton)`
padding-vertical: 10;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const VersionText = ({ version, ...props }) => (
  <Text {...props}>ManaYoga v{version}</Text>
);

export const SettingVersionText = styled(VersionText)`
font-family: Lato-Light;
font-size: 16px;
color: ${Colors.text};
text-align: center;
margin-bottom: 25px;
`;

export const AppWebView = styled(WebView)`
flex: 1;
height: 100%;
width: 100%;`;


const AppSpinner = ({ ...props }) => (
  <Spinner cancelable={false} {...props} />
);
export const BlockingSpinner = styled(AppSpinner)``;