import React, {Component} from 'react';
import {ActivityIndicator,Platform, StyleSheet, Text, View,NativeModules,Button,Alert} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import MapView from '../../components/Map';
import styles from '../../styles/common'
import Config from 'react-native-config'
import {createLoadingSelector} from '../../api/selector';


var TouchIdManager = NativeModules.TouchIdManager
var WebViewManager = NativeModules.PruWebViewManager

class Welcome extends Component {

	static navigationOptions = {
		title: 'Home',
	};

	constructor(props){
		super(props);
		this.goToPageTwo = this.goToPageTwo.bind(this);
		this.goToMapPage = this.goToMapPage.bind(this);
	}
	componentDidMount(){
		this.props.loadConfig();
	}
	async startTouchID(){
		try{
			let result = await TouchIdManager.startTouchIDPromise();
			Alert.alert("Auth success","Auth success");
		} catch(err){
			Alert.alert("Auth error",err.message);
		}
	}
	showWebview(){
		WebViewManager.showWebview();
	}
	goToPageTwo(){
		this.props.navigation.navigate('PageTwo');
	}
	goToMapPage(){
		this.props.navigation.navigate('MapPage');
	}
	render() {
    return <View style={styles.container}>
    	<Text style={styles.welcome}>{Config.ENV_NAME}</Text>
		<Text style={styles.welcome}>Hi {this.props.user.username}</Text>
    	<Button title="Show Web View" onPress={this.showWebview}></Button>
    	<Button title="Show Touch ID" onPress={this.startTouchID}></Button>
    	<Button title="Next Page" onPress={this.goToPageTwo}></Button>
		<Button title="Map Page" onPress={this.goToMapPage}></Button>
		<Text>{this.props.app.lang}</Text>
		<Text>{this.props.app.currency}</Text>
		{this.props.isFetching && <ActivityIndicator size="large" color="#0000ff" />}
    	</View>
    // return <MapView style={{ flex: 1 }} />;
  }
}

Welcome.propTypes = {
	loadConfig: PropTypes.func
}

const loadingSelector = createLoadingSelector(['App/LOAD_CONFIG'])
function mapStateToProps(state) {
  return {
	app: state.app,
	user: state.user,
	isFetching: loadingSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Welcome);