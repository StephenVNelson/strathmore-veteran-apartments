import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function roommateGroupReducer(state = initialState.roommateGroups, action) {
  switch (action.type) {
    case types.CREATE_ROOMMATEGROUP_SUCCESS:
      return [...state, { ...action.roommateGroup }];
    case types.UPDATE_ROOMMATEGROUP_SUCCESS:
      return state.map(roommateGroup =>
        roommateGroup.id === action.roommateGroup.id ? action.roommateGroup : roommateGroup
      );
    case types.LOAD_ROOMMATEGROUPS_SUCCESS:
      return action.roommateGroups;
    default:
      return state;
  }
}