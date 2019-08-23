import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,NativeModules,Button,Alert} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import MapView from '../../components/Map';
import styles from '../../styles/common'
import Config from 'react-native-config'
import Draggable from '../../components/Draggable';


class DragAndDrop extends Component {

	static navigationOptions = {
		title: 'Drag And Drop',
	};

	constructor(props){
		super(props);
	}
	componentDidMount(){
	}
	render() {
    return <View style={styles.container}>
    	<Draggable/>
        <Draggable/>
    	</View>
    // return <MapView style={{ flex: 1 }} />;
  }
}

DragAndDrop.propTypes = {
}

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(DragAndDrop);