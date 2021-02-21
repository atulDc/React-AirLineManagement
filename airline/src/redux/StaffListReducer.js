import * as ActionTypes from './ActionType';

export const StaffListReducer = (state = null, action) => {
  switch (action.type) {
    
    case ActionTypes.ADD_Staff:
      return {...state, staffs: action.payload};

    default:
      return state;
  }
};