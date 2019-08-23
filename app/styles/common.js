import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  settingMenuContainer: {
    borderTopWidth: 0, 
    borderBottomWidth: 0
  },
  separator:{
    height: 1,
    // width: "86%",
    backgroundColor: "#CED0CE",
    // marginLeft: "14%"
  },
  listItem:{
    height:30,
    marginTop:10,
    marginLeft:10
  }
});


export default styles