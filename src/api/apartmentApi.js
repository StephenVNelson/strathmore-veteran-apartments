import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/apartments";

export async function getApartment(unit) {
  try {
    const queryString = `?filterByFormula=%28%7Bunit%7D+%3D+%27${unit}%27%29`
    const response = await fetch(`${baseUrl}${queryString}`, {
      headers: { "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}` }
    });
    return await handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}

export function getApartments() {
  return fetch(baseUrl, {
    headers: { "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}` }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveApartment(apartment) {
  return fetch(baseUrl + "/" + (apartment.id || ""), {
    method: apartment.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}`
    },
    body: JSON.stringify(apartment)
  })
    .then(handleResponse)
    .catch(handleError);
}

// export function deleteCourse(courseId) {
//   return fetch(baseUrl + courseId, { method: "DELETE" })
//     .then(handleResponse)
//     .catch(handleError);
// }
