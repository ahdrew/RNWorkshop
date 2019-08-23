import React, {Component} from 'react';
import {ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common'

class AuthLoading extends Component {

	static navigationOptions = {
		title: 'Loading',
	};

	constructor(props){
        super(props);
        this.checkAuth = this.checkAuth.bind(this);
        this.loadAuth = this.loadAuth.bind(this);
        this.loadAuth();
    }
    loadAuth(){
        this.props.loadAuth()
    }
    checkAuth(){
        console.log("######signin",this.props.user.signIn);
        this.props.navigation.navigate(this.props.user.signIn ? 'App':'Auth');
    }
    componentDidUpdate(prevProps){
        this.checkAuth();
    }
	componentDidMount(){
	}
	render() {
    return <View>
    <ActivityIndicator />
    <StatusBar barStyle="default" />
  </View>
  }
}

AuthLoading.propTypes = {
    loadAuth: PropTypes.func
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

export default connect(mapStateToProps,mapDispatchToProps)(AuthLoading);