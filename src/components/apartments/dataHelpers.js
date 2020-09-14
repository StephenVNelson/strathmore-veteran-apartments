const deepCopyFunction = (inObject) => {
  let outObject, value, key

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value)
  }

  return outObject
}

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