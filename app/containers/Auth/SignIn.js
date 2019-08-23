import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,NativeModules,Button,Alert} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common'

class SignIn extends Component {

	static navigationOptions = {
		title: 'Sign In',
	};

	constructor(props){
		super(props);
		this.signIn =this.signIn.bind(this);
    }
    componentDidUpdate(prevProps){
        if(this.props.user.signIn)
            this.props.navigation.navigate('Home');
    }
	componentDidMount(){
		// TouchIdManager.startTouchID();
	}
    signIn(){
		this.props.signIn();
	}
	render() {
    return <View style={styles.container}>
    	<Button title="Sign In" onPress={this.signIn}></Button>
    	</View>
    // return <MapView style={{ flex: 1 }} />;
  }
}

SignIn.propTypes = {
    signIn:PropTypes.func
}

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);