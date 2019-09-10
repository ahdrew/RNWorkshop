
import * as types from '../actions/types';

import Immutable from 'seamless-immutable';

const initialState = Immutable({
	  signIn:false,
	  username:''
});

const userReducer = {
	user: (state:State = initialState, action:Action)=>{
		switch (action.type) {
		    case types.SIGN_IN:
		    	state = {...state, signIn: true, username:action.data};
		    	return state;
		    case types.SIGN_OUT:
                    state = {...state, signIn: false};
                    return state;
            case types.LOAD_AUTH:
					state = {...state, signIn:action.data.value, username:action.data.username};
			case types.UPDATE_PROFILE_SUCCESS:
					state = {...state, username: action.data.username};
		    default:
		      return state;
		  }
	}
}

export default userReducer;
