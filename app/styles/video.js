import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    preview: {
        flex: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        aspectRatio:3/4
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 0,
        paddingHorizontal: 5,
        alignSelf: 'center',
        margin: 0,
    },
    previewPanel: {
        flex: 0,
        backgroundColor: '#fff',
        padding: 0,
        paddingHorizontal: 5,
        alignSelf: 'center',
        margin: 5,
        flexDirection:'row'
    },
    previewButton: {
        paddingHorizontal: 10,
        flex:0
    },
    previewVideo: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // aspectRatio:3/4
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