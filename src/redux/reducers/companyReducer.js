import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function companyReducer(state = initialState.companies, action) {
  switch (action.type) {
    case types.LOAD_COMPANIES_SUCCESS:
      return action.companies;
    default:
      return state;
  }
}