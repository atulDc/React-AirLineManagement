import * as ActionTypes from './ActionType';

export const CheckinReducer = (state = null, action) => {
  switch (action.type) {
    
    case ActionTypes.ADD_CheckIn:
      return {...state, checkIns: action.payload};

    default:
      return state;
  }
};