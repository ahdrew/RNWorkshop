import { createSwitchNavigator,createStackNavigator, createDrawerNavigator,createBottomTabNavigator } from "react-navigation";
import React from 'react';
import Home from './containers/Welcome/Home';
import PageTwo from './containers/Welcome/PageTwo';
import MapPage from './containers/Welcome/MapPage';
import QrScanner from './containers/Welcome/QrScanner';
import LangPage from './containers/Settings/Lang';
import SettingMenu from './containers/Settings/Menu';
import AuthLoading from './containers/Auth/AuthLoading';
import SignIn from './containers/Auth/SignIn';
import UserProfile from './containers/Settings/UserProfile';
import DragAndDrop from './containers/Playground/DragAndDrop';
import VideoRecord from './containers/Video/VideoRecord';
import VideoPreview from './containers/Video/VideoPreview';
import {Icon} from 'react-native-elements';
const VideoStack = createStackNavigator({
    VideoRecord: VideoRecord,
    VideoPreview: VideoPreview
})

const HomeStack = createStackNavigator({
    Home: Home,
    PageTwo: PageTwo,
    MapPage: MapPage,
    QrScanner: QrScanner
    // Video: VideoRecord,
    // VideoPreview: VideoPreview
})



const SettingsStack = createStackNavigator({
    Settings: SettingMenu,
    Lang: LangPage,
    UserProfile: UserProfile
})

export const DrawerNavigator = createDrawerNavigator({
    Home: HomeStack,
    Settings: SettingsStack
},
{
  hideStatusBar: true,
  drawerBackgroundColor: 'rgba(255,255,255,.9)',
  overlayColor: '#6b52ae',
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#6b52ae',
  },
})

export const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    // QrScanner: QrScanner,
    Video:VideoStack,
    Settings: SettingsStack
},{
    defaultNavigationOptions:({navigation})=> ({
        tabBarIcon:({focused,horizontal,tintColor})=>{
            const {routeName} = navigation.state;
            let iconName;
            if (routeName === 'Home') {
            iconName = 'home';
            // Sometimes we want to add badges to some icons.
            // You can check the implementation below.
            } else if (routeName === 'Settings') {
            iconName = 'settings';
            } else if (routeName === 'QrScanner'){
                iconName = 'qrcode-scan';
            } else if (routeName === 'Video'){
                iconName = 'video'
            }
            // You can return any component that you like here!
            return <Icon name={iconName} type='material-community' size={25} color={tintColor} />;
        },
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    })
})

export const RootNavigator = createSwitchNavigator({
    Auth:SignIn,
    App: TabNavigator,
    AuthLoading:AuthLoading
},{
    initialRouteName:'AuthLoading'
})


// export default {DrawerNavigator,TabNavigator};