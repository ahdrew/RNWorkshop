import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Map from '../../components/Map';

class MapPage extends Component {
  static navigationOptions = {
    title: 'Map',
  };

  componentDidMount() {
  }
  render() {
    return <Map style={{ flex: 1 }} />;
  }
}

mapStateToProps = (state) => {
  return {
    app: state.app
  };
}

mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);