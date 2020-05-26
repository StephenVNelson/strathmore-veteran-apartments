import * as types from './actionTypes';
import * as roommateGroupAPI from '../../api/roommateGroupApi'


export function loadRoommateGroupsSuccess(roommateGroups) {
  return { type: types.LOAD_ROOMMATEGROUPS_SUCCESS, roommateGroups };
}

export function loadRoommateGroupSuccess(roommateGroup) {
  return { type: types.LOAD_ROOMMATEGROUP_SUCCESS, roommateGroup };
}

export function loadRoommateGroup(id) {
  return function (dispatch) {
    return roommateGroupAPI.getRoommateGroup(id).then(roommateGroup => {
      dispatch(loadRoommateGroupSuccess(roommateGroup));
    }).catch(error => {
      throw error;
    })
  }
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

export function createRoommateGroupSuccess(roommateGroup) {
  return { type: types.CREATE_ROOMMATEGROUP_SUCCESS, roommateGroup };
}

export function updateRoommateGroupSuccess(roommateGroup) {
  return { type: types.UPDATE_ROOMMATEGROUP_SUCCESS, roommateGroup };
}

export function saveRoommateGroup(roommateGroup) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    return roommateGroupAPI
      .saveRoommateGroup(roommateGroup)
      .then(savedRoommateGroup => {
        roommateGroup.id
          ? dispatch(updateRoommateGroupSuccess(savedRoommateGroup))
          : dispatch(createRoommateGroupSuccess(savedRoommateGroup));
        return savedRoommateGroup;
      })
      .catch(error => {
        throw error;
      });
  };
}