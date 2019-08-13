
# react-native-vplayer

## Getting started

`$ npm install react-native-vplayer --save`

### Mostly automatic installation

`$ react-native link react-native-vplayer`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-vplayer` and add `RNVplayer.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNVplayer.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNVplayerPackage;` to the imports at the top of the file
  - Add `new RNVplayerPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-vplayer'
  	project(':react-native-vplayer').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-vplayer/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-vplayer')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNVplayer.sln` in `node_modules/react-native-vplayer/windows/RNVplayer.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Vplayer.RNVplayer;` to the usings at the top of the file
  - Add `new RNVplayerPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNVplayer from 'react-native-vplayer';

// TODO: What to do with the module?
RNVplayer;
```
  