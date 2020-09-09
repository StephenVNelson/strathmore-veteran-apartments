import { createStore } from 'redux'
import rootReducer from '../src/redux/reducers'

export const storeFactory = (initialState) => {
  return createStore(rootReducer, initialState)
}

// The real APi requires that all the data be nested in "records"
export const recordify = (state) => {
  return Object.keys(state).reduce((obj, key) => {
    obj[key] = { records: state[key] };
    return obj
  }, {})
}