import { createStore } from 'redux'
import rootReducer from '../src/redux/reducers'
import { deepCopyFunction } from '../src/components/apartments/dataHelpers'

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

// Loops through object and replaces the properties with the values you indicate. 
export const replaceProperties = (baseObject, changedProperties = {}) => {
  const baseCopy = deepCopyFunction(baseObject)
  for (let key in baseCopy) {
    if (typeof baseCopy[key] === 'object') {
      baseCopy[key] = replaceProperties(baseCopy[key], changedProperties)
    }
    if (typeof changedProperties[key] !== 'undefined') {
      baseCopy[key] = changedProperties[key]
    }
  }
  return baseCopy
}

// returns an array of x objects based on an object with the properties changed
export const createFactory = (numberOfInstances, baseObject, changedProperties = {}) => {
  return new Array(numberOfInstances).fill().map(_ => {
    return replaceProperties(baseObject, changedProperties)
    // "eh"
  })
}