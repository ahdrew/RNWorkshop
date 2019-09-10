import { createSwitchNavigator,createStackNavigator, createDrawerNavigator,createBottomTabNavigator } from "react-navigation";

import Welcome from './containers/Welcome/Welcome';
import PageTwo from './containers/Welcome/PageTwo';
import MapPage from './containers/Welcome/MapPage';
import QrScanner from './containers/Welcome/QrScanner';
import LangPage from './containers/Settings/Lang';
import SettingMenu from './containers/Settings/Menu';
import AuthLoading from './containers/Auth/AuthLoading';
import SignIn from './containers/Auth/SignIn';
import UserProfile from './containers/Settings/UserProfile';
import DragAndDrop from './containers/Playground/DragAndDrop';

const HomeStack = createStackNavigator({
    Welcome: Welcome,
    PageTwo: PageTwo,
    MapPage: MapPage,
    // QrScanner: QrScanner
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
    QrScanner: QrScanner,
    Settings: SettingsStack
})

export const RootNavigator = createSwitchNavigator({
    Auth:SignIn,
    App: TabNavigator,
    AuthLoading:AuthLoading
},{
    initialRouteName:'AuthLoading'
})


// export default {DrawerNavigator,TabNavigator};