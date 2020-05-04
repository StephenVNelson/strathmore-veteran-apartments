import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/apartments/";

export function getApartments() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveApartment(apartment) {
  return fetch(baseUrl + (apartment.id || ""), {
    method: apartment.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
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
