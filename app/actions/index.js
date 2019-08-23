import * as AppActions from './app';
import * as UserActions from './user';


export const ActionCreators = Object.assign({},
  AppActions,UserActions
);

export default ActionCreators;