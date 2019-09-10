import * as types from './types';
import axios from 'axios';

function changeLang(lang){
	return {
			type: types.CHANGE_LANG,
			data: lang
		}
}

function loadConfigSuccess(config){
	return {
		type: types.LOAD_CONFIG_SUCCESS,
		data: config
	}
}
export function toggleLang(lang){
	return(dispatch)=>{
        
		dispatch(changeLang(lang == 'en' ? 'zh': 'en'));
	
	}
}

export function loadConfig(){
	return(dispatch)=>{
		dispatch({type:types.LOAD_CONFIG_REQUEST});
		axios.get('http://api.pick4you.me/config').then((res)=>{
			console.log("#####config",res.data.data);
			dispatch(loadConfigSuccess(res.data.data));
		});
	}
}
