import React, {Component} from 'react';
import { View} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common'
import {Input,Button} from 'react-native-elements';

class UserProfile extends Component {

	static navigationOptions = {
		title: 'User Profile',
	};

	constructor(props){
		super(props);
		this.state = {username:this.props.user.username};
	}
	componentDidMount(){
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

mapStateToProps=(state)=> {
  return {
	app: state.app,
	user: state.user
  };
}

mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);