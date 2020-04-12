import * as types from './actionTypes';
import * as buildingAPI from '../../api/buildingApi'

// export function createCourse(course) {
//   return { type: types.CREATE_COURSE, course };
// }
export function loadBuildingsSuccess(buildings) {
  return { type: types.LOAD_BUILDINGS_SUCCESS, buildings };
}

export function loadBuildings() {
  return function (dispatch) {
    return buildingAPI.getBuildings().then(buildings => {
      dispatch(loadBuildingsSuccess(buildings));
    }).catch(error => {
      throw error;
    })
  }
}