import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function roommateGroupReducer(state = initialState.roommateGroups, action) {
  switch (action.type) {
    case types.LOAD_ROOMMATEGROUPS_SUCCESS:
      return action.roommateGroups;
    default:
      return state;
  }
}