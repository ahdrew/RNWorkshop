import React, {Component} from 'react';
import {View,Button} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common'
import {Input} from 'react-native-elements'

class SignIn extends Component {

	static navigationOptions = {
		title: 'Sign In',
	};

	constructor(props){
		super(props);
    this.state = {username:""};
    }
    componentDidUpdate(prevProps){
        if(this.props.user.signIn)
            this.props.navigation.navigate('Home');
    }
	componentDidMount(){
	}
  signIn = ()=>{
		this.props.signIn(this.state.username);
  }
  
  onTextChange = (text)=>{
    this.setState({username:text});
  }
	render() {
    return <View style={styles.container}>
      <Input placeholder="Username" onChangeText={this.onTextChange.bind(this)} value={this.state.username}></Input>
    	<Button title="Sign In" onPress={this.signIn.bind(this)}></Button>
    	</View>
  }
}

SignIn.propTypes = {
    signIn:PropTypes.func
}

mapStateToProps=(state)=> {
  return {
    app: state.app,
    user: state.user
  };
}

mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);