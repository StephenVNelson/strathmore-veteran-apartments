import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function prospectReducer(state = initialState.prospects, action) {
  switch (action.type) {
    case types.CREATE_PROSPECT_SUCCESS:
      return { records: [...state.records, action.prospect] };
    case types.UPDATE_PROSPECT_SUCCESS:
      return {
        records: state.records.map(prospect =>
          prospect.id === action.prospect.id ? action.prospect : prospect
        )
      };
    case types.LOAD_PROSPECTS_SUCCESS:
      return action.prospects;
    default:
      return state;
  }
}