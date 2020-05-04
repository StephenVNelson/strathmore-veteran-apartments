import * as types from './actionTypes';
import * as apartmentAPI from '../../api/apartmentApi'


export function loadApartmentsSuccess(apartments) {
  return { type: types.LOAD_APARTMENTS_SUCCESS, apartments };
}

export function createApartmentSuccess(apartment) {
  return { type: types.CREATE_APARTMENT_SUCCESS, apartment };
}

export function updateApartmentSuccess(apartment) {
  return { type: types.UPDATE_APARTMENT_SUCCESS, apartment };
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

export function saveApartment(apartment) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    return apartmentAPI
      .saveApartment(apartment)
      .then(savedApartment => {
        apartment.id
          ? dispatch(updateApartmentSuccess(savedApartment))
          : dispatch(createApartmentSuccess(savedApartment));
        return savedApartment;
      })
      .catch(error => {
        throw error;
      });
  };
}