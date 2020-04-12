import * as types from './actionTypes';
import * as prospectAPI from '../../api/prospectApi'

// export function createCourse(course) {
//   return { type: types.CREATE_COURSE, course };
// }
export function loadProspectsSuccess(prospects) {
  return { type: types.LOAD_PROSPECTS_SUCCESS, prospects };
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