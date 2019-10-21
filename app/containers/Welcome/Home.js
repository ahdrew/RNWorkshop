import React, {Component} from 'react';
import {ActivityIndicator, Text, View,NativeModules,Button,Alert} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common'
import Config from 'react-native-config'
import {createLoadingSelector} from '../../api/selector';
import {Icon} from 'react-native-elements';


var TouchIdManager = NativeModules.TouchIdManager
var WebViewManager = NativeModules.PruWebViewManager
var CameraViewManager = NativeModules.CameraViewManager

class Home extends Component {

	static navigationOptions = ({navigation})=>{
		return {
		title: 'Home',
		headerRight:(
			<View style={{marginRight:10}}><Icon  name="qrcode-scan" type="material-community" onPress={()=>{navigation.navigate('QrScanner')}}></Icon></View>
		)
		}
	};

	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.loadConfig();
	}
	startTouchID = async ()=>{
		try{
			let result = await TouchIdManager.startTouchIDPromise();
			Alert.alert("Auth success","Auth success");
		} catch(err){
			Alert.alert("Auth error",err.message);
		}
	}
	showWebview=()=>{
		WebViewManager.showWebview();
	}
	goToPageTwo=()=>{
		this.props.navigation.navigate('PageTwo');
	}
	goToMapPage=()=>{
		this.props.navigation.navigate('MapPage');
	}
	goToVideoBattle=()=>{
		this.props.navigation.navigate('VideoBattle');
	}
	goToVideoList=()=>{
		this.props.navigation.navigate('VideoList');
    }
    goToCameraView = () => {
		CameraViewManager.showCameraView();
    }
	render() {
    return <View style={styles.container}>
    	<Text style={styles.welcome}>{Config.ENV_NAME}</Text>
		<Text style={styles.welcome}>Hi {this.props.user.username}</Text>
    	<Button title="Show Web View" onPress={this.showWebview}></Button>
    	<Button title="Show Touch ID" onPress={this.startTouchID}></Button>
    	<Button title="Next Page" onPress={this.goToPageTwo.bind(this)}></Button>
		<Button title="Map Page" onPress={this.goToMapPage.bind(this)}></Button>
		<Button title="Video Battle" onPress={this.goToVideoBattle.bind(this)}></Button>
		<Button title="Video List" onPress={this.goToVideoList.bind(this)}></Button>
		<Button title="Camera View" onPress={this.goToCameraView.bind(this)}></Button>
		<Text>{this.props.app.lang}</Text>
		<Text>{this.props.app.currency}</Text>
		{this.props.isFetching && <ActivityIndicator size="large" color="#0000ff" />}
    	</View>
  }
}

Home.propTypes = {
	loadConfig: PropTypes.func
}

const loadingSelector = createLoadingSelector(['App/LOAD_CONFIG'])
mapStateToProps=(state)=>{
  return {
	app: state.app,
	user: state.user,
	isFetching: loadingSelector(state)
  };
}

mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);