import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,NativeModules,Button} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common';
import WebView from '../../components/WebView';


class PageTwo extends Component {
  static navigationOptions = {
    title: 'Web',
  };

  componentDidMount(){
  }
  render() {
    return <WebView style={{ flex: 1 }} />;
  }
}

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PageTwo);