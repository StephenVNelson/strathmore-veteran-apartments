import * as types from './actionTypes';
import * as companyAPI from '../../api/companyApi'

// export function createCourse(course) {
//   return { type: types.CREATE_COURSE, course };
// }
export function loadCompaniesSuccess(companies) {
  return { type: types.LOAD_COMPANIES_SUCCESS, companies };
}

export function loadCompanies() {
  return function (dispatch) {
    return companyAPI.getCompanies().then(companies => {
      dispatch(loadCompaniesSuccess(companies));
    }).catch(error => {
      throw error;
    })
  }
}