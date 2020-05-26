import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function roommatesReducer(state = initialState.roommates, action) {
  switch (action.type) {
    case types.CREATE_ROOMMATES:
      return [...state, action.roommates]
    case types.UPDATE_ROOMMATES:
      return state.map(rm => rm.id === action.roommates.id ? action.roommates : rm)
    default:
      return state;
  }
}