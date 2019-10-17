import * as types from './types';
import AsyncStorage from '@react-native-community/async-storage';

const KEY_AUTH = 'AUTH';
const KEY_USERNAME='USERNAME';
const KEY_PROFILE_IMAGE = 'PROFILE_IMAGE';
const KEY_PROFILE_IMAGE_MIME = 'PROFILE_IMAGE_MIME';

export function signInSuccess(username){
	return {
            type: types.SIGN_IN,
            data: username
		}
}

export function signOutSuccess(){
	return {
			type: types.SIGN_OUT
		}
}
export function loadAuthSuccess(signIn){
    return {
        type: types.LOAD_AUTH,
        data: signIn
    }
}

export function updateProfileSuccess(profile){
    return {
        type: types.UPDATE_PROFILE_SUCCESS,
        data: profile
    }
}

export function updateProfile(profile){
    return async (dispatch)=>{
        await AsyncStorage.setItem(KEY_USERNAME,profile.username)
        dispatch(updateProfileSuccess(profile));
    }
    
}

export function updateProfilePicture(profilePicture) {
    return async dispatch => {
      await AsyncStorage.setItem(KEY_PROFILE_IMAGE, profilePicture.data);
      await AsyncStorage.setItem(KEY_PROFILE_IMAGE_MIME, profilePicture.mime);
      dispatch(updateProfilePictureSuccess(profilePicture));
    };
  }
  
  export function updateProfilePictureSuccess(profilePicture) {
    return {
      type: types.UPDATE_PROFILE_PICTURE,
      profilePicture: profilePicture,
    };
  }

export function signIn(username){
    return async (dispatch)=>{
        await AsyncStorage.setItem(KEY_AUTH,"1")
        await AsyncStorage.setItem(KEY_USERNAME,username)
		dispatch(signInSuccess(username));
	
	}
}

export function signOut(){
    return async (dispatch)=>{
        await AsyncStorage.setItem(KEY_AUTH,"0")
        await AsyncStorage.setItem(KEY_USERNAME,"")
		dispatch(signOutSuccess());
	
	}
}

export function loadAuth(){
    return async (dispatch)=>{
        let value = await AsyncStorage.getItem(KEY_AUTH);
        if(value == null)
            value = "0";
        value = value == "1" ? true : false;
        let username = await AsyncStorage.getItem(KEY_USERNAME);
        username == null ? "": username;
        dispatch(loadAuthSuccess({value:value,username:username}));
    }
}