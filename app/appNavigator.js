import { createSwitchNavigator,createStackNavigator, createDrawerNavigator,createBottomTabNavigator } from "react-navigation";

import Welcome from './containers/Welcome/Welcome';
import PageTwo from './containers/Welcome/PageTwo';
import MapPage from './containers/Welcome/MapPage';
import LangPage from './containers/Settings/Lang';
import SettingMenu from './containers/Settings/Menu';
import AuthLoading from './containers/Auth/AuthLoading';
import SignIn from './containers/Auth/SignIn';
import DragAndDrop from './containers/Playground/DragAndDrop';

const HomeStack = createStackNavigator({
    Welcome: Welcome,
    PageTwo: PageTwo,
    MapPage: MapPage
})

const SettingsStack = createStackNavigator({
    Settings: SettingMenu,
    Lang: LangPage
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
    Playground: DragAndDrop,
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