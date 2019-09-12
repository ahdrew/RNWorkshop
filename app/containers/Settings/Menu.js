import React, {Component} from 'react';
import {Text, View,FlatList} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import styles from '../../styles/common'
import { TouchableOpacity } from 'react-native-gesture-handler';


let menuData = [
    {title:'Lang',key:'LANG'},
    {title:'User Profile',key:'USERPROFILE'},
    {title:'Logout',key:'LOGOUT'}
];

class Menu extends Component {

  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentDidUpdate(prevProps) {
    if (!this.props.user.signIn)
      this.props.navigation.navigate('AuthLoading');
  }
  menuAction = (key) => {
    console.log("#####", key);
    switch (key) {
      case 'LANG':
        this.props.navigation.navigate('Lang');
        break;
      case 'USERPROFILE':
        this.props.navigation.navigate('UserProfile');
        break;
      case 'LOGOUT':
        this.signOut();
        break;
      default:
        return;
    }
  }
  signOut = () => {
    this.props.signOut();
  }
  renderListItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => this.menuAction(item.key)}>
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
        renderItem={this.renderListItem.bind(this)}
        ItemSeparatorComponent={this.renderSeparator}
      ></FlatList>
    </View>
  }
}

Menu.propTypes = {
    signOut: PropTypes.func
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

export default connect(mapStateToProps,mapDispatchToProps)(Menu);