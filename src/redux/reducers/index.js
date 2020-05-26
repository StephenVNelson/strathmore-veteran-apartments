import { combineReducers } from "redux";
import companies from './companyReducer';
import buildings from './buildingReducer';
import apartments from './apartmentReducer';
import roommateGroups from './roommateGroupReducer';
import prospects from './prospectReducer';
import roommates from './roommatesReducer'

const rootReducer = combineReducers({
  companies,
  buildings,
  apartments,
  roommateGroups,
  prospects,
  roommates
});

export default rootReducer