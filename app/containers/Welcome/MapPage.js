import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,NativeModules,Button} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common';
import Map from '../../components/Map';

class MapPage extends Component {
    static navigationOptions = {
      title: 'Map',
    };
    
    componentDidMount(){
    }
    render() {
      return <Map style={{ flex: 1 }} />;
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(MapPage);