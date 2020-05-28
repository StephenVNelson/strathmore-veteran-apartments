import * as types from './actionTypes';


export function createSession(session) {
  return { type: types.CREATE_SESSION, session }
}

export function updateSession(session) {
  return { type: types.UPDATE_SESSION, session }
}

// export function saveRoommateGroup(roommates) {
//   roommates.id ? saveRoommates(roommates) : createRoommates(roommates)
// }