import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function sessionReducer(state = initialState.session, action) {
  switch (action.type) {
    case types.CREATE_SESSION:
      return [...state, action.session]
    case types.UPDATE_SESSION:
      return state.map(session => session.id === action.session.id ? action.session : session)
    default:
      return state;
  }
}