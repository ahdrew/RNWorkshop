import React, {Component} from 'react';
import { View} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common'
import {Input,Button} from 'react-native-elements';
import { throwStatement } from '@babel/types';

class UserProfile extends Component {

	static navigationOptions = {
		title: 'User Profile',
	};

	constructor(props){
		super(props);
		this.state = {username:this.props.user.username};
	}
	componentDidMount(){
		// TouchIdManager.startTouchID();
	}
	componentDidUpdate(prevProps){
		if(prevProps.user.username != this.props.user.username)
			this.props.navigation.goBack();
	}
	render() {
    return <View style={styles.container}>
    	<Input placeholder="Username" onChangeText={(text)=>{this.setState({username:text})}} value={this.state.username} ></Input>
		<Button title="Update" onPress={()=>{this.props.updateProfile({username:this.state.username})}}></Button>
    	</View>
    // return <MapView style={{ flex: 1 }} />;
  }
}

UserProfile.propTypes = {
	toggleLang: PropTypes.func,
	updateProfile: PropTypes.func
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

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);