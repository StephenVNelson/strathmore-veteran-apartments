import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function apartmentReducer(state = initialState.apartments, action) {
  switch (action.type) {
    case types.CREATE_APARTMENT_SUCCESS:
      return [...state, { ...action.apartment }]
    case types.UPDATE_APARTMENT_SUCCESS:
      return state.map(apartment =>
        apartment.id === action.apartment.id ? action.apartment : apartment
      );
    case types.LOAD_APARTMENTS_SUCCESS:
      return action.apartments;
    default:
      return state;
  }
}