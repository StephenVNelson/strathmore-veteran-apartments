import { combineReducers } from "redux";
import companies from './companyReducer';
import buildings from './buildingReducer';
import apartments from './apartmentReducer';
import roommateGroups from './roommateGroupReducer';
import prospects from './prospectReducer';
import session from './sessionReducer'
import alerts from './alertReducer';

const rootReducer = combineReducers({
  companies,
  buildings,
  apartments,
  roommateGroups,
  prospects,
  session,
  alerts
});

export default rootReducer