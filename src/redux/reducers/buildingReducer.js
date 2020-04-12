import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function buildingReducer(state = initialState.buildings, action) {
  switch (action.type) {
    case types.LOAD_BUILDINGS_SUCCESS:
      return action.buildings;
    default:
      return state;
  }
}