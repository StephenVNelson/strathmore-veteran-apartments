import * as types from './actionTypes';
import * as apartmentAPI from '../../api/apartmentApi'

// export function createCourse(course) {
//   return { type: types.CREATE_COURSE, course };
// }
export function loadApartmentsSuccess(apartments) {
  return { type: types.LOAD_APARTMENTS_SUCCESS, apartments };
}

export function loadApartments() {
  return function (dispatch) {
    return apartmentAPI.getApartments().then(apartments => {
      dispatch(loadApartmentsSuccess(apartments));
    }).catch(error => {
      throw error;
    })
  }
}