import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    preview: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    previewPanel: {
        flex: 0,
        backgroundColor: '#fff',
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        flexDirection:'row'
    },
    previewButton: {
        margin:10,
        flex:0
    },
    backgroundVideo: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    timerBackground:{
        backgroundColor:'rgba(52, 52, 52, 0.7)',
        borderRadius:10,
        position:'absolute',
        justifyContent: 'center', 
        alignSelf: 'center',
        marginTop:10
    },
    timerText:{
        color:'white',
        alignSelf: 'center',
        marginLeft:10,
        marginRight:10,
        
    }
});

export default styles