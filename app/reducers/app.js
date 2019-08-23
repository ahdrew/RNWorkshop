
import * as types from '../actions/types';

import Immutable from 'seamless-immutable';

const initialState = Immutable({
	  lang:'en',
	  currency:''
});

const appReducer = {
	app: (state:State = initialState, action:Action)=>{
		switch (action.type) {
		    case types.CHANGE_LANG:
		    	state = {...state, lang: action.data};
		    	return state;
		    case types.LOAD_CONFIG:
				state = {...state, currency: action.data.currency};
				return state;
		    default:
		      return state;
		  }
	}
}

export default appReducer;
