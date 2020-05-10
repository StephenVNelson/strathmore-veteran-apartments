import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/prospects/";

export function getProspects() {
  return fetch(baseUrl, {
    headers: { "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}` }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveProspect(prospect) {
  return fetch(baseUrl + (prospect.id || ""), {
    method: prospect.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}`
    },
    body: JSON.stringify(prospect)
  })
    .then(handleResponse)
    .catch(handleError);
}
