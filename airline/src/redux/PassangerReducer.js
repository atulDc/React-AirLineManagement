import * as ActionTypes from './ActionType';

export const PassangerReducer = (state = null, action) => {
  switch (action.type) {
    
    case ActionTypes.ADD_Passangers:
      return {...state, passangers: action.payload};

    default:
      return state;
  }
};