const getInstanceByID = (id, collection) => {
  return collection.filter(item => item.id === id)[0]
}

const replaceForeignKeysWithInstances = (object, propertiesAndCollections) => {
  let newObject = { ...object }
  Object.entries(propertiesAndCollections).forEach(([property, collection]) => {
    const ids = newObject.fields[property] || []
    newObject.fields[property] = ids.map(id => getInstanceByID(id, collection))
  });
  return newObject
}

export const addStateDataToApartments = (state) => {
  let apartments;
  if (state.apartments.records &&
    state.buildings.records &&
    state.roommateGroups.records &&
    state.prospects.records) {
    apartments = state.apartments.records.map(apartment => {
      const replacedBuildingsAndRoommateGroups = replaceForeignKeysWithInstances(apartment, { building: state.buildings.records, roommateGroup: state.roommateGroups.records })
      replacedBuildingsAndRoommateGroups.fields.roommateGroup = replacedBuildingsAndRoommateGroups.fields.roommateGroup.map(roommateGroup => {
        return replaceForeignKeysWithInstances(roommateGroup, { prospects: state.prospects.records })
      })
      return replacedBuildingsAndRoommateGroups
    })
  }
  return apartments
}