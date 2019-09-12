import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import WebView from '../../components/WebView';


class PageTwo extends Component {
  static navigationOptions = {
    title: 'Web',
  };

  componentDidMount(){
  }
  render() {
    return <WebView style={{ flex: 1 }} />;
  }
}

mapStateToProps=(state)=> {
  return {
    app: state.app
  };
}

mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PageTwo);