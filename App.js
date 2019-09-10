import React,{Component} from 'react';
import {DrawerNavigator,TabNavigator,RootNavigator} from './app/appNavigator'
import {createAppContainer} from 'react-navigation'
import { Provider } from 'react-redux'
import configureStore from './app/store/configureStore';
const store = configureStore();

const AppContainer = createAppContainer(RootNavigator);
export default class App extends Component<Props>{
  render(){
    return (<Provider store={store}><AppContainer/></Provider>)
  }
}
