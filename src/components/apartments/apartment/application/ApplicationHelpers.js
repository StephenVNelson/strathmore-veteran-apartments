export function createSession(roommateGroup, apartment, createSession, session) {
  // roommates equals the total possible roommates - prospects - one space for the current applicant
  const roommateNumber = roommateGroup.fields.roommateTotal - roommateGroup.fields.prospects.length - 1

  // creates an array of objects representing possible roommates.
  const roommates = apartment.fields.roommateGroup?.[0] ?
    [...new Array(roommateNumber)].map(() => ({ sex: "other" })) :
    []

  const roommateMax = apartment.fields.bedrooms * 2 + 1
  const groupApartment = [roommateGroup.fields?.apartment?.[0] || apartment.id]
  const newRoommateGroup = {
    id: roommateGroup.id,
    fields: {
      prospects: roommateGroup.fields.prospects,
      genderPreference: roommateGroup.fields.genderPreference,
      roommateTotal: roommateGroup.fields.roommateTotal,
      apartment: groupApartment
    }
  }
  createSession({
    ...session,
    id: apartment.id,
    roommates,
    roommateMax,
    roommateGroup: newRoommateGroup
  })
}

// ERROR HANDLING

export const formIsValid = (e, prospect, setErrors) => {
  const { name, phone, email, sex } = prospect.fields;
  const agreement = e.target.elements?.["roommate-agreement"]
  const errors = {};
  const extractedPhoneNumbers = (phone.match(/\d+/g) || []).join("")
  const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  if (agreement && agreement.value == "false") errors.agreement = "You must agree to the roommate group arrangement"
  if (!name) errors.name = "Name is required.";
  if (extractedPhoneNumbers.length < 10) errors.phone = "Phone must have at least 10 digits";
  if (!phone) errors.phone = "Phone is required";
  if (!emailValidation.test(email)) errors.email = "Must submit email with correct format";
  if (!email) errors.email = "Email is required";
  if (!sex) errors.sex = "Gender is required";

  setErrors(errors);
  // Form is valid if the errors object still has no properties
  return Object.keys(errors).length === 0;
}