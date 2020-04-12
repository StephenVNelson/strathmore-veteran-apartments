import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function apartmentReducer(state = initialState.apartments, action) {
  switch (action.type) {
    // case types.CREATE_COURSE:
    //   return [...state, { ...action.course }]
    case types.LOAD_APARTMENTS_SUCCESS:
      return action.apartments;
    default:
      return state;
  }
}