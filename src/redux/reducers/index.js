import { combineReducers } from "redux";
import apartments from './apartmentReducer';

const rootReducer = combineReducers({
  apartments
});

export default rootReducer