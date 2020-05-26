// returns an array or objects that represent the initial roommates
function initialRoommates(apartment, roommateGroup, prospects) {
  if (!roommateGroup.id) return []
  const maxResidents = (apartment.fields.bedrooms * 2) + 1
  const roommateMax = roommateGroup.fields.roommateTotal || maxResidents
  return [...new Array(roommateMax - prospects.length - 1)].map(() => ({ gender: "other" }))
}

const addRoommate = () => {

  if (totalResidents < roommateMax) {
    setRoommates([...roommates, { gender: roommateGender }])
    const fields = { ...newRoommateGroup.fields, roommateTotal: roommates.length + 2 }
    setNewRoommateGroup({ ...newRoommateGroup, fields })
    // console.log({ ...newRoommateGroup, fields })
  }
}
const removeRoommate = () => {
  const fields = { ...newRoommateGroup.fields, roommateTotal: (roommates.length + 1) - 1 }
  setNewRoommateGroup({ ...newRoommateGroup, fields })
  // console.log({ ...newRoommateGroup, fields })
  setRoommates(roommates.slice(0, -1))
}
const updateRoommateGender = (e) => {
  const gender = e.target.value
  const fields = { ...newRoommateGroup.fields, genderPreference: gender }
  setNewRoommateGroup({ ...newRoommateGroup, fields })
  console.log({ ...newRoommateGroup, fields })
  setRoommateGender(gender)
  setRoommates(roommates.map(rm => ({ ...rm, gender: roommateGender })))
}

export { initialRoommates, addRoommate, removeRoommate, updateRoommateGender }