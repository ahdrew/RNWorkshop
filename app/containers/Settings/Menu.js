import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common'
import { TouchableOpacity } from 'react-native-gesture-handler';


let menuData = [
    {title:'Lang',key:'LANG'},
    {title:'Logout',key:'LOGOUT'}
];

class Menu extends Component {

	static navigationOptions = {
		title: 'Language',
	};

	constructor(props){
        super(props);
        this.renderListItem = this.renderListItem.bind(this);
        this.signOut = this.signOut.bind(this);
	}
	componentDidMount(){
        
    }
    componentDidUpdate(prevProps){
        if(!this.props.user.signIn)
            this.props.navigation.navigate('AuthLoading');
    }
    menuAction(key){
        console.log("#####",key);
        switch(key){
            case 'LANG':
                this.props.navigation.navigate('Lang');
                break;
            case 'LOGOUT':
                this.signOut();
                break;
            default:
                return;
        }
    }
    signOut(){
        this.props.signOut();
    }
    renderListItem({item}){
        return (
        <TouchableOpacity style={styles.listItem} onPress={()=>this.menuAction(item.key)}>
        <Text>{item.title}</Text>
        </TouchableOpacity>
        )
    }
    renderSeparator = () => {
        return (
          <View
            style={styles.separator}
          />
        );
      };
    render() {
    return <View style={styles.settingMenuContainer}>
            <FlatList
                data={menuData}
                renderItem={this.renderListItem}
                ItemSeparatorComponent={this.renderSeparator}
            ></FlatList>
    	</View>
  }
}

Menu.propTypes = {
    signOut: PropTypes.func
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

export default connect(mapStateToProps,mapDispatchToProps)(Menu);