import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export default function alertReducer(state = initialState.alerts, action) {
  switch (action.type) {
    case types.CREATE_ALERT:
      return { ...action.alert }
    case types.DELETE_ALERT:
      return state.filter(alert => alert.id !== action.alert.id)
    default:
      return state
  }
}