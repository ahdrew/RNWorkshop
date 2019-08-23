
import * as types from '../actions/types';

import Immutable from 'seamless-immutable';

const initialState = Immutable({
  	signIn:false,
});

const userReducer = {
	user: (state:State = initialState, action:Action)=>{
		switch (action.type) {
		    case types.SIGN_IN:
		    	state = {...state, signIn: true};
		    	return state;
		    case types.SIGN_OUT:
                    state = {...state, signIn: false};
                    return state;
            case types.LOAD_AUTH:
                    state = {...state, signIn:action.data};
		    default:
		      return state;
		  }
	}
}

export default userReducer;
