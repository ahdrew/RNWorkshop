import React, {Component} from 'react';
import {Text, View,Button} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common'

class Lang extends Component {

	static navigationOptions = {
		title: 'Language',
	};

	constructor(props){
		super(props);
	}
	componentDidMount(){
		// TouchIdManager.startTouchID();
	}
    changeLang=()=>{
		this.props.toggleLang(this.props.app.lang);
	}
	render() {
    return <View style={styles.container}>
    	<Button title="Change Lang" onPress={this.changeLang.bind(this)}></Button>
		<Text>{this.props.app.lang}</Text>
    	</View>
    // return <MapView style={{ flex: 1 }} />;
  }
}

Lang.propTypes = {
	toggleLang: PropTypes.func
}

mapStateToProps=(state)=> {
  return {
    app: state.app
  };
}

mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Lang);