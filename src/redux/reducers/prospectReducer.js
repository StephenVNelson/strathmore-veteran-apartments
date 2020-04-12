import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function prospectReducer(state = initialState.prospects, action) {
  switch (action.type) {
    // case types.CREATE_COURSE:
    //   return [...state, { ...action.course }]
    case types.LOAD_PROSPECTS_SUCCESS:
      return action.prospects;
    default:
      return state;
  }
}