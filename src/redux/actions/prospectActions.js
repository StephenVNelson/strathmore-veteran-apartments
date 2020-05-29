import * as types from './actionTypes';
import * as prospectAPI from '../../api/prospectApi'


export function loadProspectsSuccess(prospects) {
  return { type: types.LOAD_PROSPECTS_SUCCESS, prospects };
}

export function createProspectSuccess(prospect) {
  return { type: types.CREATE_PROSPECT_SUCCESS, prospect };
}

export function updateProspectSuccess(prospect) {
  return { type: types.UPDATE_PROSPECT_SUCCESS, prospect };
}

export function loadProspects() {
  return function (dispatch) {
    return prospectAPI.getProspects().then(prospects => {
      dispatch(loadProspectsSuccess(prospects));
    }).catch(error => {
      throw error;
    })
  }
}

export function saveProspect(prospect) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    console.log(prospect)
    return prospectAPI
      .saveProspect(prospect)
      .then(savedProspect => {
        prospect.id
          ? dispatch(updateProspectSuccess(savedProspect))
          : dispatch(createProspectSuccess(savedProspect));
        return savedProspect
      })
      .catch(error => {
        throw error;
      });
  };
}