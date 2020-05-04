import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/prospects/";

export function getProspects() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveProspect(prospect) {
  return fetch(baseUrl + (prospect.id || ""), {
    method: prospect.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(prospect)
  })
    .then(handleResponse)
    .catch(handleError);
}
