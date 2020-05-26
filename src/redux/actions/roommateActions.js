import * as types from './actionTypes';


export function createRoommates(roommates) {
  return { type: types.CREATE_ROOMMATES, roommates }
}

export function updateRoommates(roommates) {
  return { type: types.UPDATE_ROOMMATES, roommates }
}

// export function saveRoommateGroup(roommates) {
//   roommates.id ? saveRoommates(roommates) : createRoommates(roommates)
// }