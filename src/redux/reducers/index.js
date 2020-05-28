import { combineReducers } from "redux";
import companies from './companyReducer';
import buildings from './buildingReducer';
import apartments from './apartmentReducer';
import roommateGroups from './roommateGroupReducer';
import prospects from './prospectReducer';
import session from './sessionReducer'

const rootReducer = combineReducers({
  companies,
  buildings,
  apartments,
  roommateGroups,
  prospects,
  session
});

export default rootReducer