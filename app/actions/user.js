import * as types from './types';
import AsyncStorage from '@react-native-community/async-storage';

const KEY_AUTH = 'AUTH';
export function signInSuccess(){
	return {
			type: types.SIGN_IN
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

export function signIn(){
    return async (dispatch)=>{
        await AsyncStorage.setItem(KEY_AUTH,"1")
		dispatch(signInSuccess());
	
	}
}

export function signOut(){
    return async (dispatch)=>{
        await AsyncStorage.setItem(KEY_AUTH,"0")
		dispatch(signOutSuccess());
	
	}
}

export function loadAuth(){
    return async (dispatch)=>{
        let value = await AsyncStorage.getItem(KEY_AUTH);
        if(value == null)
            value = "0";
        value = value == "1" ? true : false;
        dispatch(loadAuthSuccess(value));
    }
}