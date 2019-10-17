
import * as types from '../actions/types';

import Immutable from 'seamless-immutable';

const initialState = Immutable({
	  signIn:false,
	  username:'',
	  profilePicture: null,
	  mime: null
});

const userReducer = {
	user: (state = initialState, action)=>{
		switch (action.type) {
		    case types.SIGN_IN:
		    	state = {...state, signIn: true, username:action.data};
		    	return state;
		    case types.SIGN_OUT:
                    state = {...state, signIn: false};
                    return state;
            case types.LOAD_AUTH:
					state = {...state, signIn:action.data.value, username:action.data.username};
				return state;
			case types.UPDATE_PROFILE_SUCCESS:
					state = {...state, username: action.data.username};
				return state;
			case types.UPDATE_PROFILE_PICTURE:
				state = {...state, profilePicture: action.profilePicture.data, mime: action.profilePicture.mime}
				return state;
		    default:
		      return state;
		  }
	}
}

export default userReducer;
