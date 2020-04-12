import * as types from './actionTypes';
import * as roommateGroupAPI from '../../api/roommateGroupApi'


export function loadRoommateGroupsSuccess(roommateGroups) {
  return { type: types.LOAD_ROOMMATEGROUPS_SUCCESS, roommateGroups };
}

export function loadRoommateGroups() {
  return function (dispatch) {
    return roommateGroupAPI.getRoommateGroups().then(roommateGroups => {
      dispatch(loadRoommateGroupsSuccess(roommateGroups));
    }).catch(error => {
      throw error;
    })
  }
}