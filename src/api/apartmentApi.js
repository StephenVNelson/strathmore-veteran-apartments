import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/apartments/";

export function getApartments() {
  return fetch(baseUrl, {
    headers: { "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}` }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveApartment(apartment) {
  return fetch(baseUrl + (apartment.id || ""), {
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
